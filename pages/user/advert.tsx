import { useSelector } from "react-redux"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { RootState, useAppDispatch } from "../../store"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { addWeek, money } from "../../helpers/helpers";
import React from "react";
import { useRouter } from "next/router";
import { loadUserAdverts } from "../../actions/user/dashboard";
import { Button, Card } from "@mui/material";
import { Add } from "@mui/icons-material";

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
        field: 'expires_at',
        headerName: 'Status',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ value, row }) => <Status active={(new Date(row.expires_at).getTime() > (new Date()).getTime()) && row.approved} />
    },
    {
        field: 'approved',
        headerName: 'Approved',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        width: 120,
        renderCell: ({ value, row }) => <div className={`px-2 py-1 bg-${row.approved ? 'blue' : 'red'}-500 text-white rounded-md`}> {row.approved ? 'Yes' : 'No'} </div>
    },
];

const Status = ({ active }: { active: boolean }) => {
    return <>
        <div className={`bg-${active ? 'blue' : 'red'}-500 px-2 py-1 rounded-md text-white `}>
            {active ? 'Active' : 'Inactive'}
        </div>
    </>
}

const Page = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.adverts)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        dispatch(loadUserAdverts({}))
    }, [])

    return <UserDashboardLayout>
        {
            () => <div className="min-h-[20vh]">
                <Card className="flex justify-between max-w-2xl p-2 items-center">
                    <div className="font-semibold">
                        Advert
                    </div>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Add />}
                        onClick={() => router.push('/user/advert/new-advert')}
                    >
                        ADVERT
                    </Button>
                </Card>
                <div className="my-2 p-2">
                    <div className="my-4 max-w-2xl" style={{ height: 400 }}>
                        {state === 'success' && data !== undefined && <DataGrid
                            rows={data.map((s, i) => ({ ...s, id: i + 1 }))}
                            columns={columns}
                            pageSize={10}

                        />}
                    </div>
                </div>
            </div>
        }
    </UserDashboardLayout>
}

export default Page