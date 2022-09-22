import { Visibility } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import Loader from "../../components/Loader";
import { Api } from "../../helpers/api";
import { loadAdminPackoutRequest } from "../../redux/admin/admin";
import { RootState, useAppDispatch } from "../../store";
import { MessageOwner, PackoutRequest } from "../../Typing.d";

const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'fname',
        headerName: 'User',
        width: 200,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        renderCell: ({ row }) => <div className="ellipse"> {row.lname} {row.fname} </div>
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
        renderCell: ({ row }) => <ViewAction row={row} />
    },
];

const Status = ({ row }: { row: any }) => {
    return <div className={`text-xs uppercase px-2 py-1 ${row.status === 0 ? 'bg-yellow-500' : row.status === 1 ? 'bg-blue-500' : 'bg-red-500'} rounded-md text-white`}>
        <span> {row.status === 0 ? 'pending' : (row.status === 1 ? 'approved' : 'rejected')} </span>
    </div>
}

const ViewAction = ({ row }: { row: any }) => {
    return <IconButton onClick={() => row.view()}>
        <Visibility fontSize="small" />
    </IconButton>
}

function Page() {
    const { data, state } = useSelector((store: RootState) => store.packoutSlice)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = React.useState(false)
    const [preview, setPreview] = React.useState<{
        open: boolean
        data?: PackoutRequest
    }>({ open: false })

    React.useEffect(() => {
        dispatch(loadAdminPackoutRequest())
    }, [dispatch])

    const view = (request: PackoutRequest) => {
        setPreview({ open: true, data: request })
    }

    const closePreview = () => setPreview({ open: false })
    const approve = async (request: PackoutRequest) => {
        try {
            await Api().post(`/admin/packout/status?id=${request.id}&slug=${request.property}&status=1`)
            closePreview()
            dispatch(loadAdminPackoutRequest())
        } catch (error) {

        }
    }

    const reject = async (request: PackoutRequest) => {
        try {
            await Api().post(`/admin/packout/status?id=${request.id}&slug=${request.property}&status=2`)
            closePreview()
            dispatch(loadAdminPackoutRequest())
        } catch (error) {

        }
    }

    return <AdminDashboardLayout>
        {
            () => <React.Fragment>
                <div className="text-gray-500 text-sm lg:text-lg">
                    Packout Requests
                </div>
                <Dialog open={preview.open} onClose={closePreview}>
                    {preview.data !== undefined && <DialogContent>
                        <RequestPreview request={preview.data} />
                    </DialogContent>}
                    {preview.data !== undefined && <DialogActions>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <Button variant="outlined"
                                size='small'
                                onClick={() => approve(preview.data)}
                                fullWidth
                                startIcon={loading && <CircularProgress size={'14'} />}
                                disabled={preview.data.status !== 0 || loading}
                            >
                                Approve
                            </Button>
                            <Button variant="outlined"
                                size='small'
                                onClick={() => reject(preview.data)}
                                fullWidth
                                startIcon={loading && <CircularProgress size={'14'} />}
                                disabled={preview.data.status !== 0 || loading}
                            >
                                Reject
                            </Button>
                        </div>
                    </DialogActions>}
                </Dialog>
                <div className="my-2 h-full">
                    <DataGrid
                        columns={columns}
                        rows={data.map((r, i) => ({ _id: i + 1, ...r, view: () => view(r) }))}
                    />
                </div>
            </React.Fragment>
        }
    </AdminDashboardLayout>
}

const RequestPreview = ({ request }: { request: PackoutRequest }) => {
    return <div className=" max-w-screen-md w-[80vw]">
        <div className="text-center text-red-500 text-sm w-full">
            <span> {request.name} </span>
        </div>
        <div>
            <label className="text-gray-500">
                Reason
            </label>
            <textarea
                maxLength={2000}
                value={request.reason}
                disabled
                className="bg-white border border-gray-500 p-2 w-full h-[40vh] outline-red-500 px-1"
                placeholder="Please state your reason..." />
        </div>
        <div className="">
            <label className="text-gray-500">
                Date
            </label>
            <div>
                <TextField value={request.date} disabled />
            </div>
        </div>
        <div className="flex justify-center my-2">
            <Status row={request} />
        </div>
    </div>
}

export default Page;
