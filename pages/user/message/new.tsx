import { ArrowBack } from "@mui/icons-material"
import { Button, Card, CircularProgress, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { SocketState, useSocketBloc } from "utils/socket"
import { FormInput } from "../../../components/FormInput"
import { UserDashboardLayout } from "../../../components/user/UserDashboardLayout"
import { Api } from "../../../helpers/api"
import { MesssageForm } from "../../../Typing.d"

const Page = () => {
    const router = useRouter()
    const formRef = React.useRef<HTMLFormElement>()
    const [_, { notify }] = useSocketBloc(SocketState)

    const [form, setForm] = React.useState<MesssageForm>({
        title: '',
        content: '',
        type: 'text',
    })
    const [message, setMessage] = React.useState({
        state: false,
        message: ''
    })
    const [loading, setLoading] = React.useState<boolean>(false)

    const send = async () => {
        setLoading(true)
        try {
            const { status } = await Api().post('/user/messages/create', JSON.stringify(form))
            setMessage({
                state: true,
                message: 'Message sent successfully'
            })
            notify({
                type: 'message',
                message: 'You have a new message',
            })
            setTimeout(() => {
                return router.back()
            }, 800)
        } catch (error) {
            setMessage({
                state: false,
                message: 'Something went wrong'
            })
        }
        setLoading(false)
    }

    return <UserDashboardLayout>
        {() => <>
            <Card>
                <form ref={formRef} className=" shadow-md rounded-md p-4">
                    <IconButton onClick={() => router.back()}>
                        <ArrowBack />
                    </IconButton>
                    <div className="text-center text-lg">
                        New Message
                    </div>
                    <div className="flex justify-center my-4 p-2">
                        <div className="max-w-screen-lg w-full space-y-2">
                            <div className="text-center text-blue-500 text-sm">
                                {message.message}
                            </div>
                            <div>
                                <FormInput
                                    props={{
                                        title: 'Title',
                                        required: true,
                                        value: form.title,
                                        handleChange(s) {
                                            setForm({ ...form, title: s })
                                        }
                                    }}
                                />
                                <textarea
                                    required
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    className="p-2 border border-gray-500 w-full min-h-[20vh] bg-transparent" placeholder="Message" />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant='outlined'
                                    size='small'
                                    disabled={loading || form.content === '' || form.receiver === ''}
                                    startIcon={loading && <CircularProgress size={14} />}
                                    onClick={send}
                                >
                                    SEND
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        </>
        }
    </UserDashboardLayout >
}

export default Page