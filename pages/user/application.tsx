import { Button, Card, IconButton, MenuItem, Select } from "@mui/material"
import { BASEURL } from "../../constants"
import { Api } from "helpers/api"
import { useEffect, useRef, useState } from "react"
import { ApiResponse, UserApplication } from "Typing"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { DocumentUpload } from "components/ImageUpload"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "store"
import { uploadDoc } from "actions/user/uploadDoc"
import { ArrowBack } from "@mui/icons-material"
import { useRouter } from "next/router"

const Page = () => {
    const [data, setData] = useState<UserApplication>()
    const [errMessage, setMessage] = useState<JSX.Element>()
    const [docType, setDocType] = useState<string>('0')
    const [docUrl, setDocUrl] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(false)
    const { state, message } = useSelector((store: RootState) => store.accountSlice.documentUpload)
    const ref = useRef<HTMLSelectElement>()
    const [types, setTypes] = useState<{ id: number, name: string }[]>(Array.from([]))
    const dispatch = useAppDispatch()
    const router = useRouter()

    const _req = async () => {
        try {
            const { data } = await Api().get<ApiResponse<UserApplication>>('/user/application')
            setData(data.data)
        } catch (error) {
            setMessage(<div className="text-center text-red-500">
                ERROR OCCURED
            </div>)
        }
    }
    useEffect(() => { _req() }, [])

    useEffect(() => {
        const req = async () => {
            try {
                let res = await fetch(BASEURL + '/resources/document-types')
                if (res.status !== 200) return
                setTypes((await res.json()).data)
            } catch (error) {
            }
        }
        req()
    }, [])

    return <UserDashboardLayout>
        {({ application }) => <div className="min-h-[20vh] mx-auto py-3">
            <IconButton onClick={router.back}>
                <ArrowBack />
            </IconButton>
            <Card elevation={2} className={'max-w-lg m-2 w-full p-3 space-y-2'}>
                <div className="flex flex-col items-center">
                    <div>
                        Application Status
                    </div>
                    <div className="bg-gray-800 rounded-lg px-2 uppercase text-xs mx-2">
                        {application}
                    </div>
                </div>
                <div>
                    {errMessage || <div className={`${state === 'failed' ? 'text-red-500' : 'text-blue-500'} text-center`}>{message} </div>}
                </div>

                <div className="py-4">
                    <div>
                        Reason *<span className="text-xs text-sec mx-2">Message on application will appear here</span>
                    </div>
                    <div className="border border-gray-300 rounded-md p-3 text-sec text-sm">
                        {data?.message || 'NO MESSAGE'}
                    </div>
                </div>
                {application === 'document-required' && <div>
                    <div className="space-y-2">
                        <div className="text-center uppercase text-sm py-2">
                            UPLOAD A VALID DOCUMENT
                        </div>
                        <div className="flex justify-center">
                            <Select size="small" value={docType} ref={ref} name="" id="" className="text-sm my-2" onChange={(e) => setDocType(e.target.value as string)} disabled={completed} >
                                <MenuItem className="text-sm" value="0">CHOOSE DOCUMENT TYPE</MenuItem>
                                {types.map((e) => <MenuItem className="text-sm" key={e.id} value={e.id}>{e.name}</MenuItem>)}
                            </Select>
                        </div>

                        <div className="flex justify-center">
                            {docType !== '0' && <DocumentUpload
                                documentType={docType}
                                handleUpload={(url) => { setDocUrl(url); setCompleted(true) }}
                                disabled={completed} />}
                        </div>
                        {
                            docUrl !== '' && <div className="m-4 flex justify-center">
                                <Button
                                    variant="outlined"
                                    size='small'
                                    sx={{
                                        color: 'red',
                                        borderColor: 'red'
                                    }}
                                    disabled={state === 'pending' || state === 'success'}
                                    onClick={() => {
                                        setDocType('0')
                                        setDocUrl('')
                                        setCompleted(false)
                                        const select = ref.current
                                        if (select !== undefined) {
                                            select.value = '0'
                                        }
                                    }}>
                                    Change
                                </Button>
                            </div>
                        }
                        <div className="flex justify-center">
                            <Button
                                variant="outlined"
                                size='small'
                                disabled={docUrl === '' || state === 'success'}
                                onClick={() => {
                                    setMessage(undefined)
                                    dispatch(uploadDoc({
                                        document: docUrl, id: data.id,
                                    }))
                                }}
                            >
                                Upload
                            </Button>
                        </div>
                    </div>
                </div>}
            </Card>
        </div>}
    </UserDashboardLayout>
}

export default Page