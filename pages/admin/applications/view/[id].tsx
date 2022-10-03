import { ArrowBack } from "@mui/icons-material"
import { Button, CircularProgress, IconButton, MenuItem, Select } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout"
import { Info } from "../../../../components/Info"
import Loader from "../../../../components/Loader"
import { Api } from "../../../../helpers/api"
import { resolveFilePath } from "../../../../helpers/helpers"
import { ApiResponse, NextOfKinApi, User, UserApplication, UserApplicationStatus } from "../../../../Typing.d"

const Page = () => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [user, setUser] = React.useState(undefined as User & {
        application: UserApplication
        next_of_kins: NextOfKinApi[]
        type: string
    })
    const [form, setForm] = React.useState({
        status: 'pending' as UserApplicationStatus,
        message: '' as string
    })

    const _req = async () => {
        setLoading(true)
        try {
            const { data, status } = await Api().get<ApiResponse<typeof user>>('/admin/applications/view/' + router.asPath.split('/').pop())
            setUser(data.data)
            setForm({ ...form, status: data.data.application.status })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (router.isReady && !loading) {
            _req()
        }
    }, [router.asPath])

    const update = async () => {
        setLoading(true)
        try {
            const { data, status } = await Api().post('/admin/applications/update/' + router.asPath.split('/').pop(), JSON.stringify(form))
            setLoading(false)
            if (status === 200) {
                setTimeout(() => {
                    router.replace('/admin/applications/all')
                }, 800)
            }
        } catch (error) {
            setLoading(false)
        }

    }
    return <AdminDashboardLayout>
        {() => <>
            {user !== undefined &&
                <div className="my-1 max-w-5xl">
                    <IconButton onClick={router.back}>
                        <ArrowBack />
                    </IconButton>
                    <div className="my-1">
                        <div className="text-center red uppercase">{'Tenant Application'}</div>
                    </div>
                    <div className="sm:grid grid-cols-2 gap-1 ">
                        <div className="p-1">
                            <img src={resolveFilePath(user.photo)} className='max-h-[20vh] rounded-md' />
                        </div>
                        <div className="py-1 space-y-2">
                            <Info title="First Name" value={user.fname} />
                            <Info title="Last Name" value={user.lname} />
                            <Info title="Phone" value={user.phone} />
                        </div>
                    </div>
                    <div className="sm:grid grid-cols-2 gap-1 ">
                        <div className="py-1 space-y-2">
                            <Info title="Email" value={user.email} />
                            <Info title="Address" value={user.address} />
                            <Info title="Lga" value={user.lga} />
                        </div>
                        <div className="py-1 space-y-2">
                            <Info title="State" value={user.state} />
                            <Info title="Country" value={user.country} />
                        </div>
                    </div>
                    <div>
                        <div >
                            Guarantor Information
                        </div>
                        <div className="sm:grid grid-cols-2 gap-1 ">
                            <div className="py-1 space-y-2">
                                <Info title="Name" value={user.guarantor_name} />
                                <Info title="Address" value={user.guarantor_address} />
                            </div>
                            <div className="py-1 space-y-2">
                                <Info title="Phone" value={user.guarantor_phone} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div >
                            Next Of Kin Information
                        </div>
                        {user.next_of_kins.map((kin, i) =>
                            <div className="sm:grid grid-cols-2 gap-1 " key={i}>
                                <div className="py-1 space-y-2">
                                    <Info title="First Name" value={kin.fname} />
                                    <Info title="Last Name" value={kin.lname} />
                                    <Info title="Email" value={kin.email} />
                                    <Info title="Phone" value={kin.phone} />
                                </div>
                                <div className="py-1 space-y-2">
                                    <Info title="Address" value={kin.address} />
                                    <Info title="Lga" value={kin.lga} />
                                    <Info title="State" value={kin.state} />
                                    <Info title="Country" value={kin.country} />
                                </div>
                            </div>)}
                    </div>
                    <div className="my-2">
                        <div >
                            DOCUMENT - <span className="text-red-500">{user.type}</span>
                        </div>
                        <img src={resolveFilePath(user.application.document)} className='max-w-[768px] max-h-[360px] w-full h-full rounded-md' />
                    </div>
                    <div className="flex justify-center my-1">
                        <Select
                            disabled={user.application.status === 'verified'}
                            label={<span>{'Application Status'}</span>}
                            placeholder="Application Status"
                            defaultValue={user.application.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value as UserApplicationStatus })}
                            className="min-w-[360px]">
                            <MenuItem value='pending' > {'Pending'} </MenuItem>
                            <MenuItem value='document-required'> {'Document Required'} </MenuItem>
                            <MenuItem value='verified'> {'Verified'} </MenuItem>
                            <MenuItem value='rejected'>  {'Rejected'} </MenuItem>
                        </Select>
                    </div>
                    {(form.status !== 'verified' && form.status !== 'pending' && form.status !== 'nil') && <div>
                        <textarea
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Message"
                            className="border border-gray-300 w-full h-32 p-2 my-2"
                        />
                    </div>}
                    <div className="my-10 flex justify-center">
                        <Button
                            startIcon={loading && <CircularProgress size={14} />}
                            variant='outlined'
                            disabled={loading || user.application.status === 'verified'}
                            onClick={update}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            }
            {
                !loading && user === undefined &&
                <div>
                    <div>
                        {'Could not load Application'}
                    </div>
                </div>
            }
            {
                loading && user === undefined &&
                <div className="relative h-full">
                    <Loader />
                </div>
            }
        </>}
    </AdminDashboardLayout >
}

export default Page