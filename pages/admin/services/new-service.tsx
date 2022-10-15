import React from "react";
import { useSelector } from "react-redux";
import { Service } from "../../../Typing.d";
import { ImageUpload } from "../../../components/ImageUpload";
import { PaymentPlans } from "../../../components/Resource";
import { RootState, useAppDispatch } from "../../../store";
import Loader from "../../../components/Loader";
import { addNewServiceThunck } from "../../../actions/admin/admin";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";
import { useRouter } from "next/router";
import { resetPropertyState } from "../../../features/admin/propertySlice";
import { Button, Card, IconButton } from "@mui/material";
import { FormInput } from "../../../components/FormInput";
import { ArrowBack } from "@mui/icons-material";

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
	const [formError, setFormError] = React.useState<Partial<Service>>({})
	const { status, err, message } = useSelector((store: RootState) => store.serviceSlice)

	React.useEffect(() => {
		console.log(err)
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
					<IconButton onClick={() => router.back()}>
						<ArrowBack />
					</IconButton>
					<div className="flex justify-center">
						<Card elevation={3} className='rounded-md my-4 shadow-md relative max-w-4xl px-1 lg:px-4 w-full'>
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
										handleChange={(s) => setForm({ ...form, plan: s })}
										error={formError.plan !== undefined}
									/>
								</div>
								<div>
									<textarea
										onChange={(e) => setForm({ ...form, description: e.target.value })}
										className={`w-full border ${formError.description !== undefined ? 'border-red-500' : 'border-gray-500'} p-2 bg-transparent`}
										placeholder="Decription"
										value={form.description}
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
										onClick={() => {
											setFormError({})
											dispatch(addNewServiceThunck(form))
										}}
									>
										{status !== 'pending' ? 'Add New' : 'Please wait...'}
									</Button>
								</div>
							</form>
						</Card>
					</div>
				</React.Fragment>}
		</AdminDashboardLayout>
	);
}

export default NewService;
