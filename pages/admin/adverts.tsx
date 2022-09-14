import { Check, Delete, MoreVert } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import ReactSwitch from "react-switch";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import Loader from "../../components/Loader";
import { deleteAdvert, toggleAdvertStatus } from "../../features/admin/advertSlice";
import { Api } from "../../helpers/api";
import { loadAdminAdverts } from "../../redux/admin/admin";
import { RootState, useAppDispatch } from "../../store";
import { ApiResponse } from "../../Typing.d";

const columns: GridColDef[] = [
	{
		field: '_id',
		headerName: 'ID',
		width: 50,
	},
	{
		field: 'position',
		headerName: 'Position',
		width: 150,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'photo',
		headerName: 'Photo',
		headerAlign: 'center',
		align: 'center',
		sortable: false,
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 220
	},
	{
		field: 'link',
		headerName: 'Link',
		headerAlign: 'center',
		align: 'center',
		minWidth: 200,
		maxWidth: 450,
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
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
		renderCell: ({ row }) => <SwitchAction row={row} />
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
		renderCell: ({ value, row }) => <DeleteAction row={row} />
	},
];

const DeleteAction = ({ row }: { row: any }) => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = React.useState(false)

	const _delete = async () => {
		setLoading(true)
		try {
			const { data, status } = await Api().delete<ApiResponse<boolean>>(`/admin/adverts/delete?id=${row.id}`)
			setLoading(false)
			if (status !== 200) return
			if (data.status === 'failed') return
			dispatch(deleteAdvert(row._id - 1))
		} catch (error) {
			setLoading(false)
		}
	}

	return <>
		{loading && <div className="h-full relative">
			<Loader />
		</div>}
		{!loading && <Delete onClick={_delete} className="text-red-500 cursor-pointer" height={20} />}
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
					dispatch(toggleAdvertStatus({
						index: row._id - 1,
						approved: data.data,
					}))
				} catch (error) {
					setLoading(false)
				}
			}} />}
	</>
}

function Adverts() {
	const router = useRouter()
	const dispatch = useAppDispatch()

	React.useEffect(() => {
		dispatch(loadAdminAdverts())
	}, [dispatch])

	const { data, status } = useSelector((store: RootState) => store.advertSlice)
	return <AdminDashboardLayout>
		{() => <React.Fragment>
			<div className='flex justify-between items-center shadow-gray-200 shadow-md px-2 py-2 '>
				<h1 className='lg:text-2xl text-md red'>Adverts</h1>
				<Button
					onClick={() => router.push('/admin/adverts/new-advert')}
					variant='contained'
					size="small"
					sx={{
						backgroundColor: 'red'
					}}
				>
					ADD NEW
				</Button>
			</div>
			<div className="h-full">
				{status === 'success' && data !== undefined && <DataGrid
					rows={data.map((s, i) => ({ ...s, _id: i + 1 }))}
					columns={columns}
					pageSize={10}

				/>}
			</div>
		</React.Fragment>}
	</AdminDashboardLayout>
}

export default Adverts;
