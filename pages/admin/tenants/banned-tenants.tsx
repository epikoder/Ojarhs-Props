import { Cancel, CheckCircle, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import ReactSwitch from "react-switch";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import Loader from "../../../components/Loader";
import { Api } from "../../../helpers/api";
import { loadAllTenants } from "../../../redux/admin/tenant";
import { RootState, useAppDispatch } from "../../../store";
import { ApiResponse, UserApplicationStatus } from "../../../Typing.d";


const columns: GridColDef[] = [
	{
		field: '_id',
		headerName: 'ID',
		width: 80,
	},
	{
		field: 'fname',
		headerName: 'FIrst Name',
		width: 150,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'lname',
		headerName: 'Last Name',
		width: 150,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'email',
		headerName: 'Email',
		minWidth: 250,
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
		width: 150
	},
	{
		field: 'country',
		headerName: 'Country',
		headerAlign: 'center',
		align: 'center',
		minWidth: 200,
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'applicaation.status',
		headerName: 'Status',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		sortable: false,
		renderCell: ({ row }) => <Status active={row.application.status === 'verified'} status={row.application.status} />
	},
	{
		field: 'is_disabled',
		headerName: 'Status',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		sortable: false,
		renderCell: ({ row }) => <div className={`bg-${row.is_disabled ? 'red' : 'blue'}-500 px-2 py-1 rounded-md text-white `}> {row.is_disabled ? 'Banned' : 'Active'} </div>
	},
	{
		field: 'is_locked',
		headerName: 'Suspended',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		sortable: false,
		renderCell: ({ row }) => <div>{!row.is_locked ? <CheckCircle className="text-blue-500" fontSize="small" /> : <Cancel className="text-red-500" fontSize="small" />}</div>
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
		renderCell: ({ row }) => <EditAction row={row} />
	},
];

const EditAction = ({ row }: { row: any }) => {
	const router = useRouter()
	return <div className="cursor-pointer" onClick={() => { router.push('/admin/tenants/update-tenant/' + row.id) }} >
		<Edit fontSize="small" />
	</div>
}

const Status = ({ active, status }: { active: boolean, status: UserApplicationStatus }) => {
	return <>
		<div className={`bg-${active ? 'blue' : 'red'}-500 px-2 py-1 rounded-md text-white `}>
			{status === 'document-required' ? 'invalid doc' : (status as string === "" ? '-' : status)}
		</div>
	</>
}

const SwitchAction = ({ row }: { row: any }) => {
	const [loading, setLoading] = React.useState(false)
	const dispatch = useAppDispatch()

	return <>
		{loading && <div className="h-full relative">
			<Loader />
		</div>}
		{!loading && <ReactSwitch
			checked={row.approved}
			onChange={async () => {
				setLoading(true)
				try {
					const { data, status } = await Api().post<ApiResponse<boolean>>(`/admin/adverts/approve?id=${row.id}&status=${row.approved ? 0 : 1}`)
					setLoading(false)
					if (status !== 200) return
					if (data.status === 'failed') return
					console.log(row.id, data.data)
				} catch (error) {
					setLoading(false)
				}
			}} />}
	</>
}


function Page() {
	const { data, status } = useSelector((store: RootState) => store.tenantsSlice)
	const dispatch = useAppDispatch()
	const router = useRouter()

	React.useEffect(() => {
		dispatch(loadAllTenants({ banned: true }))
	}, [])

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<div className='w-full flex justify-between items-center my-2'>
					<h1 className='text-lg'>Banned Tenants</h1>
				</div>
				<div className="h-full">
					{status === 'success' && data !== undefined &&
						<DataGrid
							rows={data.map((s, i) => ({ ...s, _id: i + 1 }))}
							columns={columns}
							pageSize={10}

						/>}
				</div>
			</React.Fragment>
			}
		</AdminDashboardLayout>
	);
}
export default Page;
