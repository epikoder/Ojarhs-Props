import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import GridTable from "../../../components/Grid";
import { Api } from "../../../helpers/api";
import { money } from "../../../helpers/helpers";
import { loadStaffs } from "../../../actions/admin/staff";
import { RootState, useAppDispatch } from "../../../store";
import { ApiResponse } from "../../../Typing";


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
		field: 'email',
		headerName: 'Email',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 200,
	},
	{
		field: 'phone',
		headerName: 'Phone',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 130,
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
		field: 'fee',
		headerName: 'Fee',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		renderCell: ({ row }) => <div> {money(row.fee)} </div>
	},
	{
		field: '.',
		headerName: ':',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		sortable: false,
		disableColumnMenu: true,
		width: 50,
		renderCell: ({ row }) => <UpdateAction row={row} />
	},
	{
		field: '..',
		headerName: '::',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		sortable: false,
		disableColumnMenu: true,
		width: 50,
		renderCell: ({ row }) => <DeleteAction row={row} />
	},
];

const UpdateAction = ({ row }: { row: any }) => {
	const router = useRouter()
	return <>
		<div className="cursor-pointer" onClick={() => router.push('/admin/office/staff/update?id=' + row.id)}>
			<Edit />
		</div>
	</>
}

const DeleteAction = ({ row }: { row: any }) => {
	return <>
		<div className="cursor-pointer" onClick={() => row.delete()}>
			<Delete />
		</div>
	</>
}

function Staffs() {
	const { data, state } = useSelector((store: RootState) => store.staffSlice)
	const router = useRouter()
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		dispatch(loadStaffs())
	}, [])

	const deleteStaff = async (id: string) => {
		try {
			await Api().delete<ApiResponse>('/admin/staffs?id=' + id)
			dispatch(loadStaffs())
		} catch (error) {
		}
	}

	return <AdminDashboardLayout>
		{() => (
			<React.Fragment>
				<div className='flex justify-between items-center'>
					<h1 className='text-lg red'>Staffs</h1>

					<Button variant='outlined' size='small'
						onClick={() => router.push('/admin/office/staff/new')}>
						NEW STAFF
					</Button>
				</div>
				<div className="h-[80vh] py-4">
					<GridTable
						state={state}
						columns={columns}
						rows={data.map((s, i) => ({ ...s, _id: i + 1, delete: () => deleteStaff(s.id) }))}
					/>
				</div>
			</React.Fragment>
		)}
	</AdminDashboardLayout>
}

export default Staffs;
