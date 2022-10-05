import React from "react"
import { AdminDashboardLayout } from "../../../../components/admin/AdminDashboardLayout"
import { useSelector } from "react-redux";
import { ApplianceInput, FormConfirmPasswordInput, FormCountryInput, FormInput, FormPasswordControlledInput, FormPasswordInput, FormPhoneInput } from "../../../../components/FormInput";
import { DocumentUpload, ImageUpload } from "../../../../components/ImageUpload";
import { ApiResponse, NextOfKin, NextOfKinApi } from "../../../../Typing.d";
import Loader from "../../../../components/Loader";
import { emailValidator } from "../../../../helpers/validation";
import { useRouter } from "next/router";
import { IconButton, Switch } from "@mui/material";
import List from "../../../../helpers/list";
import { BASEURL } from "../../../../constants";
import { RootState } from "../../../../store";
import { Api } from "../../../../helpers/api";
import { ArrowBack } from "@mui/icons-material";

type updateTenantForm = {
	fname: string
	lname: string
	email: string
	phone: number
	password: string
	address: string
	lga: string
	state: string
	country: string
	photo: string
	guarantor_name: string
	guarantor_address: string
	guarantor_phone: number
	business: string
	appliances: string
	interested_shop: string
	next_of_kins: NextOfKin[]

}

const _kin = { kcountry: '', kaddress: '', kemail: '', kfname: '', klga: '', klname: '', kphone: 0, kstate: '' }
const Page = () => {
	const [form, setForm] = React.useState<updateTenantForm>({
		address: '',
		country: '',
		appliances: '',
		phone: '' as unknown as number,
		next_of_kins: [_kin],
		business: '',
		email: '',
		fname: '',
		guarantor_address: '',
		guarantor_name: '',
		guarantor_phone: 0,
		interested_shop: '',
		lga: '',
		lname: '',
		password: '',
		photo: '',
		state: ''
	} as updateTenantForm)

	const [loading, setLoading] = React.useState<boolean>(false);
	const [nextOfKinForm, setNextOfKinForm] = React.useState<NextOfKin[]>([_kin as NextOfKin])
	const [secondNextofKin, setSecondNextofKin] = React.useState<boolean>(false)
	const [errors, setErrors] = React.useState<updateTenantForm>({} as updateTenantForm)
	const formRef = React.useRef<HTMLFormElement>()
	const router = useRouter()
	const [message, setMessage] = React.useState<{ text?: string, status?: boolean }>({});
	const { token } = useSelector((store: RootState) => store.authSlice)

	const getError = (key: string): string | undefined => {
		return errors[key]
	}

	React.useEffect(() => {
		if (secondNextofKin) {
			if (nextOfKinForm.length === 2) {
				setNextOfKinForm(nextOfKinForm)
			} else {
				setNextOfKinForm([nextOfKinForm[0], _kin as NextOfKin])
			}
		} else {
			setNextOfKinForm([nextOfKinForm[0]])
		}
	}, [secondNextofKin])

	React.useEffect(() => {
		if (!router.isReady) return
		const req = async () => {
			try {
				const { data } = await Api().get('/admin/tenants/find?id=' + router.asPath.split('/').pop())

				const nk = (data.data.next_of_kins as NextOfKinApi[]).map(e => {
					const kin: NextOfKin = {
						kfname: e.fname,
						klname: e.lname,
						kemail: e.email,
						kaddress: e.address,
						kcountry: e.country,
						klga: e.lga,
						kphone: e.phone,
						kstate: e.state
					}
					return kin
				})
				setForm({ ...data.data, business: data.data.nature_of_business, next_of_kins: [] })
				setNextOfKinForm(nk)
				if (nk.length == 2) {
					setSecondNextofKin(true)
				}
			} catch (error) {
				setMessage({
					text: 'Could not load Tenant information'
				})
			}
		}
		req()
	}, [router.isReady])

	const submit = async () => {
		let _form = { ...form, next_of_kins: nextOfKinForm, }
		if (!formRef.current.checkValidity()) {
			setMessage({ text: "fill all fields correctly" })
			return
		}
		try {
			setMessage({
				text: ''
			})
			setLoading(true)
			setErrors({} as updateTenantForm)
			var res = await fetch(BASEURL + "/admin/tenants/update", {
				method: 'PUT',
				body: JSON.stringify(_form),
				headers: {
					authorization: ((): string => {
						if (token !== undefined) return 'Bearer ' + token.access
						return ''
					})()
				}
			})
			setLoading(false)
			switch (res.status) {
				case 400:
					let r = await res.json() as ApiResponse
					setMessage({ text: 'please fill the form correctly' })
					if (r.error['photo'] && Object.keys(r.error).length == 1) {
						setMessage({ text: 'please upload your photo' })
					}
					let ee = {} as updateTenantForm
					for (let n in r.error) {
						ee[n] = r.error[n]
					}
					setErrors(ee)
					break
				case 200:
					let rr = await res.json() as ApiResponse
					if (rr.status === 'failed') {
						setMessage({
							status: false,
							text: rr.message
						})
						return
					}
					setMessage({ text: rr.message, status: true })
					setTimeout(() => {
						router.back()
					}, 1500)
					break
				default:
			}
		} catch (error) {
			setLoading(false)
		}
	}

	return <AdminDashboardLayout>
		{() => <React.Fragment>
			<IconButton onClick={router.back}>
				<ArrowBack />
			</IconButton>
			<div className="text-center red text-lg py-2">
				Update Tenant
			</div>
			<div className={`text-center text-sm font-sans text-${message.status ? 'blue' : 'red'}-500`}>
				{message.text !== undefined && message.text}
			</div>
			<form ref={formRef} onSubmit={(e) => e.preventDefault()} action='' className='py-2 px-1 md:px-2 lg:px-4 md:grid md:grid-cols-2 gap-4'>
				<div>
					<h2 className='red'>Personal Information</h2>
					<FormInput props={{
						title: 'First Name',
						name: "fname",
						type: 'text',
						value: form.fname,
						required: true,
						message: getError("fname"),
						handleChange: (s) => {
							setForm({
								...form, fname: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'Last Mame',
						name: "lname",
						type: 'text',
						value: form.lname,
						required: true,
						message: getError("lname"),
						handleChange: (s) => {
							setForm({
								...form, lname: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'Nature of Business',
						name: "business",
						required: true,
						value: form.business,
						message: getError("business"),
						handleChange: (s) => {
							setForm({
								...form, business: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'Interested Shop Name or No',
						name: "interested_shop",
						required: true,
						value: form.interested_shop,
						message: getError("interested_shop"),
						handleChange: (s) => {
							setForm({
								...form, interested_shop: s as unknown as string
							})
						}
					}} />
					<ApplianceInput
						value={form.appliances !== '' ? form.appliances.split(',') : []}
						handleChange={(arr) => {
							setForm({ ...form, appliances: List.toString(arr) })
						}}
					/>
					<FormInput props={{
						title: 'Address',
						name: "address",
						type: 'text',
						value: form.address,
						required: true,
						message: getError("address"),
						handleChange: (s) => {
							setForm({
								...form, address: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'LGA',
						name: "lga",
						value: form.lga,
						required: true,
						message: getError("lga"),
						type: 'text', handleChange: (s) => {
							setForm({
								...form, lga: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'State',
						name: "state",
						type: 'text',
						value: form.state,
						required: true,
						message: getError("state"),
						handleChange: (s) => {
							setForm({
								...form, state: s as unknown as string
							})
						}
					}} />
					<FormCountryInput props={{
						title: 'Country',
						required: true,
						value: form.country,
						handleChange: (s) => {
							setForm({
								...form, country: s as unknown as string
							})
						}
					}} />
					<FormPhoneInput props={{
						title: 'Phone No.',
						name: "phone",
						type: 'number',
						value: form.phone.toString(),
						required: true,
						message: getError("phone"),
						handleChange: (s) => {
							setForm({
								...form, phone: s as unknown as number
							})
						}
					}} />
					<label
						htmlFor=''
						className='space-x-4 w-full text-gray-600'
					>
						<span className='text-gray-600 mb-2 text-md idden'>
							Profile photo
						</span>
						<ImageUpload value={form.photo} key={'photo'} handleUpload={(s) => setForm({
							...form, photo: s as unknown as string
						})} />
					</label>
				</div>
				<div>
					<div className='row-span-1'>
						<h2 className='red'>Guarantor</h2>
						<FormInput props={{
							title: 'Name',
							name: "gurantor_name",
							type: 'text',
							value: form.guarantor_name,
							required: true,
							message: getError("guarantor_name"),
							handleChange: (s) => {
								setForm({
									...form, guarantor_name: s as unknown as string
								})
							}
						}} />
						<FormInput props={{
							title: 'Address',
							name: "guarantor_address",
							type: 'text',
							value: form.guarantor_address,
							required: true,
							message: getError("guarantor_address"),
							handleChange: (s) => {
								setForm({
									...form, guarantor_address: s as unknown as string
								})
							}
						}} />
						<FormPhoneInput props={{
							title: 'Phone No.',
							type: 'number',
							value: form.guarantor_phone as unknown as string,
							required: true,
							message: getError("guarantor_phone"),
							handleChange: (s) => {
								setForm({
									...form, guarantor_phone: s as unknown as number
								})
							}
						}} />
					</div>

					<div>
						<h2 className='red'>Next Of Kin</h2>
						<FormInput props={{
							title: 'First Name',
							type: 'text',
							required: true,
							value: nextOfKinForm[0].kfname,
							handleChange: (s) => {
								nextOfKinForm[0].kfname = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormInput props={{
							title: 'Last Name',
							type: 'text',
							required: true,
							value: nextOfKinForm[0].klname,
							handleChange: (s) => {
								nextOfKinForm[0].klname = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormInput props={{
							title: 'Email',
							type: 'text',
							required: true,
							value: nextOfKinForm[0].kemail,
							message: ((): string => {
								if (nextOfKinForm.length === 0) return
								if (nextOfKinForm[0].kemail === undefined) return undefined
								return emailValidator(nextOfKinForm[0].kemail)
							})(),
							handleChange: (s) => {
								nextOfKinForm[0].kemail = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormInput props={{
							title: 'Address',
							type: 'text',
							required: true,
							value: nextOfKinForm[0].kaddress,
							handleChange: (s) => {
								nextOfKinForm[0].kaddress = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormInput props={{
							title: 'LGA',
							type: 'text',
							required: true,
							value: nextOfKinForm[0].klga,
							handleChange: (s) => {
								nextOfKinForm[0].klga = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormInput props={{
							title: 'State',
							type: 'text',
							required: true,
							value: nextOfKinForm[0].kstate,
							handleChange: (s) => {
								nextOfKinForm[0].kstate = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormCountryInput props={{
							title: 'Country',
							required: true,
							value: nextOfKinForm[0].kcountry,
							handleChange: (s) => {
								nextOfKinForm[0].kcountry = s as unknown as string
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />
						<FormPhoneInput props={{
							title: 'Phone No.',
							type: 'number',
							required: true,
							value: nextOfKinForm[0].kphone as unknown as string,
							handleChange: (s) => {
								nextOfKinForm[0].kphone = s as unknown as number
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />

						<div className="flex items-center">
							<span className="text-sm px-4 text-gray-600">
								Second Next of Kin
							</span>
							<Switch
								checked={secondNextofKin}
								onChange={() => setSecondNextofKin(!secondNextofKin)}
							/>
						</div>
					</div>
				</div>

				{(secondNextofKin && nextOfKinForm.length === 2) && <>
					<div className="col-span-2 md:grid md:grid-cols-2 gap-4">
						<h2 className='red col-span-2'>Next Of Kin</h2>
						<div>
							<FormInput props={{
								title: 'First Name',
								type: 'text',
								required: true,
								value: nextOfKinForm[1].kfname,
								handleChange: (s) => {
									nextOfKinForm[1].kfname = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Last Name',
								type: 'text',
								required: true,
								value: nextOfKinForm[1].klname,
								handleChange: (s) => {
									nextOfKinForm[1].klname = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Email',
								type: 'text',
								value: nextOfKinForm[1].kemail,
								required: true,
								message: ((): string => {
									if (nextOfKinForm.length !== 2) return
									if (nextOfKinForm[1].kemail === undefined) return undefined
									return emailValidator(nextOfKinForm[1].kemail)
								})(),
								handleChange: (s) => {
									nextOfKinForm[1].kemail = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Address',
								type: 'text',
								required: true,
								value: nextOfKinForm[1].kaddress,
								handleChange: (s) => {
									nextOfKinForm[1].kaddress = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
						</div>

						<div>
							<FormInput props={{
								title: 'LGA',
								type: 'text',
								required: true,
								value: nextOfKinForm[1].klga,
								handleChange: (s) => {
									nextOfKinForm[1].klga = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'State',
								type: 'text',
								required: true,
								value: nextOfKinForm[1].kstate,
								handleChange: (s) => {
									nextOfKinForm[1].kstate = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormCountryInput props={{
								title: 'Country',
								value: nextOfKinForm[1].kcountry,
								required: true,
								handleChange: (s) => {
									nextOfKinForm[1].kcountry = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Phone No.',
								type: 'number',
								required: true,
								value: nextOfKinForm[1].kphone,
								handleChange: (s) => {
									nextOfKinForm[1].kphone = s as unknown as number
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
						</div>
					</div>
				</>
				}

				<div className="col-span-2">
					<div className={`text-center text-sm py-2 font-sans text-${message.status ? 'blue' : 'red'}-500`}>
						{message.text !== undefined && message.text}
					</div>
					<div className="w-full flex py-2">
						{!loading ? <>
							<button
								type='submit'
								className="bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer duration-300 transition-all ease-in-out"
								onClick={submit}>

								Update
							</button>
						</> : <div className="relative bg-red mx-auto text-center py-1 px-2 rounded-full mt-4 w-48 h-10 text-white cursor-wait">
							<Loader />
						</div>}
					</div>
				</div>
			</form>
		</React.Fragment>}
	</AdminDashboardLayout>
}

export default Page