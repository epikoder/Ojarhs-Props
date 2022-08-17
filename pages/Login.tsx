import React from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import { ShowPassword, HidePassword } from "../features/TogglePassword";
import Link from "next/link";
import Layout from "../components/Layout";

function Login() {	
	const dispatch = useDispatch();
	const togglePasswordState = useSelector(TogglePasswordState);

	return (
		<Layout>
			<div className='lg:w-5/12 sm:w-8/12 w-11/12 h-[70%] mt-24 space-y-4 py-8 bg-gray-100 mx-auto shadow-md shadow-gray-500  p-4'>
			<h1 className='red text-center lg:text-3xl md:text-2xl text-2xl '>
				Login
			</h1>

		<form action="" className="space-y-4 py-2 p-4 items-center justify-center">
		<label
				htmlFor=''
				className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
			>
				<span className='text-gray-600 mb-2 text-xs idden'>Email/Username</span>
				<input
					type='email'
					placeholder='Email/Username'
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
				     type={togglePasswordState? "text" : "password"}
					placeholder='password'					
					className='text-gray-400 bg-transparent outline-none'
				/>

				{togglePasswordState ? (
					<EyeOffIcon
						onClick={() => dispatch(ShowPassword()) }
						className='w-4 h-4 absolute bottom-3 right-3'
					/>
				) : (
					<EyeIcon
						onClick={()=> dispatch(HidePassword())  }
						className='w-4 h-4 absolute bottom-3 right-2'
					/>
				)}
			</label>

			<div className='form-check flex justify-between md:items-center flex-col md:flex-row space-y-2 items-start'>
				<label
					className='form-check-label inline-block text-gray-500 text-sm items-center'
					htmlFor='flexCheckDefault'
				>
					<input
						className='form-check-input appearance-none h-5 w-5 border border-gray-300  rounded-sm bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
						type='checkbox'
						value=''
						id='flexCheckDefault'
					/>
					<span>Remember Password</span>
				</label>

				<Link href='#'>
					<div className='text-sm text-gray-500 cursor-pointer hover:text-red-600'>
						Forgot Password ?
					</div>
				</Link>
			</div>

			<Link href='#' className=" text-center justify-center w-full">
				<button type="submit" className="w-full">
					<div  className='bg-red mx-auto text-center rounded-full py-1 px-2 mt-4 w-48 text-white cursor-pointer'>Login</div>
				</button>
			</Link>

			<div className='space-x-4 mx-auto text-sm text-center text-gray-400 '>
				Dont have an account?{" "}
				<Link href='/SignUp' className='ml-1'>
					<span className='hov cursor-pointer'>Sign Up</span>
				</Link>
			</div>
		</form>
		</div>
		</Layout>
	);
}

export default Login;
