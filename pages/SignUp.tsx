import React from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TogglePasswordState } from "../features/TogglePassword";
import { ShowPassword, HidePassword } from "../features/TogglePassword";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Link from 'next/link';
import Layout from '../components/Layout';


function SignUp() {
    const dispatch = useDispatch();
	const togglePasswordState = useSelector(TogglePasswordState);


  return (
   <Layout>
     <div className='mt-24 bg-gray-300 lg:w-7/12 w-11/12 mx-auto overflow-hidden md:w-9/12 lg:space-y-4 lg:py-8 lg:p-4 shadow-md shadow-gray-600 space-y-2 pt-4'>
        <h1 className='red text-center text-3xl mt-4'> Sign Up</h1>

        <form action="" className='space-y-4 py-8 px-1 md:px-2 lg:px-4'>
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
				<span className='text-gray-600 mb-2 text-xs idden'>Refrence No</span>
				<input
					type='number'
					placeholder='Refrence No'
					className='text-gray-400 bg-transparent outline-none'
				/>
			</label>

            <label htmlFor="" className='space-x-4 w-full space-y-4 text-gray-600'>
                <span>Upload a photo</span>
            <input type="file" />
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


            <Link href='#' className=" text-center justify-center w-full">
				<button type="submit" className="w-full">
					<div  className='bg-red mx-auto text-center py-1 px-2 rounded-full hover:scale-110 active:scale-95 mt-4 w-48 text-white cursor-pointer'>Sign Up</div>
				</button>
			</Link>

			<div className='space-x-4 mx-auto text-sm text-center text-gray-400 '>
				Already have an account?{" "}
				<Link href='/Login' className='ml-1 cursor-pointer'>
					<span className='hov cursor-pointer'>Login</span>
				</Link>
			</div>
        </form>
    </div>
   </Layout>
  )
}

export default SignUp