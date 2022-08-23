import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomeSignUp() {
	return (
		<div className='flex flex-col md:flex-row lg:space-x-4 space-y-4 md:space-y-1 lg:space-y-0 md:space-x-3 min-w-60 mx-2 lg:mx-4'>
			<div className='lg:w-6/12 relative w-full'>
				<div className='bg-black absolute opacity-60 z-10 h-full w-full'></div>
				<div className='text-sm space-y-4 lg:space-y-12 text-center absolute z-20 w-full h-full flex flex-col justify-center items-center p-4 leading-loose'>
					<h3 className='text-md font-medium lg:text-3xl sm:text-2xl text-white text-center my-5'>
						Have a reference number?
					</h3>
					<p className='text-sm lg:text-xl text-white text-center sm:text-md my-4'>
						Sign up here to pick up your keys or login to message us
					</p>
					<Link href='/Login'>
						<button className=' bg-red text-white px-3 py-1 rounded-full md:px-6 md:py-2 my-4 lg:my-6 hover:scale-110 active:scale-95'>
							Sign Up / Login
						</button>
					</Link>
				</div>
				<Image
					src='/image/sign.jpg'
					className='lg:w-6/12 w-full rounded-md'
					layout='responsive'
					width={100}
					height={70}
					alt="image"
				/>
			</div>

			<div className='lg:w-6/12 relative w-full py-auto rounded-md'>
				<div className='bg-black absolute opacity-60 z-10 h-full w-full'></div>
				<div className='text-sm space-y-4 lg:space-y-10 text-center absolute z-20 w-full h-full flex flex-col justify-center items-center p-2 md:p-4 lg:p-16'>
					<p className='text-center text-lg lg:text-xl text-white sm:text-lg leading-loose'>
						Ojarh Plaza is now open for you to rent and sell to your customers.
						Our location remains the best and surely very accessible. Our
						processes are automated for credibility and satisfaction
					</p>
				</div>
				<Image
					src='/image/sign2.jpg'
					className='lg:w-6/12 w-full rounded-md'
					layout='responsive'
					width={100}
					height={70}
					alt="image"
				/>
			</div>
		</div>
	);
}

export default HomeSignUp;
