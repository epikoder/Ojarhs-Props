import { ArrowBack } from "@mui/icons-material"
import { Button, CircularProgress, IconButton, TextField } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useRouter } from "next/router"
import React from "react"
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout"
import { Api } from "../../../../helpers/api"
import { ApiResponse, Expense } from "../../../../Typing"

const Page = () => {
    const [form, setForm] = React.useState<Expense>({
        name: '',
        description: '',
        amount: 0,
        duration: 0,
    })
    const [message, setMessage] = React.useState<JSX.Element>()

    const router = useRouter()
    const ref = React.useRef<HTMLFormElement>()

    const update = async (loading: any) => {
        if (!checkValid()) return;
        loading.busy()
        try {
            const { data } = await Api().post<ApiResponse>('/admin/expenses/update?id=' + router.query.id, JSON.stringify({
                name: form.name,
                description: form.description,
                duration: parseInt(form.duration as unknown as string),
                amount: parseInt(form.amount as unknown as string)
            }))
            if (data.status === 'success') {
                setTimeout(() => {
                    router.back()
                }, 800)
                setMessage(<span className="text-blue-500">{'Expenses updated successfully'}</span>)
            }
        } catch (error) {
            switch (error.response.status) {
                case 404: {
                    setMessage(<span className="text-red-500">{'Expenses not found'}</span>)
                    break
                }
                default:
                    setMessage(<span className="text-red-500">{'Error connecting to server'}</span>)
            }
        }
        loading.idle()
    }

    const checkValid = (): boolean => {
        return !(form.name === '' || form.description === '')
    }

    const _req = async () => {
        if (!router.isReady) return
        router.query.id
        try {
            const { data } = await Api().get<ApiResponse<Expense>>('/admin/expense?id=' + router.query.id)
            setForm(data.data)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        _req()
    }, [router.isReady])


    return <AdminDashboardLayout>
        {({ loading }) => <>
            <div className="max-w-3xl w-[90vw] mx-auto">
                <div>
                    <IconButton
                        onClick={() => router.back()}>
                        <ArrowBack className="text-red-500" fontSize="medium" />
                    </IconButton>
                </div>
                <div className="text-center text-red-500 text-lg">
                    Update Expenses
                </div>
                <div className="p-2 shadow-md rounded-md">
                    <form ref={ref} action="" onSubmit={e => e.preventDefault()} className='space-y-3' >
                        <div className="text-center">
                            {message}
                        </div>

                        <div>
                            <TextField
                                label='Name'
                                variant='outlined'
                                size='small'
                                fullWidth
                                value={form.name}
                                required
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder='Job Description'
                                value={form.description}
                                required
                                className="w-full h-36 p-2 border border-gray-300 rounded-md"
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Duration* days'
                                variant='outlined'
                                size='small'
                                type={'number'}
                                fullWidth
                                value={form.duration}
                                required
                                onChange={(e) => setForm({ ...form, duration: e.target.value as unknown as number })}
                            />
                        </div>
                        <div>
                            <TextField
                                label='Amount ₦'
                                variant='outlined'
                                size='small'
                                type={'number'}
                                fullWidth
                                value={form.amount}
                                required
                                onChange={(e) => setForm({ ...form, amount: e.target.value as unknown as number })}
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