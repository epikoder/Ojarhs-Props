import React from "react";
import { useSelector } from "react-redux";
import { Space } from "../../../Typing.d";
import { ImageUpload, VideoUpload } from "../../../components/ImageUpload";
import { GalleryUploader } from "../../../components/admin/GalleryUploader";
import { PaymentPlans, PropertyType } from "../../../components/Resource";
import { RootState, useAppDispatch } from "../../../store";
import Loader from "../../../components/Loader";
import { addNewPropertyThunck } from "../../../actions/admin/admin";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import { useRouter } from "next/router";
import { resetPropertyState } from "../../../features/admin/propertySlice";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import { FormInput } from "components/FormInput";
import { ArrowBack } from "@mui/icons-material";

function NewProps() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [form, setForm] = React.useState<Space>({
		name: '',
		amount: 0,
		description: '',
		no: '',
		photo: '',
		type: '',
		address: '',
		size: '',
		video: '',
		plan: '',
		galleries: [],
		video_galleries: []
	} as Space)
	const [formError, setFormError] = React.useState<Partial<Space>>({})
	const { status, err, message } = useSelector((store: RootState) => store.propertySlice)

	React.useEffect(() => {
		if (err === undefined) return
		setFormError(err as unknown as Space)
	}, [err])

	React.useEffect(() => {
		if (status === 'success') {
			setTimeout(async () => {
				await router.push("/admin/properties")
			}, 800)
		}
	}, [status, router])

	React.useEffect(() => { dispatch(resetPropertyState()) }, [status])

	return (
		<AdminDashboardLayout>
			{() =>
				<React.Fragment>
					<div>
						<IconButton onClick={router.back}>
							<ArrowBack />
						</IconButton>
					</div>
					<Card elevation={2}>
						<div className='p-2 text-center uppercase'>
							Add New Property
						</div>
						<div className={`text-center my-1 text-${status === 'failed' ? 'red' : 'blue'}-500`}>
							<div className="font-serif text-sm">{status !== 'nil' && message}</div>
						</div>
						<form onSubmit={e => e.preventDefault()} action='' className='space-y-4 py-8 px-4 md:px-2 lg:px-4'>
							<FormInput
								props={{
									title: 'Name',
									value: form.name,
									handleChange: (s) => setForm({
										...form, name: s
									}),
									message: formError.name,
									required: true,
								}}
							/>

							<FormInput
								props={{
									title: 'Property ID',
									value: form.no,
									handleChange: (s) => setForm({
										...form, no: s
									}),
									message: formError.no,
									required: true,
								}}
							/>
							<FormInput
								props={{
									title: 'Size',
									value: form.size,
									handleChange: (s) => setForm({
										...form, size: s
									}),
									message: formError.size,
									required: true,
								}}
							/>

							<FormInput
								props={{
									title: 'Description',
									value: form.description,
									handleChange: (s) => setForm({
										...form, description: s
									}),
									message: formError.description,
									required: true,
								}}
							/>

							<FormInput
								props={{
									title: 'Address',
									value: form.address,
									handleChange: (s) => setForm({
										...form, address: s
									}),
									message: formError.address,
									required: true,
								}}
							/>

							<FormInput
								props={{
									title: 'Amount',
									value: form.amount,
									handleChange: (s) => setForm({
										...form, amount: s
									}),
									message: formError?.amount?.toString() || '',
									required: true,
									type: 'number'
								}}
							/>

							<PropertyType
								value={form.type}
								error={formError.type !== undefined}
								handleChange={(s) => setForm({
									...form, type: s
								})} />

							<PaymentPlans
								value={form.plan}
								error={formError.plan !== undefined}
								handleChange={(s) => setForm({
									...form, plan: s
								})} />
							<div>
								<ImageUpload
									message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED IMAGE"}</div>}
									width={260}
									handleUpload={(s, raw) => setForm({
										...form, photo: s
									})} />
							</div>
							<GalleryUploader
								title="Upload Gallery Videos"
								type="image"
								width={260}
								handleChange={(l) => setForm({
									...form, galleries: l
								})} />
							<div>
								<VideoUpload
									headless={false}
									message={<div className={`text-sm text-${formError.photo ? 'red' : 'gray'}-500`}>{"FEATURED VIDEO"}</div>}
									width={260} handleUpload={(s) => setForm({
										...form, video: s
									})} />
							</div>
							<GalleryUploader
								title="Upload Gallery Videos"
								type="video"
								width={260}
								handleChange={(l) => setForm({
									...form, video_galleries: l
								})} />
							{status === 'pending' && <Loader />}
							<div className="flex justify-center">
								<Button
									disabled={status === 'pending'}
									variant='outlined'
									size='small'
									startIcon={status === 'pending' && <CircularProgress size={14} />}
									onClick={() => {
										setFormError({})
										dispatch(addNewPropertyThunck(form))
									}}
								>
									{status !== 'pending' ? 'Add New' : 'Please wait...'}
								</Button>
							</div>
						</form>
					</Card>
				</React.Fragment>}
		</AdminDashboardLayout>
	);
}

export default NewProps;
