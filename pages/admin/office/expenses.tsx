import { Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import {  GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import GridTable from "../../../components/Grid";
import { money } from "../../../helpers/helpers";
import { loadExpenses } from "../../../redux/admin/admin";
import { RootState, useAppDispatch } from "../../../store";


const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
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
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 400,
    },
    {
        field: 'duration',
        headerName: 'Duration',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 100,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ row }) => <div> {money(row.amount)} </div>
    },
    {
        field: '',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 50,
        renderCell: ({ row }) => <UpdateAction row={row} />
    },
];

const UpdateAction = ({ row }: { row: any }) => {
    const router = useRouter()
    return <>
        <IconButton className="cursor-pointer" onClick={() => router.push('/admin/office/expense/update?id=' + row.id)}>
            <Edit />
        </IconButton>
    </>
}

function Page() {
    const { data, state } = useSelector((store: RootState) => store.expenseSlice)
    const router = useRouter()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(loadExpenses())
    }, [])

    return <AdminDashboardLayout>
        {() => (
            <React.Fragment>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg red'>Expenses</h1>

                    <Button variant='outlined' size='small'
                        onClick={() => router.push('/admin/office/expense/new')}>
                        NEW EXPENSES
                    </Button>
                </div>
                <div className="h-[80vh] py-4">
                    <GridTable
                        state={state}
                        columns={columns}
                        rows={data.map((s, i) => ({ ...s, _id: i + 1 }))}
                    />
                </div>
            </React.Fragment>
        )}
    </AdminDashboardLayout>
}

export default Page;
