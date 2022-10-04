import React from "react";
import { useSelector } from "react-redux";
import { Service, Space } from "../../../Typing.d";
import { ImageUpload, VideoUpload } from "../../../components/ImageUpload";
import { GalleryUploader } from "../../../components/admin/GalleryUploader";
import { PaymentPlans, PropertyType } from "../../../components/Resource";
import { RootState, useAppDispatch } from "../../../store";
import Loader from "../../../components/Loader";
import { addNewPropertyThunck, addNewServiceThunck } from "../../../actions/admin/admin";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import { useRouter } from "next/router";
import { resetPropertyState } from "../../../features/admin/propertySlice";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Button } from "@mui/material";
import { FormInput } from "../../../components/FormInput";

function NewService() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [form, setForm] = React.useState<Service>({
		name: '',
		amount: 0,
		description: '',
		photo: '',
		plan: '',
		manager: '',
		slug: '',
	} as Service)
	const [formError, setFormError] = React.useState<Service>({} as Service)
	const { status, err, message } = useSelector((store: RootState) => store.serviceSlice)

	React.useEffect(() => {
		if (err === undefined) return
		setFormError(err as unknown as Service)
	}, [err])

	React.useEffect(() => {
		if (status === 'success') {
			setTimeout(async () => {
				await router.push("/admin/services")
			}, 800)
		}
	}, [status, router])

	React.useEffect(() => { dispatch(resetPropertyState()) }, [status])

	return (
		<AdminDashboardLayout>
			{() =>
				<React.Fragment>
					<div>
						<ArrowLeftIcon className="cursor-pointer text-red-500" onClick={() => router.back()} width={40} height={30} />
					</div>
					<div className="flex justify-center">
						<div className='rounded-md bg-white border my-4 mb-8 shadow-md relative max-w-4xl px-1 lg:px-4 w-full'>
							<h1 className='red text-center mt-4'>
								<div className="uppercase text-sm">Add New Service</div>
							</h1>
							<h1 className={`text-center my-1 text-${status === 'failed' ? 'red' : 'blue'}-500`}>
								<div className="font-serif text-sm">{status !== 'nil' && message}</div>
							</h1>
							<form onSubmit={e => e.preventDefault()} action='' className='space-y-4 py-8 px-4 md:px-2 lg:px-4'>
								<div>
									<FormInput props={{
										title: 'Name',
										message: formError.name,
										required: true,
										name: 'name',
										handleChange: (s) => setForm({ ...form, name: s })
									}} />
								</div>
								<div>
									<PaymentPlans
										value={form.plan}
										handleChange={(s) => setForm({ ...form, plan: s })} />
								</div>
								<div>
									<textarea
										onChange={(e) => setForm({ ...form, description: e.target.value })}
										className='w-full border border-gray-300 p-2'
										placeholder="Decription"
									/>
								</div>
								<div>
									<FormInput props={{
										title: 'Amount',
										message: formError.amount as unknown as string,
										required: true,
										name: 'amount',
										type: 'number',
										handleChange: (s) => setForm({ ...form, amount: s })
									}} />
								</div>
								<div>
									<FormInput props={{
										title: 'Manager',
										message: formError.manager,
										required: true,
										name: 'manager',
										handleChange: (s) => setForm({ ...form, manager: s })
									}} />
								</div>
								<div>
									<ImageUpload
										handleUpload={(s) => setForm({ ...form, photo: s })}
									/>
								</div>
								{status === 'pending' && <Loader />}
								<div className="flex justify-center">
									<Button
										variant='outlined'
										disabled={status === 'pending'}
										onClick={() => dispatch(addNewServiceThunck(form))}
									>
										{status !== 'pending' ? 'Add New' : 'Please wait...'}
									</Button>
								</div>
							</form>
						</div>
					</div>
				</React.Fragment>}
		</AdminDashboardLayout>
	);
}

export default NewService;
