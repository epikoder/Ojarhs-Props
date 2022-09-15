import { Delete, Edit, MoreVert, Visibility } from "@mui/icons-material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Menu, MenuItem } from "@szhsin/react-menu"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { loadApplications } from "../../../redux/admin/admin"
import { RootState, useAppDispatch } from "../../../store"
import { UserApplicationStatus } from "../../../Typing.d"


const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'type',
        headerName: 'Document Type',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'fname',
        headerName: 'First Name',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 220
    },
    {
        field: 'lname',
        headerName: 'Last Name',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        // renderCell: ({ value }) => <div>{money(value)}</div>
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
        renderCell: ({ row }) => <Status active={row.status === 'verified'} status={row.status} />
    },
    {
        field: 'action',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 20,
        renderCell: ({ value, row }) => <ActionCell row={row} />
    },
];


const Status = ({ active, status }: { active: boolean, status: UserApplicationStatus }) => {
    return <>
        <div className={`bg-${active ? 'blue' : 'red'}-500 px-2 py-1 rounded-md text-white `}>
            {status === 'document-required' ? 'invalid doc' : (status as string === "" ? '-' : status)}
        </div>
    </>
}

const ActionCell = ({ row }: { row: any }) => {
    const router = useRouter()
    return <Visibility onClick={() => router.push(`/admin/applications/view/${row.user_id}?doctype=${row.type}`)} className="text-black cursor-pointer" height={20} />
}
const Page = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(loadApplications())
    }, [dispatch])

    const { data, status } = useSelector((store: RootState) => store.applicationSlice)
    return <AdminDashboardLayout>
        {() => <React.Fragment>
            <div className='flex justify-between items-center shadow-gray-200 shadow-md px-2 py-2 '>
                <h1 className='lg:text-2xl text-md red'>Applications</h1>
            </div>
            <div className="h-full">
                {status === 'success' && data !== undefined &&
                    <DataGrid
                        rows={data.map((s, i) => ({ ...s, _id: i + 1 }))}
                        columns={columns}
                        pageSize={10}

                    />}
            </div>
        </React.Fragment>}
    </AdminDashboardLayout>
}
export default Page