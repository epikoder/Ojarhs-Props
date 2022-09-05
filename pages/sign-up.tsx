import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import { ShowPassword, HidePassword } from "../features/TogglePassword";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Layout from "../components/Layout";
import { FormCountryInput, FormInput, FormPasswordInput, FormPhoneInput } from "../components/FormInput";
import { ImageUpload } from "../components/ImageUpload";
import { ApiResponse, NextOfKin, SignUpForm } from "../Typing.d";
import { BASEURL } from "../constants";
import Loader from "../components/Loader";
import { emailValidator } from "../helpers/validation";

function SignUp() {
	const dispatch = useDispatch();
	const togglePasswordState = useSelector(TogglePasswordState);
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<{ text?: string, status?: boolean }>({});
	const [secondNextofKin, setSecondNextofKin] = useState<boolean>(false)
	const [form, setForm] = useState<SignUpForm>({} as SignUpForm)
	const [nextOfKinForm, setNextOfKinForm] = useState<NextOfKin[]>([{} as NextOfKin])
	const [errors, setErrors] = useState<SignUpForm>({} as SignUpForm)
	const [cPassword, setCPassowrd] = useState('')
	const [cPasswordState, setCPasswordState] = useState(false)
	const formRef = useRef<HTMLFormElement>()

	useEffect(() => {
		if (secondNextofKin) {
			if (nextOfKinForm.length === 2) {
				setNextOfKinForm(nextOfKinForm)
			} else {
				setNextOfKinForm([nextOfKinForm[0], {} as NextOfKin])
			}
		} else {
			setNextOfKinForm([nextOfKinForm[0]])
		}
		setForm({ ...form, next_of_kins: nextOfKinForm, })
	}, [secondNextofKin, form, nextOfKinForm])

	useEffect(() => {
		setForm({ ...form, next_of_kins: nextOfKinForm, })
	}, [nextOfKinForm, form])

	const getError = (key: string): string | undefined => {
		return errors[key]
	}

	const submit = async () => {
		if (form.password !== cPassword) {
			setMessage({ text: "password do not match" })
			return
		}
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
				body: JSON.stringify(form)
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
						location.assign("/login")
					}, 1500)
					break
				default:
					console.log(res);
			}
		} catch (error) {
			console.log(error);
			setLoading(false)
		}
	}

	return (
		<Layout>
			<div className='my-16 bg-gray-100 lg:w-8/12 w-11/12 mx-auto px-2 overflow-hidden md:w-10/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 py-4'>
				<h1 className='red text-center text-2xl my-2'> Sign Up</h1>
				<div className={`text-center text-md font-sans text-red-500`}>
					All fields are compulsory
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
						<FormPasswordInput props={{
							title: 'Password',
							name: "password",
							requried: true,
							message: getError("password"),
							hidden: togglePasswordState,
							handleChange: (s) => {
								setForm({
									...form, password: s as unknown as string
								})
							}
						}} />
						<label
							htmlFor=''
							className='flex flex-col relative bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2 my-2'
						>
							<span className='text-gray-600 mb-2 text-xs flex justify-between'>
								Confirm Password
							</span>
							<div className="flex items-center justify-between">
								<input
									type={cPasswordState ? "text" : "password"}
									placeholder={"Confirm Password"}
									className='text-gray-500 bg-transparent outline-none w-full'
									onChange={(e) => setCPassowrd(e.target.value as unknown as string)}
								/>

								{cPasswordState ? (
									<EyeOffIcon
										onClick={() => setCPasswordState(!cPasswordState)}
										className='w-4 h-4 bottom-3 right-3'
									/>
								) : (
									<EyeIcon
										onClick={() => setCPasswordState(!cPasswordState)}
										className='w-4 h-4 bottom-3 right-2'
									/>
								)}
							</div>
							<span className='text-red-600 font-serif mb-2 text-xs text-center idden'>
								{form.password !== "" && form.password !== undefined && form.password !== cPassword ? "password mismatch" : undefined}
							</span>
						</label>
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
								message: getError("gurantor_name"),
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
								message: getError("gurantor_address"),
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
								message: getError("gurantor_phone"),
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
									return emailValidator(form.next_of_kins[0].kemail)
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
									Add Next of Kin
								</span>
								<input
									type='checkbox'
									checked={secondNextofKin}
									onChange={() => setSecondNextofKin(!secondNextofKin)}
								/>
							</div>
						</div>
					</div>

					{secondNextofKin && <>
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
										if (form.next_of_kins.length !== 2) return
										if (form.next_of_kins[1].kemail === undefined) return undefined
										return emailValidator(form.next_of_kins[1].kemail)
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
		</Layout>

	);
}

export default SignUp;
