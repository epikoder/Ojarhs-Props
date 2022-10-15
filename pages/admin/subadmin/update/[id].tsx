import { ArrowBack } from "@mui/icons-material"
import { Button, Card, CircularProgress, IconButton, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { UpdateSubAdminPageState, useBloc } from "../../../../bloc/subadmin/update-subadmin"
import SubAdminDashboardLayout from "../../../../components/admin/SubAdminDashboardLayout"
import { ImageUpload } from "../../../../components/ImageUpload"
import { emailValidator } from "../../../../helpers/validation"


const Page = () => {
    const [state, { setForm, update, clear, load }] = useBloc(UpdateSubAdminPageState)
    const { loading, data: _data } = state
    const { error, message, status, form } = _data
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            load(router.asPath.split('/').pop())
        }
    }, [router.isReady])

    return <SubAdminDashboardLayout>
        {({ }) => <>
            <IconButton
                onClick={router.back}>
                <ArrowBack />
            </IconButton>
            <div className="flex flex-col justify-center items-center">
                <Card elevation={3} className='p-4 max-w-xl space-y-2'>
                    <div className="text-center">
                        Update Sub-Admin
                    </div>
                    {message && <Card className={`${status === 'failed' ? 'bg-red-500' : 'bg-green-500'} p-3 text-center`}>
                        {message}
                    </Card>}
                    <div className="p-4 space-y-3">
                        <TextField
                            label="First Name"
                            size="small"
                            fullWidth
                            required
                            value={form.fname}
                            error={error?.fname !== undefined}
                            onChange={(e) => setForm('fname', e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            size="small"
                            fullWidth
                            required
                            value={form.lname}
                            error={error?.lname !== undefined}
                            onChange={(e) => setForm('lname', e.target.value)}
                        />
                        <TextField
                            label="Email"
                            size="small"
                            fullWidth
                            required
                            value={form.email}
                            type='email'
                            error={emailValidator(form.email) !== undefined || error?.email != undefined}
                            onChange={(e) => setForm('email', e.target.value)}
                        />
                        <TextField
                            label="Phone"
                            size="small"
                            fullWidth
                            required
                            type={'number'}
                            value={form.phone}
                            error={error?.phone !== undefined}
                            onChange={(e) => setForm('phone', e.target.value)}
                        />
                        <TextField
                            label="Address"
                            size="small"
                            fullWidth
                            value={form.address}
                            onChange={(e) => setForm('address', e.target.value)}
                        />
                        <div className={`${error?.photo !== undefined ? 'border-red-500 border rounded-sm' : ''}`}>
                            <ImageUpload
                                width={'100%'}
                                height={300}
                                value={form.photo}
                                handleUpload={s => setForm('photo', s)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            onClick={() => update(() => {
                                setTimeout(() => {
                                    router.back()
                                    clear()
                                })
                            })}
                            variant='outlined'
                            size='small'
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={14} />}
                        >
                            Update
                        </Button>
                    </div>
                </Card>
            </div>
        </>}
    </SubAdminDashboardLayout>
}
export default Page