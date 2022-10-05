import { Button, CircularProgress, TextField } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout"
import { Api } from "../../../../helpers/api"
import { emailValidator } from "../../../../helpers/validation"
import { ApiResponse, Staff } from "../../../../Typing"

const Page = () => {
    const [form, setForm] = React.useState<Staff>({
        name: '',
        description: '',
        email: '',
        fee: 0,
        phone: ''
    })
    const [fError, setFError] = React.useState<Staff>({} as Staff)
    const [message, setMessage] = React.useState<string>()

    const router = useRouter()
    const ref = React.useRef<HTMLFormElement>()

    const create = async (loading: any) => {
        if (!checkValid()) return;
        setFError({} as Staff)
        try {
            loading.busy()
            const { data } = await Api().post<ApiResponse>('/admin/staffs/create', JSON.stringify({ ...form, fee: parseInt(form.fee as unknown as string) }))
            if (data.status === 'success') {
                setTimeout(() => {
                    router.back()
                }, 800)
                setMessage('Staff created successfully')
            }
        } catch (error) {
            switch (error.respsone.status) {
                case 400: {
                    const err = (error.response.data as ApiResponse).error
                    setFError(err as unknown as Staff)
                    break
                }
                default:
                    setMessage('Error connecting to server')
            }
        }
        loading.idle()
    }

    const checkValid = (): boolean => {
        return !(emailValidator(form.email) !== undefined
            || form.name === '' || form.description === ''
            || form.phone.length < 8)
    }

    return <AdminDashboardLayout>
        {({ loading }) => <>
            <div className="max-w-3xl w-[90vw] mx-auto">
                <div className="text-center text-red-500 text-lg">
                    New Staff
                </div>
                <div className="p-2 shadow-md rounded-md">
                    <form ref={ref} action="" onSubmit={e => e.preventDefault()} className='space-y-3' >
                        <div className="text-center">
                            {message}
                        </div>

                        <div>
                            <TextField
                                label='Staff Name'
                                variant='outlined'
                                size='small'
                                fullWidth
                                value={form.name}
                                required
                                error={fError.name !== undefined}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Email'
                                variant='outlined'
                                size='small'
                                fullWidth
                                value={form.email}
                                required
                                error={fError.email !== undefined || emailValidator(form.email) !== undefined}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Phone'
                                variant='outlined'
                                size='small'
                                type={'number'}
                                fullWidth
                                value={form.phone}
                                required
                                error={fError.phone !== undefined || form.phone !== '' && form.phone.length < 8}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Job Description'
                                variant='outlined'
                                size='small'
                                fullWidth
                                value={form.description}
                                required
                                error={fError.description !== undefined}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Fee'
                                variant='outlined'
                                size='small'
                                type={'number'}
                                fullWidth
                                value={form.fee}
                                required
                                error={fError.fee !== undefined}
                                onChange={(e) => setForm({ ...form, fee: e.target.value as unknown as number })}
                            />
                        </div>
                        <div className="mx-auto w-24">
                            <Button
                                variant='outlined'
                                size="small"
                                startIcon={loading.state && <CircularProgress size={14} />}
                                disabled={loading.state === 'pending' || !checkValid()}
                                onClick={() => create(loading)}
                            >
                                CREATE
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>}
    </AdminDashboardLayout>
}

export default Page