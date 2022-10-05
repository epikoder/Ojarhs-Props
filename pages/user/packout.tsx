import { Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, Select, TextField } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { Api } from "../../helpers/api"
import { money } from "../../helpers/helpers"
import { loadUserPackoutRequest, loadUserProperties } from "../../redux/user/dashboard"
import { RootState, useAppDispatch } from "../../store"
import { ApiResponse } from "../../Typing"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Delete } from "@mui/icons-material"

const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'name',
        headerName: 'Property',
        width: 350,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'date',
        headerName: 'Date',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
    },
    {
        field: 'status',
        headerName: 'Status',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ row }) => <Status row={row} />
    },
    {
        field: '',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 20,
        renderCell: ({ row }) => <DeleteAction row={row} />
    },
];

const Status = ({ row }: { row: any }) => {
    return <div className={`text-xs uppercase px-2 py-1 ${row.status === 0 ? 'bg-yellow-500' : row.status === 1 ? 'bg-blue-500' : 'bg-red-500'} rounded-md text-white`}>
        <span> {row.status === 0 ? 'pending' : (row.status === 1 ? 'approved' : 'rejected')} </span>
    </div>
}

const DeleteAction = ({ row }: { row: any }) => {
    const dispatch = useAppDispatch()
    return <IconButton disabled={row.status === 1} onClick={async () => {
        try {
            await Api().delete('/user/packout?id=' + row.id)
            dispatch(loadUserPackoutRequest({}))
        } catch (error) {

        }
    }}>
        <Delete fontSize="small" className={`${row.status === 0 ? 'text-red-500' : 'text-gray-500'} cursor-pointer`} />
    </IconButton>
}


const NewRequest = ({ close }: { close: () => void }) => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.properties)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useAppDispatch()
    const [message, setMessage] = React.useState('')

    const [form, setForm] = React.useState({
        space: '',
        message: '',
        date: null as Dayjs
    })
    React.useEffect(() => {
        dispatch(loadUserProperties({}))
    }, [])

    const submit = async () => {
        setLoading(true)
        try {
            const { status } = await Api().post<ApiResponse>('/user/packout', JSON.stringify(form))
            close()
        } catch (error) {
            setMessage('Error occured')
        }
        setLoading(false)
    }

    let t = new Date()
    const minDate = (t.setHours(t.getHours() + (24 * 3))) as unknown as Dayjs

    return <>
        {loading && <Loader />}
        <div className="min-h-[20vh] p-2 max-w-screen-md w-[80vw] space-y-2" >
            <div className="text-center w-full">
                New Packout Request
            </div>
            <div className="text-center text-red-500 text-sm w-full">
                <span> {message} </span>
            </div>

            <div className="my-4">
                {state === 'success' && data !== undefined &&
                    <Select className="w-full" size="small"
                        value={form.space}
                        onChange={(e) => setForm({
                            ...form, space: e.target.value as string
                        })}
                    >
                        {data.map((p, i) => <MenuItem key={i} value={p.slug}>
                            {p.name} {'  -  '} {money(p.amount)} {'  -  '} {p.type}
                        </MenuItem>)}
                    </Select>}
            </div>
            <div className="flex justify-between items-start">
                <textarea
                    maxLength={2000}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value as string })}
                    disabled={form.space === ''}
                    className="bg-white border border-gray-500 p-2 w-full h-[40vh] outline-red-500 px-1"
                    placeholder="Please state your reason..." />
                <div className="text-xs text-center px-1">
                    <span> {form.message.length} </span>
                </div>
            </div>
            <div >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={form.date}
                        minDate={minDate}
                        onChange={(newValue) => {
                            setForm({ ...form, date: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="text-center">
                <span className="text-xs">
                    Message should be at least 50 characters
                </span>
            </div>
            <div className="flex justify-end">
                <Button variant="outlined"
                    size='small'
                    onClick={submit}
                    disabled={form.space === '' || form.message.length < 50 || form.date === null}
                >
                    SUBMIT
                </Button>
            </div>
        </ div>
    </>
}

const Page = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.packRequest)
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(loadUserPackoutRequest())
    }, [])

    return <UserDashboardLayout>
        {() => <>
            <div className="flex justify-between items-center shadow-md rounded-md p-2 lg:p-4 my-2 pt-10">
                <div className="text-lg">
                    Request Pack Out
                </div>
                <div>
                    <Button
                        variant='outlined'
                        size='small'
                        onClick={() => setIsOpen(true)}
                    >
                        CREATE
                    </Button>
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogContent>
                    <NewRequest close={() => {
                        setIsOpen(false)
                        dispatch(loadUserPackoutRequest())
                    }} />
                </DialogContent>
            </Dialog>
            <div className="max-h-[100vh] min-h-[50vh] h-[50vh] md:h-[80vh]">
                <DataGrid
                    columns={columns}
                    rows={data.map((r, i) => ({ _id: i + 1, ...r }))}
                />
            </div>
        </>}
    </UserDashboardLayout>
}

export default Page
