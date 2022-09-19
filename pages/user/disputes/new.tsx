import { ArrowBack } from "@mui/icons-material"
import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { FormInput } from "../../../components/FormInput"
import { UserDashboardLayout } from "../../../components/user/UserDashboardLayout"
import { disputeLevel } from "../../../constants"
import { Api } from "../../../helpers/api"
import { DisputeLevel, MesssageForm } from "../../../Typing.d"

const Page = () => {
    const router = useRouter()
    const formRef = React.useRef<HTMLFormElement>()

    const [form, setForm] = React.useState<MesssageForm>({
        title: '',
        content: '',
        dispute_level: 0,
        type: 'text',
        is_dispute: true
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
            <div>
                <form ref={formRef} className=" shadow-md rounded-md border border-gray-100 p-4">
                    <IconButton onClick={() => router.back()}>
                        <ArrowBack sx={{ color: 'red' }} />
                    </IconButton>
                    <div className="text-center text-gray-600">
                        New Dispute
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
                                    className="p-2 border border-gray-500 w-full min-h-[20vh] text-gray-600" placeholder="Message" />
                                <div className="">
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">Urgency Level</InputLabel>
                                            <Select
                                                required={true}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={form.dispute_level}
                                                label="Urgency Level"
                                                className="overflow-hidden"
                                                onChange={(e) => setForm({ ...form, dispute_level: e.target.value as unknown as DisputeLevel })}
                                            >
                                                {disputeLevel.map((d, i) =>
                                                    <MenuItem className="text-gray-500 text-sm" key={i} value={d.value} >
                                                        <div className="text-gray-500">
                                                            <span className="text-md text-black">{d.name}</span>
                                                        </div>
                                                    </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 text-center">
                                You can attach a photo after starting a conversation
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
            </div>
        </>
        }
    </UserDashboardLayout >
}

export default Page