import React, { useRef } from "react"
import { DocumentUpload } from "../../components/ImageUpload"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { PaystackConsumer } from "react-paystack"
import { BASEURL, pk_key } from "../../constants"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store"
import { useRouter } from "next/router"
import { uploadDoc } from "../../redux/user/uploadDoc"

const UploadDocument = () => {
    const [docType, setDocType] = React.useState<string>('0')
    const [docUrl, setDocUrl] = React.useState<string>('')
    const [types, setTypes] = React.useState<{ id: number, name: string }[]>(Array.from([]))
    const [completed, setCompleted] = React.useState<boolean>(false)
    const { authenticated, user } = useSelector((store: RootState) => store.authSlice)
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
                console.log(error)
            }
        }
        req()
    }, [])

    React.useEffect(() => {
        if (docType === '0') {
            setDocUrl('')
        }
    }, [docType, docUrl])

    React.useEffect(() => {
        if (!authenticated) router.push('/Login')
    }, [authenticated, router])

    const proceed = async (response: {
        message: string
        status: 'success' | 'failed',
        reference: string
    }) => {
        const { message, status, reference } = response
        if (message.toLowerCase() !== 'approved' || status.toLowerCase() !== 'success') {
            console.log('fialed', response)
            return
        }
        dispatch(uploadDoc({
            document: docUrl, reference: reference, provider: 'paystack'
        }))
    }

    return <UserDashboardLayout>
        {() => <div className="flex felx-col justify-center items-center w-full h-full p-2 pt-8">
            <form onSubmit={(e) => e.preventDefault()} className="duration-300 ease-in-out transition-all" >
                <div className="text-center font-semibold uppercase text-sm py-2">
                    UPLOAD A VALID DOCUMENT
                </div>
                <div className="flex justify-center">
                    <select ref={ref} name="" id="" className="text-sm my-2" onChange={(e) => setDocType(e.target.value)} disabled={completed} >
                        <option value="0">CHOOSE DOCUMENT TYPE</option>
                        {types.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                </div>

                {docType !== '0' && <DocumentUpload documentType={docType} handleUpload={(url) => { setDocUrl(url); setCompleted(true) }} disabled={completed} />}
                {
                    docUrl !== '' && <div className="m-4 flex justify-center">
                        <div className="px-2 py-1 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                            onClick={() => {
                                setDocType('0')
                                setDocUrl('')
                                setCompleted(false)
                                const select = ref.current
                                if (select !== undefined) {
                                    select.value = '0'
                                }
                            }}>
                            CHANGE
                        </div>
                    </div>
                }
                {
                    docUrl !== '' && <div className="m-4 flex justify-center">
                        <PaystackConsumer email={user.email} amount={10000} publicKey={pk_key} onSuccess={(response) => { proceed(response) }} >
                            {
                                ({ initializePayment }) =>
                                    <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                                        onClick={() => initializePayment()}>
                                        PROCEED TO PAYMENT
                                    </div>
                            }
                        </PaystackConsumer>
                    </div>
                }
            </form>
        </div >}
    </UserDashboardLayout >
}
export default UploadDocument