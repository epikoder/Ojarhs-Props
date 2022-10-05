import { ArrowBack } from "@mui/icons-material"
import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Paper, Select } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { SearchTenants } from "../../../components/admin/Search"
import { FormInput } from "../../../components/FormInput"
import { resetMessageState } from "../../../features/admin/messageSlice"
import { createAdminMessage } from "../../../actions/admin/admin"
import { loadAllTenants } from "../../../actions/admin/tenant"
import { RootState, useAppDispatch } from "../../../store"
import { MesssageForm } from "../../../Typing.d"

const Page = () => {
    const { data, status } = useSelector((store: RootState) => store.tenantsSlice)
    const { state } = useSelector((store: RootState) => store.messageSlice)
    const router = useRouter()

    const dispatch = useAppDispatch()
    const formRef = React.useRef<HTMLFormElement>()
    const [form, setForm] = React.useState<MesssageForm>({
        title: '',
        content: '',
        type: 'text',
        receiver: '',
        is_report: true
    })

    React.useEffect(() => {
        dispatch(resetMessageState())
        dispatch(loadAllTenants({}))
    }, [])

    React.useEffect(() => {
        if (state === 'success' && form.title !== '' && form.content !== '' && form.receiver !== '') {
            setTimeout(() => {
                return router.back()
            }, 800)
        }
    }, [state])

    React.useEffect(() => {
        setForm({ ...form, receiver: '' })
    }, [data])

    return <AdminDashboardLayout>
        {() => <>
            <Paper>
                <form ref={formRef} >
                    <IconButton onClick={router.back}>
                        <ArrowBack />
                    </IconButton>
                    <div className="text-center">
                        New Report
                    </div>
                    <div className="flex justify-center my-4 p-2">
                        <div className="max-w-screen-lg w-full space-y-2">
                            <div className="text-center text-blue-500 text-sm">
                                {state === 'success' && form.title !== '' && form.content !== '' && form.receiver !== '' ? 'Sent Successfully' : ''}
                            </div>
                            <div className="flex justify-end my-2">
                                <div className="max-w-[200px]">
                                    <label htmlFor="" className="text-xs uppercase">Filter</label>
                                    <SearchTenants />
                                </div>
                            </div>
                            <div className="">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Receiver</InputLabel>
                                        <Select
                                            required={true}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={form.receiver}
                                            label="Receiver"
                                            className="overflow-hidden"
                                            onChange={(e) => setForm({ ...form, receiver: e.target.value })}
                                        >
                                            {data.map((u, i) => <MenuItem className="text-sm" key={i} value={u.id} >
                                                <div>
                                                    <span >{u.lname} {u.fname}</span>
                                                    <span className="hidden lg:block text-sec text-xs lg:text-sm">{u.email} </span>
                                                </div>
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
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
                                    disabled={state === 'pending' || form.content === '' || form.receiver === ''}
                                    startIcon={state === 'pending' && <CircularProgress size={14} />}
                                    onClick={() => dispatch(createAdminMessage(form))}
                                >
                                    SEND
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Paper>
        </>
        }
    </AdminDashboardLayout >
}

export default Page