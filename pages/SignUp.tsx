import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import { ShowPassword, HidePassword } from "../features/TogglePassword";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Layout from "../components/Layout";
import { FormCountryInput, FormInput, FormPasswordInput } from "../components/FormInput";
import { ImageUpload } from "../components/ImageUpload";
import { ApiResponse, NextOfKin, SignUpForm } from "../Typing.d";
import { BASEURL } from "../constants";
import Loader from "../components/Loader";

function SignUp() {
	const dispatch = useDispatch();
	const togglePasswordState = useSelector(TogglePasswordState);
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<{ text?: string, status?: boolean }>({});
	const [secondNextofKin, setSecondNextofKin] = useState<boolean>(false)
	const [form, setForm] = useState<SignUpForm>({} as SignUpForm)
	const [nextOfKinForm, setNextOfKinForm] = useState<NextOfKin[]>([{} as NextOfKin])

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
	}, [secondNextofKin])

	useEffect(() => {
		setForm({ ...form, next_of_kins: nextOfKinForm, })
	}, [nextOfKinForm])

	const submit = async () => {
		try {
			setMessage({
				text: ''
			})
			setLoading(true)
			var res = await fetch(BASEURL + "/auth/register", {
				method: 'POST',
				body: JSON.stringify(form)
			})
			setLoading(false)
			switch (res.status) {
				case 400:
					let r = await res.json() as ApiResponse
					setMessage({ text: 'please fill the form correctly' })
					if (r.error['email'] && r.error['email'].includes("exist")) {
						setMessage({ text: 'User already exist with this email address' })
					}
					if (r.error['photo'] && Object.keys(r.error).length == 1) {
						setMessage({ text: 'please upload your photo' })
					}

					if (r.error['phone'] && r.error['phone'].includes("exist")) {
						setMessage({ text: 'User already exist with this phone number' })
					}
					break
				case 200:
					let rr = await res.json() as ApiResponse
					setMessage({ text: rr.message, status: true })
					setTimeout(() => {
						location.assign("/Login")
					}, 3000)
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
				<div className={`text-center text-md font-sans text-${message.status ? 'blue' : 'red'}-500`}>
					{message.text !== undefined && message.text}
				</div>
				<form onSubmit={(e) => e.preventDefault()} action='' className='py-2 px-1 md:px-2 lg:px-4 md:grid md:grid-cols-2 gap-4'>
					<div>
						<h2 className='red'>Personal Information</h2>
						<FormInput props={{
							title: 'First Name',
							name: "fname",
							type: 'text',
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
							handleChange: (s) => {
								setForm({
									...form, email: s as unknown as string
								})
							}
						}} />
						<FormPasswordInput props={{
							title: 'Password',
							name: "password",
							hidden: togglePasswordState,
							handleChange: (s) => {
								setForm({
									...form, password: s as unknown as string
								})
							}
						}} />
						<FormInput props={{
							title: 'Address',
							name: "address",
							type: 'text',
							handleChange: (s) => {
								setForm({
									...form, address: s as unknown as string
								})
							}
						}} />
						<FormInput props={{
							title: 'LGA',
							name: "lga",
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
							handleChange: (s) => {
								setForm({
									...form, state: s as unknown as string
								})
							}
						}} />
						<FormCountryInput props={{
							title: 'Country',
							handleChange: (s) => {
								setForm({
									...form, country: s as unknown as string
								})
							}
						}} />
						<FormInput props={{
							title: 'Phone No.',
							name: "phone",
							type: 'number',
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
							{/* <input type='file' onChange={onChange} /> */}
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
								handleChange: (s) => {
									setForm({
										...form, guarantor_address: s as unknown as string
									})
								}
							}} />
							<FormInput props={{
								title: 'Phone No.',
								type: 'number',
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
								handleChange: (s) => {
									nextOfKinForm[0].fname = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Last Name',
								type: 'text',
								handleChange: (s) => {
									nextOfKinForm[0].lname = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Email',
								type: 'text',
								handleChange: (s) => {
									nextOfKinForm[0].email = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Address',
								type: 'text',
								handleChange: (s) => {
									nextOfKinForm[0].address = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'LGA',
								type: 'text',
								handleChange: (s) => {
									nextOfKinForm[0].lga = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'State',
								type: 'text',
								handleChange: (s) => {
									nextOfKinForm[0].state = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormCountryInput props={{
								title: 'Country',
								handleChange: (s) => {
									nextOfKinForm[0].country = s as unknown as string
									setNextOfKinForm([
										...nextOfKinForm,
									])
								}
							}} />
							<FormInput props={{
								title: 'Phone No.',
								type: 'number',
								handleChange: (s) => {
									nextOfKinForm[0].phone = s as unknown as number
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
									handleChange: (s) => {
										nextOfKinForm[1].fname = s as unknown as string
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
								<FormInput props={{
									title: 'Last Name',
									type: 'text',
									handleChange: (s) => {
										nextOfKinForm[1].lname = s as unknown as string
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
								<FormInput props={{
									title: 'Email',
									type: 'text',
									handleChange: (s) => {
										nextOfKinForm[1].email = s as unknown as string
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
								<FormInput props={{
									title: 'Address',
									type: 'text',
									handleChange: (s) => {
										nextOfKinForm[1].address = s as unknown as string
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
									handleChange: (s) => {
										nextOfKinForm[1].lga = s as unknown as string
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
								<FormInput props={{
									title: 'State',
									type: 'text',
									handleChange: (s) => {
										nextOfKinForm[1].state = s as unknown as string
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
								<FormCountryInput props={{
									title: 'Country',
									handleChange: (s) => {
										nextOfKinForm[1].country = s as unknown as string
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
								<FormInput props={{
									title: 'Phone No.',
									type: 'number',
									handleChange: (s) => {
										nextOfKinForm[1].phone = s as unknown as number
										setNextOfKinForm([
											...nextOfKinForm,
										])
									}
								}} />
							</div>
<<<<<<< HEAD
							</div>
						</>
=======
						</div>
					</>
>>>>>>> 1230b7bf253181aa3d3ccec717e8c375350a789a
					}

					<div className="col-span-2">
						<div className={`text-center text-md py-2 font-sans text-${message.status ? 'blue' : 'red'}-500`}>
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
							<Link href='/Login' className='ml-1 cursor-pointer'>
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
