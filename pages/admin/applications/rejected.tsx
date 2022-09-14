import { Delete, Edit, MoreVert, Visibility } from "@mui/icons-material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Menu, MenuItem } from "@szhsin/react-menu"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { loadApplications } from "../../../redux/admin/admin"
import { RootState, useAppDispatch } from "../../../store"


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 220
    },
    {
        field: 'amount',
        headerName: 'Amount',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        type: 'number',
        // renderCell: ({ value }) => <div>{money(value)}</div>
    },
    {
        field: 'manager',
        headerName: 'Manager',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
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
        renderCell: ({ value, row }) => actionCell(row)
    },
];

const actionCell = (row: any) => {
    const router = useRouter()
    return <div className="absolute mx-1">
        <Menu menuButton={<MoreVert fontSize="small" />}>
            <MenuItem className={'p-2 my-2 bg-white rounded-full hover:scale-110 border border-gray-300'} >
                <Edit onClick={() => router.push(`/admin/services/update-service/${row.slug}`)} className="text-black" height={20} />
            </MenuItem>
            <MenuItem className={'p-2 my-2 bg-white rounded-full hover:scale-110 border border-gray-300'} >
                <Visibility onClick={() => router.push(`/services?search=${row.slug}`)} className="text-black" height={20} />
            </MenuItem>
            <MenuItem className={'p-2 my-2 bg-white rounded-full hover:scale-110 border border-gray-300'} >
                <Delete className="text-black" height={20} />
            </MenuItem>
        </Menu>
    </div>
}
const Page = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(loadApplications())
    }, [dispatch])

    const { data, status } = useSelector((store: RootState) => store.advertSlice)
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