import React, { useRef } from "react"
import { DocumentUpload } from "../../components/ImageUpload"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { PaystackConsumer } from "react-paystack"
import { applicationFee, BASEURL, pk_key } from "../../constants"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store"
import { useRouter } from "next/router"
import { uploadDoc } from "../../actions/user/uploadDoc"
import { Button, CircularProgress, MenuItem, Select } from "@mui/material"
import { money } from "../../helpers/helpers"
import { User, UserApplicationStatus } from "../../Typing.d"
import { checkIsAuthenticated } from "../../features/authSlice"

const UploadDocument = () => {
    const [docType, setDocType] = React.useState<string>('0')
    const [docUrl, setDocUrl] = React.useState<string>('')
    const [types, setTypes] = React.useState<{ id: number, name: string }[]>(Array.from([]))
    const [completed, setCompleted] = React.useState<boolean>(false)
    const { state, message } = useSelector((store: RootState) => store.accountSlice.documentUpload)
    const ref = useRef<HTMLSelectElement>()
    const router = useRouter()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (docType === '0') {
            setDocUrl('')
        }
    }, [docType, docUrl])

    const proceed = async (response: {
        message: string
        status: 'success' | 'failed',
        reference: string
    }) => {
        const { message, status, reference } = response
        if (message.toLowerCase() !== 'approved' || status.toLowerCase() !== 'success') {
            return
        }
        dispatch(uploadDoc({
            document: docUrl, reference: reference, provider: 'paystack'
        }))
    }

    return <UserDashboardLayout>
        {({ user, application }: {
            user: User,
            application: UserApplicationStatus
        }) => <div className="flex felx-col justify-center items-center w-full h-full p-2 pt-8">
                {application as UserApplicationStatus === 'nil' && <form onSubmit={(e) => e.preventDefault()} className="duration-300 ease-in-out transition-all" >
                    <div className="my-2">
                        <div className={`${state === 'failed' ? 'text-red-500' : 'text-blue-500'} text-center`}>{message} </div>
                    </div>
                    <div className="text-center font-semibold uppercase text-sm py-2">
                        UPLOAD A VALID DOCUMENT
                    </div>
                    <div className="flex justify-center">
                        <Select size="small" value={docType} ref={ref} name="" id="" className="text-sm my-2" onChange={(e) => setDocType(e.target.value as string)} disabled={completed} >
                            <MenuItem value="0">CHOOSE DOCUMENT TYPE</MenuItem>
                            {types.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
                        </Select>
                    </div>

                    {docType !== '0' && <DocumentUpload
                        documentType={docType}
                        handleUpload={(url) => { setDocUrl(url); setCompleted(true) }}
                        disabled={completed} />}
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
                    {
                        docUrl !== '' && application !== 'document-required' && <div className="m-4 flex justify-center">
                            <PaystackConsumer
                                email={user.email}
                                amount={1000000}
                                firstname={user.fname}
                                lastname={user.lname}
                                publicKey={pk_key}
                                metadata={{
                                    tranx: {
                                        type: 'application'
                                    },
                                    custom_fields: []
                                }}
                                onSuccess={(response) => { proceed(response) }} >
                                {
                                    ({ initializePayment }) =>
                                        <Button
                                            variant="outlined"
                                            size='small'
                                            onClick={() => initializePayment()}
                                            disabled={state === 'pending' || state === 'success'}
                                            startIcon={state === 'pending' && <CircularProgress size={14} />}
                                        >
                                            Pay {money(applicationFee)}
                                        </Button>
                                }
                            </PaystackConsumer>
                        </div>
                    }
                    <div className={`${state === 'success' ? 'flex' : 'hidden'} justify-center my-2`}>
                        <Button
                            variant="outlined"
                            size='small'
                            onClick={() => {
                                dispatch(checkIsAuthenticated({}))
                                router.push('/user/dashboard')
                            }}
                        >
                            DASHBOARD
                        </Button>
                    </div>
                </form>}
                {application as UserApplicationStatus !== 'nil' && <div className="text-gray-500">
                    <div className="uppercase text-sm border-b text-center border-gray-400">
                        No action required
                    </div>
                    <div>
                        Your application status is <span className="py-1  px-2 text-xs bg-slate-200 rounded-md" >{application}</span>
                    </div>
                </div>}
            </div >}
    </UserDashboardLayout >
}
export default UploadDocument