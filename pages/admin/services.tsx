import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { RootState, useAppDispatch } from "../../store";
import { useRouter } from "next/router";
import { loadAdminServices } from "../../redux/admin/admin";
import { resetServiceState } from "../../features/admin/serviceSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { money } from "../../helpers/helpers";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";


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
		renderCell: ({ value }) => <div>{money(value)}</div>
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
		renderCell: ({ value, row }) => <ActionCell row={row} />
	},
];

const ActionCell = ({ row }: { row: any }) => {
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

function Page() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status, data } = useSelector((store: RootState) => store.serviceSlice)

	React.useEffect(() => {
		dispatch(loadAdminServices())
	}, [])


	React.useEffect(() => { dispatch(resetServiceState()) }, [status])

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<div className='flex justify-between w-full items-center shadow-gray-200 shadow-md px-2'>
					<h1 className='lg:text-xl text-lg red'>Services</h1>
					<button
						type='button'
						className='inline-block px-6 lg:px-12 py-2 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
						onClick={() => { router.push('services/new-service') }}
					>
						Add new
					</button>
				</div>

				<div className="max-w-7xl w-full h-full">
					<DataGrid
						columns={columns}
						rows={data.map((s, i) => ({ ...s, id: i + 1 }))}
					/>
				</div>
			</React.Fragment>}
		</AdminDashboardLayout>
	);
}
export default Page;
