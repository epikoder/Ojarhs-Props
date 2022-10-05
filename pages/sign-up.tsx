import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import Link from "next/link";
import Layout from "../components/Layout";
import { ApplianceInput, FormConfirmPasswordInput, FormCountryInput, FormInput, FormPasswordControlledInput, FormPhoneInput } from "../components/FormInput";
import { ImageUpload } from "../components/ImageUpload";
import { ApiResponse, NextOfKin, SignUpForm } from "../Typing.d";
import { BASEURL } from "../constants";
import Loader from "../components/Loader";
import { emailValidator } from "../helpers/validation";
import { RootState } from "../store";
import { useRouter } from "next/router";
import LaunchIcon from '@mui/icons-material/Launch';
import { Switch } from "@mui/material";
import List from "../helpers/list";

function SignUp() {
	const togglePasswordState = useSelector(TogglePasswordState);
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<{ text?: string, status?: boolean }>({});
	const [secondNextofKin, setSecondNextofKin] = useState<boolean>(false)
	const [form, setForm] = useState<SignUpForm>({
		country: '',
		next_of_kins: [{ kcountry: '' }]
	} as SignUpForm)
	const [nextOfKinForm, setNextOfKinForm] = useState<NextOfKin[]>([{} as NextOfKin])
	const [errors, setErrors] = useState<SignUpForm>({} as SignUpForm)
	const formRef = useRef<HTMLFormElement>()
	const router = useRouter()
	const { authenticated } = useSelector((store: RootState) => store.authSlice)

	React.useEffect(() => {
		if (authenticated) {
			router.replace('/user/dashboard')
		}
	}, [])

	useEffect(() => {
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

	const getError = (key: string): string | undefined => {
		return errors[key]
	}

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
			var res = await fetch(BASEURL + "/auth/register", {
				method: 'POST',
				body: JSON.stringify(_form)
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
						router.replace("/login")
					}, 1500)
					break
				default:
			}
		} catch (error) {
			setLoading(false)
		}
	}

	return (
		<Layout>
			<div className='my-16 bg-gray-100 lg:w-8/12 w-11/12 mx-auto px-2 overflow-hidden md:w-10/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 py-4'>
				<div className='red text-center lg:text-2xl md:text-xl text-lg '> Sign Up / Application Form</div>
				<div className={`text-center text-sm font-sans text-red-500`}>
					All fields are compulsory*
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
						/>
						<FormPasswordControlledInput props={{
							title: 'Password',
							name: "password",
							requried: true,
							message: getError("password") || form.password !== '' && form.password !== undefined && form.password.length < 8 ? ' ' : undefined,
							hidden: togglePasswordState,
							handleChange: (s) => {
								setForm({
									...form, password: s as unknown as string
								})
							}
						}} />
						<FormConfirmPasswordInput
							props={{
								title: 'Confirm Password',
								name: "c_password",
								requried: true,
								password: form.password
							}}
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
							className='space-x-4 w-full text-gray-600'
						>
							<span className='text-gray-600 mb-2 text-md idden'>
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

					<div className="col-span-2">
						<div className={`text-center text-sm py-2 font-sans text-${message.status ? 'blue' : 'red'}-500`}>
							{message.text !== undefined && message.text}
						</div>
						<Link href={'/page/terms'}>
							<div className="cursor-pointer">
								<span className="text-gray-500 text-xs">By creating an account you agree to our terms and conditions</span>
								<LaunchIcon fontSize='inherit' />
							</div>
						</Link>
						<div className="text-center text-xs my-2 text-gray-500">
							{`This form doesn't mean that the property has been given to you. However, after reviewing your application our administrator will revert to you via email or your dashboard`}
						</div>
						<div className="w-full flex">
							{!loading ? <>
								<button type='submit' className="bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer duration-300 transition-all ease-in-out" onClick={submit}>

									Sign Up
								</button>
							</> : <div className="relative bg-red mx-auto text-center py-1 px-2 rounded-full mt-4 w-48 h-10 text-white cursor-wait">
								<Loader />
							</div>}
						</div>

						<div className='space-x-4 mx-auto text-sm text-center text-gray-400 '>
							Already have an account?{" "}
							<Link href='/login' className='ml-1 cursor-pointer'>
								<span className='hov cursor-pointer'>Login</span>
							</Link>
						</div>
					</div>

				</form>
			</div>
		</Layout >

	);
}

export default SignUp;
