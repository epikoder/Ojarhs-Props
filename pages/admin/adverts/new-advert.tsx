import { ArrowBack } from "@mui/icons-material"
import { Button, MenuItem, Select, TextField } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { ImageUpload } from "../../../components/ImageUpload"
import { advertPrices, pk_key } from "../../../constants"
import { Api } from "../../../helpers/api"
import { money } from "../../../helpers/helpers"
import { ApiResponse, User } from "../../../Typing.d"

const Page = () => {
    const [loading, setLoading] = React.useState(false)
    const [form, setForm] = React.useState({
        link: '',
        photo: '',
        reference: '',
        position: '',
        provider: ''

    })
    const [message, setMessage] = React.useState({
        status: false,
        text: undefined as string
    } as { status?: boolean, text: string })
    const router = useRouter()

    const proceed = async (_form: typeof form) => {
        setLoading(true)
        try {
            const { data, status } = await Api().post<ApiResponse>("/advert/pay",
                JSON.stringify(_form))
            setMessage({
                status: data.status === 'success',
                text: data.message
            })
            setLoading(false)
            const i = setTimeout(() => {
                router.replace('/admin/adverts')
            }, 800)
            return () => clearTimeout(i)
        } catch (error) {
            setLoading(false)
            setMessage({
                text: 'Something went wrong'
            })
        }
    }

    return <AdminDashboardLayout>
        {({ user }: { user: User }) => <>
            <div className="flex flex-col justify-center">
                <div className="w-full">
                    <ArrowBack className="w-14 h-8 text-red-500" onClick={() => router.back()} />
                </div>
                <div className="w-full flex justify-center">
                    <div className="max-w-2xl w-full p-2 lg:p-8 shadow-md">
                        <div className="text-red-600 text-center text-lg xl:text-xl">
                            Add New Advert
                        </div>
                        <div>
                            <div className={`text-center text-${message.status ? 'blue' : 'red'}-500`}>
                                {message.text}
                            </div>
                        </div>
                        <form className="space-y-2 my-2">
                            <div>
                                <TextField
                                    label='Link'
                                    placeholder="https://ojarhproperties.com"
                                    size="small"
                                    className="w-full"
                                    error={form.link === undefined || form.link === ''}
                                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                                />
                            </div>
                            <div>
                                <Select
                                    className="w-full uppercase"
                                    size="small"
                                    value={form.position}
                                    required
                                    onChange={(e) => setForm({ ...form, position: e.target.value as string })}>
                                    {(advertPrices).map((a, i) =>
                                        <MenuItem value={a.position} className='uppercase' key={i}> {a.position} - {money(a.amount)} </MenuItem>)}
                                </Select>
                            </div>
                            <div>
                                <ImageUpload handleUpload={(s) => setForm({ ...form, photo: s })} width={320} />
                            </div>
                            <div className="flex justify-center">
                                {form.position !== '' && form.link !== '' && form.photo !== '' &&
                                    <Button
                                        variant="outlined"
                                        disabled={loading}
                                        size='small'
                                        onClick={() => {
                                            if (form.position === '' || form.link === '' || advertPrices.find((a) => a.position === form.position || form.photo === '') === undefined) return
                                            proceed(form)
                                        }}>
                                        {loading ? 'Please wait' : 'Proceed'}
                                    </Button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>}
    </AdminDashboardLayout>
}

export default Page