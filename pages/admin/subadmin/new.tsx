import { ArrowBack } from "@mui/icons-material"
import { Button, Card, CircularProgress, IconButton, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { NewSubAdminPageState, useBloc } from "../../../bloc/subadmin/new-subadmin"
import SubAdminDashboardLayout from "../../../components/admin/SubAdminDashboardLayout"
import { ImageUpload } from "../../../components/ImageUpload"
import { emailValidator } from "../../../helpers/validation"

const Page = () => {
    const [state, { setForm, create, clear }] = useBloc(NewSubAdminPageState)
    const { loading, data: _data } = state
    const { error, message, status, form } = _data
    const router = useRouter()

    useEffect(() => {
        if (_data.status === 'success') {
            setTimeout(() => {
                clear()
                router.back()
            }, 800)
        }
    }, [_data.status])

    return <SubAdminDashboardLayout>
        {({ }) => <>
            <IconButton
                onClick={router.back}>
                <ArrowBack />
            </IconButton>
            <div className="flex flex-col justify-center items-center">
                <Card elevation={3} className='p-4 max-w-xl space-y-2'>
                    <div className="text-center">
                        Create Sub-Admin
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
                                handleUpload={s => setForm('photo', s)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            onClick={create}
                            variant='outlined'
                            size='small'
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={14} />}
                        >
                            Create
                        </Button>
                    </div>
                </Card>
            </div>
        </>}
    </SubAdminDashboardLayout>
}
export default Page