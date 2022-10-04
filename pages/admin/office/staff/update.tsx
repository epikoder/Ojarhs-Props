import { Button, CircularProgress, TextField } from "@mui/material"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import React from "react"
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout"
import { Api } from "../../../../helpers/api"
import { emailValidator } from "../../../../helpers/validation"
import { MapFunc } from "../../../../Type"
import { ApiResponse, Map, Staff } from "../../../../Typing"

const Page = () => {
    const [form, setForm] = React.useState<Staff>({
        name: '',
        description: '',
        email: '',
        fee: 0,
        phone: ''
    })

    const [message, setMessage] = React.useState<JSX.Element>()

    const router = useRouter()
    const ref = React.useRef<HTMLFormElement>()

    const update = async (loading: any) => {
        if (!checkValid()) return;
        try {
            loading.busy()
            const { data } = await Api().put<ApiResponse>('/admin/staffs', JSON.stringify({ ...form, fee: parseInt(form.fee as unknown as string) }))
            if (data.status === 'success') {
                setTimeout(() => {
                    router.back()
                }, 800)
                setMessage(<span className="text-blue-500">{'Staff updated successfully'}</span>)
            }
        } catch (error) {
            switch (error.response.status) {
                case 404: {
                    setMessage(<span className="text-red-500">{'Staff not found'}</span>)
                    break
                }
                case 400: {
                    let m = (new MapFunc(((error as AxiosError<ApiResponse>).response.data.error as Map<string>))).first()
                    if (m !== null) {
                        setMessage(<span className="text-red-500">{m}</span>)
                    }
                    break
                }
                default:
                    setMessage(<span className="text-red-500">{'Error connecting to server'}</span>)
            }
        }
        loading.idle()
    }

    const checkValid = (): boolean => {
        return !(emailValidator(form.email) !== undefined
            || form.name === '' || form.description === ''
            || form.phone.length < 8)
    }

    const _req = async () => {
        if (!router.isReady) return
        router.query.id
        try {
            const { data } = await Api().get<ApiResponse<Staff>>('/admin/staffs?id=' + router.query.id)
            setForm(data.data)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        _req()
    }, [router.isReady])

    return <AdminDashboardLayout>
        {({ loading }) => <>
            <div className="max-w-2xl w-[90vw] md:w-[60vw] mx-auto">
                <div className="text-center text-lg">
                    Update Staff
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
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                                onChange={(e) => setForm({ ...form, fee: e.target.value as unknown as number })}
                            />
                        </div>
                        <div className="mx-auto w-24">
                            <Button
                                variant='outlined'
                                size="small"
                                startIcon={loading.state && <CircularProgress size={14} />}
                                disabled={loading.state === 'pending' || !checkValid()}
                                onClick={() => update(loading)}
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>}
    </AdminDashboardLayout>
}

export default Page