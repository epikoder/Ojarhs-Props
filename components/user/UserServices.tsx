import { useRouter } from "next/router"
import React, { } from "react"
import { useSelector } from "react-redux"
import { addMonth, money } from "../../helpers/helpers"
import { loadUserServices } from "../../redux/user/dashboard"
import { RootState, useAppDispatch } from "../../store"
import { Service } from "../../Typing.d"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ArrowForward, MoreVert } from "@mui/icons-material"

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
        field: 'manager',
        headerName: 'Manger',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
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
        renderCell: ({ value }) => <div>{money(value)}</div>
    },
    {
        field: 'created_at',
        headerName: 'Expires On',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ value, row }) => <div>{addMonth(value, row.duration)}</div>
    },
    // {
    //     field: 'action',
    //     headerName: 'Action',
    //     headerAlign: 'center',
    //     align: 'center',
    //     filterable: false,
    //     hideable: false,
    //     disableColumnMenu: true,
    //     width: 20,
    //     renderCell: ({ value, row }) => <div> <ArrowForward fontSize="small" /> </div>
    // },
];


export const UserServices = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.services)

    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(loadUserServices({}))
    }, [])

    return (
        <div className="my-4 max-w-2xl" style={{ height: 400 }}>
            <DataGrid
                rows={data.map((s, i) => ({ ...s, id: i + 1 }))}
                columns={columns}
                loading={state === 'pending'}
            />
        </div>)
}