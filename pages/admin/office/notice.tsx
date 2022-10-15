import { Delete } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import GridTable from "../../../components/Grid";
import { ImageUpload } from "../../../components/ImageUpload";
import { BASEURL } from "../../../config";
import { Api } from "../../../helpers/api";
import { ApiResponse, LoadState, Notice } from "../../../Typing";


const columns: GridColDef[] = [
	{
		field: '_id',
		headerName: 'ID',
		width: 50,
	},
	{
		field: 'title',
		headerName: 'Title',
		width: 250,
		align: 'center',
		headerAlign: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
	},
	{
		field: 'content',
		headerName: 'Content',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 500,
		renderCell: ({ row }: { row: Notice }) => <div> {row.type === 'image' ? 'Image' : row.content} </div>
	},
	{
		field: '',
		headerName: ':',
		headerAlign: 'center',
		align: 'center',
		filterable: false,
		hideable: false,
		disableColumnMenu: true,
		width: 20,
		renderCell: ({ row }) => <DeleteAction row={row} />
	},
];

const DeleteAction = ({ row }: { row: any }) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	return <>
		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
			<DialogTitle sx={{ fontSize: 15, textAlign: 'center' }}>
				DELETE NOTICE
			</DialogTitle>
			<DialogContent>
				This action is irreversible
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={() => setDialogOpen(false)}>
					CANCEL
				</Button>
				<Button color="success" onClick={async () => {
					setDialogOpen(false)
					try {
						await Api().delete('/admin/notice?id=' + row.id)
						row.load()
					} catch (error) {

					}
				}}>
					CONFIRM
				</Button>
			</DialogActions>
		</Dialog>
		<IconButton disabled={row.status === 1} onClick={() => setDialogOpen(true)}>
			<Delete fontSize="small" className={`text-red-500 cursor-pointer`} />
		</IconButton>
	</>
}

function Page() {
	const [data, setData] = React.useState<Notice[]>([])
	const [newForm, setNewForm] = React.useState<{
		open: boolean
		data?: Notice
	}>({ open: false })
	const [state, setState] = React.useState<LoadState>('nil')

	const _req = async () => {
		setState('pending')
		try {
			const response = await fetch(BASEURL + '/notices')
			if (response.status == 200) {
				const data = await response.json() as ApiResponse<Notice[]>
				if (data.status === "success") {
					setData(data.data)
				}
			}
		} catch (error) {

		}
		setState('success')
	}

	React.useEffect(() => {
		_req()
	}, [])

	const closePreview = () => setNewForm({ open: false })

	return <AdminDashboardLayout>
		{() => (
			<React.Fragment>
				<div className='flex justify-between items-center'>
					<h1 className='text-lg red'>Notice</h1>

					<Button variant='outlined' size='small'
						onClick={() => setNewForm({ open: true })}>
						ADD NOTICE
					</Button>
				</div>
				<Dialog open={newForm.open} onClose={closePreview}>
					<DialogContent>
						<NewNoticeForm close={() => {
							closePreview()
							_req()
						}} />
					</DialogContent>
				</Dialog>
				<div className="py-4 h-full">
					<GridTable
						state={state}
						columns={columns}
						rows={data.map((e, i) => ({ ...e, _id: i + 1, load: _req }))}
					/>
				</div>
			</React.Fragment>
		)}
	</AdminDashboardLayout>
}

const NewNoticeForm = ({ close }: { close: () => void }) => {
	const [loading, setLoading] = React.useState(false)
	const [form, setForm] = React.useState<Notice>({
		title: '',
		content: '',
		type: 'text'
	})

	const create = async () => {
		if (form.content === '') return
		setLoading(true)
		try {
			await Api().post('/admin/notice', JSON.stringify(form))
			close()
		} catch (error) {

		}
		setLoading(false)
	}

	return <>
		<div className="max-w-xl w-[80vw] space-y-2">
			<div>
				CREATE NEW NOTICE
			</div>
			<div>
				<TextField
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					label='Title'
					fullWidth
					size="small" />
			</div>
			<div>
				<Select
					size="small"
					value={form.type}
					fullWidth
					onChange={e => setForm({ ...form, type: e.target.value as 'text' | 'image' })}
				>
					{['image', 'text'].map((t, i) => <MenuItem value={t} key={i}>
						{t}
					</MenuItem>)}
				</Select>
			</div>
			{form.type === 'text'
				?
				<div>
					<textarea onChange={(e) => setForm({ ...form, type: 'text', content: e.target.value })} 
					className="h-52 w-full border border-gray-300 bg-transparent rounded-md p-2" placeholder="Notice..." />
				</div>
				:
				<div>
					<ImageUpload
						height={280}
						width={'100%'}
						handleUpload={(s) => setForm({ ...form, type: 'image', content: s })}
					/>
				</div>}
			<div className="flex justify-center">
				<Button
					onClick={create}
					disabled={loading}
					startIcon={loading && <CircularProgress size={14} />}
					variant="outlined" size='small'>
					CREATE
				</Button>
			</div>
		</div>
	</>
}
export default Page;
