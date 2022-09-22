import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import { BASEURL } from "../../../constants";
import { Api } from "../../../helpers/api";
import { useAppDispatch } from "../../../store";
import { ApiResponse, Notice } from "../../../Typing";


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
	return <IconButton disabled={row.status === 1} onClick={async () => {
		try {
			await Api().delete('/admin/notice?id=' + row.id)
			row.load()
		} catch (error) {

		}
	}}>
		<Delete fontSize="small" className={`text-red-500 cursor-pointer`} />
	</IconButton>
}

function Page() {
	const [data, setData] = React.useState<Notice[]>([])
	const [newForm, setNewForm] = React.useState<{
		open: boolean
		data?: Notice
	}>({ open: false })

	const _req = async () => {
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
					<DataGrid
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
	const [form, setForm] = React.useState<{
		title: string
		content: string
	}>({
		title: '',
		content: ''
	})

	const create = async () => {
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
				<textarea onChange={(e) => setForm({ ...form, content: e.target.value })} className="h-52 w-full border border-gray-300 rounded-md p-2" placeholder="Notice..." />
			</div>
			<div>
				<Button
					onClick={create}
					disabled={loading}
					variant="outlined" size='small'>
					CREATE
				</Button>
			</div>
		</div>
	</>
}
export default Page;
