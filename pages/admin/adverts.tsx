import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactSwitch from "react-switch";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import GridTable from "../../components/Grid";
import Loader from "../../components/Loader";
import { deleteAdvert, toggleAdvertStatus } from "../../features/admin/advertSlice";
import { Api } from "../../helpers/api";
import { loadAdminAdverts } from "../../actions/admin/admin";
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

const Status = ({ active }: { active: boolean }) => {
	return <>
		<div className={`bg-${active ? 'blue' : 'red'}-500 px-2 py-1 rounded-md text-white `}>
			{active ? 'Active' : 'Inactive'}
		</div>
	</>
}

const DeleteAction = ({ row }: { row: any }) => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false)
	const [dialogOpen, setDialogOpen] = useState(false)

	const _delete = async () => {
		() => setDialogOpen(false)
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
		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
			<DialogTitle sx={{ fontSize: 15, textAlign: 'center' }}>
				DELETE ADVERT
			</DialogTitle>
			<DialogContent>
				This action is irreversible
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={() => setDialogOpen(false)}>
					CANCEL
				</Button>
				<Button color="success" onClick={_delete}>
					CONFIRM
				</Button>
			</DialogActions>
		</Dialog>
		{loading && <div className="h-full relative">
			<Loader />
		</div>}
		{!loading && <Delete onClick={() => setDialogOpen(true)} className="text-red-500 cursor-pointer" height={20} />}
	</>
}

const SwitchAction = ({ row }: { row: any }) => {
	const [loading, setLoading] = useState(false)
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

	useEffect(() => {
		dispatch(loadAdminAdverts())
	}, [dispatch])

	const { data, status } = useSelector((store: RootState) => store.advertSlice)
	return <AdminDashboardLayout>
		{() => <>
			<div className='flex justify-between items-cente px-2 py-2 '>
				<h1 className='lg:text-2xl text-md red'>Adverts</h1>
				<Button
					onClick={() => router.push('/admin/adverts/new-advert')}
					variant='outlined'
					size="small"
					sx={{
						backgroundColor: 'red'
					}}
				>
					ADD NEW
				</Button>
			</div>
			<div className="h-full">
				{status === 'success' && data !== undefined && <GridTable
					rows={data.map((s, i) => ({ ...s, _id: i + 1 }))}
					columns={columns}
					pageSize={10}
					state={status}
				/>}
			</div>
		</>}
	</AdminDashboardLayout>
}

export default Adverts;
