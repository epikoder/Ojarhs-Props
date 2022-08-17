import React from "react";
import Image from "next/image";
import Link from "next/link";

function SignUp() {
	return (
		<div className='flex flex-col md:flex-row md:p-4 p-0 lg:space-x-4 space-y-4 md:space-y-1  lg:space-y-0 md:space-x-3 min-w-60'>
			<div className='lg:w-6/12 relative w-full'>
				<div className='bg-black absolute opacity-60 z-10 h-full w-full'></div>
				<div className='text-sm space-y-4 lg:space-y-12 text-center justify-center absolute top-10 z-20 w-full items-center lg:top-40 sm:space-y-10 '>
					<h1 className='text-lg font-medium lg:text-3xl sm:text-2xl text-white text-center sm:mt-10'>
						Have a reference number?
					</h1>
					<p className='text-sm lg:text-lg text-white text-center sm:text-md w-full mb-3'>
						Sign up here to pick up your keys or login to message us
					</p>
					<Link href='/Login'>
						<button className=' bg-red text-white px-3 py-1 rounded-full md:px-6 md:py-2 mt-4 sm:mt-10 lg:mt-12 hover:scale-110 active:scale-95'>
							Sign Up/Login
						</button>
					</Link>
				</div>
				<Image
					src='/image/sign.jpg'
					className='lg:w-6/12 w-full'
					layout='responsive'
					width={100}
					height={70}
					alt="image"
				/>
			</div>

			<div className='lg:w-6/12 relative w-full py-auto'>
				<div className='bg-black absolute opacity-60 z-10 h-full w-full'></div>
				<div className='text-sm space-y-4 lg:space-y-10 text-center justify-center absolute top-10 py-5 z-20 w-full items-center lg:top-40'>
					<p className='text-center text-sm lg:text-lg text-white sm:text-lg sm:mt-12'>
						Ojarh Plaza is now open for you to rent and sell to your customers.
						Our location remains the best and surely very accessible. Our
						processes are automated for credibility and satisfaction
					</p>
				</div>
				<Image
					src='/image/sign2.jpg'
					className='lg:w-6/12 w-full'
					layout='responsive'
					width={100}
					height={70}
					alt="image"
				/>
			</div>
		</div>
	);
}

export default SignUp;
