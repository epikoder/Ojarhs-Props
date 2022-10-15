import { ArrowBack } from "@mui/icons-material"
import { Button, CircularProgress, IconButton, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { useRouter } from "next/router"
import React from "react"
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout"
import { Api } from "../../../../helpers/api"
import { ApiResponse, Expense } from "../../../../Typing"

const Page = () => {
    const [form, setForm] = React.useState<Expense & { startDate: Dayjs, endDate: Dayjs, }>({
        name: '',
        description: '',
        amount: 0,
        startDate: null,
        endDate: (dayjs()),
        duration: 0,
    })
    const [fError, setFError] = React.useState<Expense>({} as Expense)
    const [message, setMessage] = React.useState<JSX.Element>()

    const router = useRouter()
    const ref = React.useRef<HTMLFormElement>()

    const create = async (loading: any) => {
        if (!checkValid()) return;
        setFError({} as Expense)
        loading.busy()
        try {
            const { data } = await Api().post<ApiResponse>('/admin/expenses/create', JSON.stringify({
                name: form.name,
                description: form.description,
                duration: getDuration(),
                amount: parseInt(form.amount as unknown as string)
            }))
            if (data.status === 'success') {
                setTimeout(() => {
                    router.back()
                }, 800)
                setMessage(<span className="text-blue-500">{'Expenses created successfully'}</span>)
            }
        } catch (error) {
            console.log(error)
            switch (error.response.status) {
                case 400: {
                    const err = (error.response.data as ApiResponse).error
                    setFError(err as unknown as Expense)
                    break
                }
                default:
                    setMessage(<span className="text-red-500">{'Error connecting to server'}</span>)
            }
        }
        loading.idle()
    }

    const checkValid = (): boolean => {
        return !(form.name === '' || form.description === ''
            || (form.endDate.diff(form.startDate) < 0))
    }

    const getDuration = (): number => {
        const d = form.endDate.diff(form.startDate, 'days')
        return isNaN(d) ? 0 : (d + 1)
    }

    return <AdminDashboardLayout>
        {({ loading }) => <>
            <div className="max-w-3xl w-[90vw] mx-auto">
                <div>
                    <IconButton
                        onClick={() => router.back()}>
                        <ArrowBack />
                    </IconButton>
                </div>
                <div className="text-center text-lg">
                    New Expenses
                </div>
                <div className="p-2 shadow-md rounded-md">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                    error={fError.name !== undefined}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                            <div className="space-x-2">
                                <DatePicker
                                    label="Start Date"
                                    value={form.startDate}
                                    minDate={(new Date((new Date()).getFullYear(), 1)) as unknown as Dayjs}
                                    onChange={(newValue) => {
                                        setForm({ ...form, startDate: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                            <div className="space-x-2">
                                <DatePicker
                                    label="End Date"
                                    value={form.endDate}
                                    minDate={form.startDate}
                                    onChange={(newValue) => {
                                        setForm({ ...form, endDate: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                            <div>
                                <div className="p-2 border border-gray-300 rounded-md">
                                    {getDuration()}
                                </div>
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
                                    error={fError.amount !== undefined}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value as unknown as number })}
                                />
                            </div>
                            <div className="mx-auto w-24">
                                <Button
                                    variant='outlined'
                                    size="small"
                                    startIcon={loading.state && <CircularProgress size={14} />}
                                    disabled={loading.state || !checkValid()}
                                    onClick={() => create(loading)}
                                >
                                    CREATE
                                </Button>
                            </div>
                        </form>
                    </LocalizationProvider>
                </div>
            </div>
        </>}
    </AdminDashboardLayout>
}

export default Page