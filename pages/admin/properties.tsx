import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { RootState, useAppDispatch } from "../../store";
import { useRouter } from "next/router";
import { deleteProperty, resetPropertyState, toggleProperyStatus } from "../../features/admin/propertySlice";
import { ApiResponse, Space } from "../../Typing.d";
import { money } from "../../helpers/helpers";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { loadAdminProperties } from "../../actions/admin/admin";
import ReactSwitch from "react-switch";
import { LoaderWhite } from "../../components/Loader";
import { Api } from "../../helpers/api";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { Box, Button, IconButton } from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import GridTable from "../../components/Grid";

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 120,
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 200,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'type',
		headerName: 'Property',
		width: 200,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		renderCell: ({ value }) => <div className="font-semibold text-sm uppercase"> {value} </div>
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
		width: 400,
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
		field: 'status',
		headerName: 'Status',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		renderCell: ({ row }) => <ActionStatus props={row} />
	},
	{
		field: 'action',
		headerName: ':',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 120,
		renderCell: ({ value, row }) => <ActionCell row={row} />
	},
];

const ActionStatus = ({ props }: { props: any }) => {
	const [loading, setLoading] = React.useState(false)
	const dispatch = useAppDispatch()

	return <ReactSwitch
		checked={props.status === 'occupied'}
		color='success'
		disabled={loading}
		onChange={async () => {
			setLoading(true)
			try {
				const { data, status } = await Api().put<ApiResponse<'open' | 'occupied'>>('/admin/properties/update/status', { slug: props.slug, status: props.status === 'occupied' ? 'open' : 'occupied' })
				setLoading(false)
				if (status !== 200) return
				if (data.status === 'failed') return
				dispatch(toggleProperyStatus({
					index: props.id - 1,
					status: data.data,
				}))
			} catch (error) {
				setLoading(false)
			}
		}} />
}


const ActionCell = ({ row }: { row: any }) => {
	const router = useRouter()
	return <>
		<div className="absolute mx-1 my-4">
			<Menu menuButton={<IconButton><DotsVerticalIcon height={18} /></IconButton>}>
				<div className="py-4"></div>
				<MenuItem className={'rounded-full outline-none my-1'} >
					<IconButton onClick={() => router.push(`/admin/properties/update-property/${row.slug}`)}>
						<Edit height={20} />
					</IconButton>
				</MenuItem>
				<MenuItem className={'rounded-full outline-none my-1'} >
					<IconButton onClick={() => router.push(`/property/${row.slug}`)}>
						<Visibility height={20} />
					</IconButton>
				</MenuItem>
				<MenuItem className={'rounded-full outline-none my-1'} >
					<IconButton onClick={row.delete}>
						<Delete height={20} />
					</IconButton>
				</MenuItem>
			</Menu>
		</div>
	</>
}

function DashProps() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status, data } = useSelector((store: RootState) => store.propertySlice)

	React.useEffect(() => {
		dispatch(loadAdminProperties())
	}, [])

	React.useEffect(() => { dispatch(resetPropertyState()) }, [status])

	const _deleteProperty = (s: string) => dispatch(deleteProperty(s))

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<Box className='flex justify-between w-full items-center px-2 py-1 my-1'>
					<h1 className='lg:text-xl text-lg red'>Properties</h1>
					<Button
						variant='outlined'
						size='small'
						startIcon={<Add fontSize="small" />}
						onClick={() => { router.push('properties/new-property') }}
					>
						ADD NEW
					</Button>
				</Box>
				<GridTable
					columns={columns}
					rows={data.map((s, i) => ({ ...s, id: i + 1, delete: () => _deleteProperty(s.slug) }))}
					state={status}
				/>
			</React.Fragment>}
		</AdminDashboardLayout>
	);
}
export default DashProps;
