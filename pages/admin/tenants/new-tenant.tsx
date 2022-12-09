import React from "react"
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout"
import { useSelector } from "react-redux";
import { ApplianceInput, FormConfirmPasswordInput, FormCountryInput, FormInput, FormPasswordInput, FormPhoneInput } from "../../../components/FormInput";
import { DocumentUpload, ImageUpload } from "../../../components/ImageUpload";
import { ApiResponse, NextOfKin, SignUpForm } from "../../../Typing.d";
import { emailValidator } from "../../../helpers/validation";
import { useRouter } from "next/router";
import { Button, CircularProgress, IconButton, MenuItem, Select, Switch } from "@mui/material";
import List from "../../../helpers/list";
import { BASEURL } from "../../../config";
import { RootState } from "../../../store";
import { ArrowBack } from "@mui/icons-material";

type createTenantForm = SignUpForm & {
	upload: string
	paid: boolean
}

const Page = () => {
	const [form, setForm] = React.useState<createTenantForm>({
		country: '',
		next_of_kins: [{ kcountry: '' }],
		upload: '',
		paid: false
	} as createTenantForm)
	const [types, setTypes] = React.useState<{ id: number, name: string }[]>(Array.from([]))
	const [docType, setDocType] = React.useState<string>('0')

	const [loading, setLoading] = React.useState<boolean>(false);
	const [nextOfKinForm, setNextOfKinForm] = React.useState<NextOfKin[]>([{} as NextOfKin])
	const [secondNextofKin, setSecondNextofKin] = React.useState<boolean>(false)
	const [errors, setErrors] = React.useState<SignUpForm>({} as SignUpForm)
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
				setNextOfKinForm([nextOfKinForm[0], { kcountry: '' } as NextOfKin])
			}
		} else {
			setNextOfKinForm([nextOfKinForm[0]])
		}
	}, [secondNextofKin])

	React.useEffect(() => {
		const req = async () => {
			try {
				let res = await fetch(BASEURL + '/resources/document-types')
				if (res.status !== 200) return
				setTypes((await res.json()).data)
			} catch (error) {
			}
		}
		req()
	}, [])

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
			setErrors({} as SignUpForm)
			var res = await fetch(BASEURL + "/admin/tenants/create", {
				method: 'POST',
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
					let ee = {} as SignUpForm
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
				Add New Tenant
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
						required: true,
						message: getError("lname"),
						handleChange: (s) => {
							setForm({
								...form, lname: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'Email',
						name: "email",
						type: 'text',
						required: true,
						message: ((): string => {
							if (form.email === undefined) return undefined
							if (getError("email") !== undefined && getError("email").includes("exist")) return getError("email")
							return emailValidator(form.email)
						})(),
						handleChange: (s) => {
							setForm({
								...form, email: s as unknown as string
							})
						}
					}} />
					<FormInput props={{
						title: 'Nature of Business',
						name: "business",
						required: true,
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
						message: getError("interested_shop"),
						handleChange: (s) => {
							setForm({
								...form, interested_shop: s as unknown as string
							})
						}
					}} />
					<ApplianceInput
						handleChange={(arr) => {
							setForm({ ...form, appliances: List.toString(arr) })
						}}
						error={getError('appliances') !== undefined}
					/>
					<FormInput props={{
						title: 'Address',
						name: "address",
						type: 'text',
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
						className='space-x-4 w-full '
					>
						<span className=' mb-2 text-md idden'>
							Profile photo
						</span>
						<ImageUpload key={'photo'} handleUpload={(s) => setForm({
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
							handleChange: (s) => {
								nextOfKinForm[0].kphone = s as unknown as number
								setNextOfKinForm([
									...nextOfKinForm,
								])
							}
						}} />

						<div className="flex items-center">
							<span className="text-sm px-4 ">
								Second Next of Kin
							</span>
							<Switch
								checked={secondNextofKin}
								color='success'
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

				<div>
					<span className='mb-2 text-md'>
						Document Upload
					</span>
					<div className="flex justify-center">
						<Select size="small" value={docType} name="" id="" className="text-sm my-2" onChange={(e) => setDocType(e.target.value as string)}>
							<MenuItem className="text-sm" value="0">CHOOSE DOCUMENT TYPE</MenuItem>
							{types.map((e) => <MenuItem className="text-sm" key={e.id} value={e.id}>{e.name}</MenuItem>)}
						</Select>
					</div>
					<DocumentUpload key={'document'} handleUpload={(s) => setForm({
						...form, upload: s as unknown as string
					})} documentType={docType} disabled={docType === '0'} />
				</div>
				<div>
					<FormPasswordInput
						props={{
							title: 'Password',
							name: 'password',
							handleChange(s) {
								setForm({
									...form, password: s
								})
							},
						}}
					/>
					<FormConfirmPasswordInput
					props={{
						name: 'c_password',
						title: 'Confirm Password',
						password: form.password,
						requried: true
					}}
					/>
				</div>
				<div className="col-span-2">
					<div className="flex items-center justify-center">
						<span className="text-sm px-4 ">
							Already paid for application?
						</span>
						<Switch
							checked={form.paid}
							color='success'
							onChange={() => setForm({ ...form, paid: !form.paid })}
						/>
					</div>
					<div className={`text-center text-sm py-2 font-sans text-${message.status ? 'blue' : 'red'}-500`}>
						{message.text !== undefined && message.text}
					</div>
					<div className="w-full flex py-2 justify-center">
						<Button
							type='submit'
							variant="outlined"
							disabled={loading}
							startIcon={loading && <CircularProgress size={14} />}
							onClick={submit}>
							Create
						</Button>
					</div>
				</div>
			</form>
		</React.Fragment>}
	</AdminDashboardLayout>
}

export default Page