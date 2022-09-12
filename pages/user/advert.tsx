import { useSelector } from "react-redux"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { RootState, useAppDispatch } from "../../store"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { addWeek, money } from "../../helpers/helpers";
import React from "react";
import { useRouter } from "next/router";
import { loadUserAdverts } from "../../redux/user/dashboard";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50,
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    },
    {
        field: 'link',
        headerName: 'Link',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 180
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
        renderCell: ({ value, row }) => <div>{addWeek(value, row.duration)}</div>
    },
];

const Page = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.adverts)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(loadUserAdverts({}))
    }, [])

    return <UserDashboardLayout>
        {
            () => <div className="min-h-[20vh]">
                <div className="p-2 font-semibold">
                    Advert
                </div>
                <div className="flex justify-end max-w-2xl px-4">
                    <Button
                    variant="contained"
                    size="small"
                    className="text-sm"
                    sx={{
                        backgroundColor: 'red'
                    }}
                    >
                        NEW ADVERT
                    </Button>
                </div>
                <div className="my-2 p-2">
                    <div className="my-4 max-w-2xl" style={{ height: 400 }}>
                        {state === 'success' && data !== undefined && <DataGrid
                            rows={data.map((s, i) => ({ ...s, id: i + 1 }))}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />}
                    </div>
                </div>
            </div>
        }
    </UserDashboardLayout>
}

export default Page