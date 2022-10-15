import { Edit } from "@mui/icons-material";
import { Button, Card, IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { SubAdminPageState, useBloc } from "../../bloc/subadmin/subadmin"
import SubAdminDashboardLayout from "../../components/admin/SubAdminDashboardLayout"
import GridTable from "../../components/Grid"
import NavLink from "../../components/NavLink";
import { User } from "../../Typing";


const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 120,
    },
    {
        field: 'fname',
        headerName: 'First Name',
        width: 200,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'lname',
        headerName: 'Last Name',
        width: 200,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 200,
    },
    {
        field: 'address',
        headerName: 'Address',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 400,
    },
    {
        field: '_',
        headerName: ':',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 50,
        renderCell: ({ row }) => <UpdateAction row={row} />
    },
];

const UpdateAction = ({ row }: { row: Partial<User> }) => {
    const router = useRouter()
    return <IconButton onClick={() => router.push('/admin/subadmin/update/' + row.id)}>
        <Edit />
    </IconButton>
}

const Page = () => {
    const [state, { load }] = useBloc(SubAdminPageState)
    const { loading } = state

    React.useEffect(() => {
        load()
    }, [])

    return <SubAdminDashboardLayout>
        {({ }) => <>
            <Card className="flex justify-between items-center my-2 p-2">
                <div>
                    Manage Sub-Admins
                </div>
                <NavLink href="/admin/subadmin/new">
                    <Button
                        size='small'
                        variant='outlined'>
                        Add
                    </Button>
                </NavLink>
            </Card>
            <GridTable
                loading={loading}
                columns={columns}
                rows={state.data.map((u, i) => ({ ...u, _id: i + 1 }))}
            />
        </>}
    </SubAdminDashboardLayout>
}
export default Page