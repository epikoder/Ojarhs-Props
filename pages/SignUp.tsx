import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import { ShowPassword, HidePassword } from "../features/TogglePassword";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Layout from "../components/Layout";
import { FormInput, FormPasswordInput } from "../components/FormInput";
import { ImageUpload } from "../components/ImageUpload";

function SignUp() {
	const dispatch = useDispatch();
	const togglePasswordState = useSelector(TogglePasswordState);
	const [imageUrl, setImageUrl] = useState([]);
	const [secondNextofKin, setSecondNextofKin] = useState<boolean>(false)

	return (
		<Layout>

			<div className='my-16 bg-gray-100 lg:w-8/12 w-11/12 mx-auto px-2 overflow-hidden md:w-10/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 py-4'>
				<h1 className='red text-center text-2xl my-2'> Sign Up</h1>

				<form action='' className='py-2 px-1 md:px-2 lg:px-4 md:grid md:grid-cols-2 gap-4'>
					<div>
						<h2 className='red'>Personal Information</h2>
						<FormInput props={{ title: 'First Name', type: 'text' }} />
						<FormInput props={{ title: 'Last Mame', type: 'text' }} />
						<FormInput props={{ title: 'Email', type: 'text' }} />
						<FormPasswordInput props={{ title: 'Password', hidden: togglePasswordState }} />
						<FormInput props={{ title: 'Address', type: 'text' }} />
						<FormInput props={{ title: 'LGA', type: 'text' }} />
						<FormInput props={{ title: 'State', type: 'text' }} />
						<FormInput props={{ title: 'Country', type: 'text' }} />
						<FormInput props={{ title: 'Phone No.', type: 'number' }} />
						<label
							htmlFor=''
							className='space-x-4 w-full text-gray-600'
						>
							<span className='text-gray-600 mb-2 text-md idden'>
								Profile photo
							</span>
							{/* <input type='file' onChange={onChange} /> */}
							<ImageUpload key={'photo'} handleUpload={(s) => console.log(s)} />
						</label>
					</div>

			<div className='mt-24 bg-gray-300 lg:w-6/12 w-11/12 mx-auto overflow-hidden md:w-7/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 pt-4'>
				<h1 className='red text-center text-3xl mt-4'> Sign Up</h1>

				<form action='' className='space-y-4 py-8 px-1 md:px-2 lg:px-4'>
					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>First Name</span>
						<input
							type='text'
							placeholder='First Name'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Last Mame</span>
						<input
							type='text'
							placeholder='Last Name'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Email</span>
						<input
							type='email'
							placeholder='Email'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col relative bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs flex justify-between'>
							password{" "}
						</span>
						<input
							type={togglePasswordState ? "text" : "password"}
							placeholder='password'
							className='text-gray-400 bg-transparent outline-none'
						/>

						{togglePasswordState ? (
							<EyeOffIcon
								onClick={() => dispatch(ShowPassword())}
								className='w-4 h-4 absolute bottom-3 right-3'
							/>
						) : (
							<EyeIcon
								onClick={() => dispatch(HidePassword())}
								className='w-4 h-4 absolute bottom-3 right-2'
							/>
						)}
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>State</span>
						<input
							type='text'
							placeholder='State'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Country</span>
						<input
							type='text'
							placeholder='Country'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Phone No</span>
						<input
							type='number'
							placeholder='Phone No'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>LGA</span>
						<input
							type='text'
							placeholder='LGA'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>
							Refrence No
						</span>
						<input
							type='number'
							placeholder='Refrence No'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='space-x-4 w-full space-y-4 text-gray-600'
					>
						<span>Upload a photo</span>
						<input type='file' onChange={onChange} />
					</label>

					<h2 className='red'>Guarantor</h2>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Name</span>
						<input
							type='text'
							placeholder='Name'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Phone No</span>
						<input
							type='number'
							placeholder='Phone No'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Address</span>
						<input
							type='text'
							placeholder='Address'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<div className='flex space-x-3'>
						<h2 className='red'>Next Of Kins</h2>{" "}
						<span className='flex space-x-3'>
							<div className=' group w-6'>
								<span className=' bg-red cursor-pointer px-1.5 py-0 w-full  text-white  text-center items-center justify-center  rounded-full '>
									-{" "}
								</span>
								<div className='hidden group-hover:block absolute text-xs bg-red text-white p-4 rounded-md'>
									Reduce Next Of Kins
								</div>
							</div>

							<div className='group w-6'>
								<span className='bg-red cursor-pointer px-1 py-0 w-full text-white  text-center items-center justify-center  rounded-full '>
									+{" "}
								</span>
								<div className='hidden group-hover:block absolute text-xs bg-red text-white p-4 rounded-md'>
									Increase Next Of Kins
								</div>
							</div>
						</span>
					</div>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>First Name</span>
						<input
							type='text'
							placeholder='First Name'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Last Mame</span>
						<input
							type='text'
							placeholder='Last Name'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Email</span>
						<input
							type='email'
							placeholder='Email'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>State</span>
						<input
							type='text'
							placeholder='State'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Country</span>
						<input
							type='text'
							placeholder='Country'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>Phone No</span>
						<input
							type='number'
							placeholder='Phone No'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<label
						htmlFor=''
						className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
					>
						<span className='text-gray-600 mb-2 text-xs idden'>LGA</span>
						<input
							type='text'
							placeholder='LGA'
							className='text-gray-400 bg-transparent outline-none'
						/>
					</label>

					<div>
						<div className="row-span-1">
							<h2 className='red'>Guarantor</h2>
							<FormInput props={{ title: 'Name', type: 'text' }} />
							<FormInput props={{ title: 'Address', type: 'text' }} />
							<FormInput props={{ title: 'Phone No.', type: 'text' }} />
						</div>

						<div>
							<h2 className='red'>Next Of Kin</h2>
							<FormInput props={{ title: 'First Name', type: 'text' }} />
							<FormInput props={{ title: 'Last Name', type: 'text' }} />
							<FormInput props={{ title: 'Email', type: 'text' }} />
							<FormInput props={{ title: 'Address', type: 'text' }} />
							<FormInput props={{ title: 'LGA', type: 'text' }} />
							<FormInput props={{ title: 'State', type: 'text' }} />
							<FormInput props={{ title: 'Country', type: 'text' }} />
							<FormInput props={{ title: 'Phone No.', type: 'number' }} />

							<div className="flex items-center">
								<span className="text-sm px-4 text-gray-600">
									Add Next of Kin
								</span>
								<input type="checkbox" checked={secondNextofKin} onChange={() => setSecondNextofKin(!secondNextofKin)} />
							</div>
						</div>
					</div>

					{secondNextofKin && <>
						<div className="col-span-2 md:grid md:grid-cols-2 gap-4">
							<h2 className='red col-span-2'>Next Of Kin</h2>
							<div>
								<FormInput props={{ title: 'First Name', type: 'text' }} />
								<FormInput props={{ title: 'Last Name', type: 'text' }} />
								<FormInput props={{ title: 'Email', type: 'text' }} />
								<FormInput props={{ title: 'Address', type: 'text' }} />
							</div>

							<div>
								<FormInput props={{ title: 'LGA', type: 'text' }} />
								<FormInput props={{ title: 'State', type: 'text' }} />
								<FormInput props={{ title: 'Country', type: 'text' }} />
								<FormInput props={{ title: 'Phone No.', type: 'number' }} />
							</div>
						</div></>}

					<div className="col-span-2">
						<Link href='#' className=' text-center justify-center w-full'>
							<button type='submit' className='w-full'>
								<div className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer duration-300 transition-all ease-in-out'>
									Sign Up
								</div>
							</button>
						</Link>

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
