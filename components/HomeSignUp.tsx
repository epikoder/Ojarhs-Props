import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { OjarhButton } from "./Button";
import { useRouter } from "next/router";
import { Parallax } from "react-parallax";

function HomeSignUp() {
	const { authenticated } = useSelector((store: RootState) => store.authSlice)
	const router = useRouter()

	return (
		<div className='flex flex-col md:flex-row lg:space-x-4 space-y-4 md:space-y-1 lg:space-y-0 md:space-x-3 min-w-60 mx-2'>
			<Parallax blur={{ min: -1, max: 3 }} bgImage="/image/sign2.jpg" bgImageAlt="" strength={300} className={'h-48 lg:h-[70vh] w-full'} >
				<div className="flex md:h-[70vh]">
					<div className='lg:w-6/12 h-full w-full flex flex-col justify-center items-center'>
						<div className="p-8" style={{
							backgroundColor: '#37303222'
						}}>
							<div className='text-sm lg:text-xl uppercase font-medium text-white text-center my-5'>
								Have a reference number?
							</div>

							{
								authenticated ? <div>
									<div className='text-sm lg:text-md text-white my-4'>
										Rent a property or See your rented property now
									</div>
									<OjarhButton className="hover:bg-transparent" text="dashboard" onClick={() => router.push('/user/dashboard')} />
								</div>
									:
									<div>
										<div className='text-sm lg:text-xl text-white my-4'>
											Sign up here to pick up your keys or login to message us
										</div>
										<OjarhButton className="hover:bg-transparent" text="signup / login" onClick={() => router.push('/login')} />
									</div>
							}
						</div>
					</div>
					<div className='hidden md:flex lg:w-6/12 h-full w-full flex-col justify-center items-center'>
						<div className="max-w-sm p-8" style={{ backgroundColor: '#37303222' }}>
							<div className="text-white lg:text-lg">
								<span className="text-4xl" style={{
									fontStyle: 'italic',
									fontFamily: 'Space Grotesk'
								}}>"</span>
								<span className="text-lg" style={{
									fontStyle: 'italic'
								}}>
									{`Ojarh Plaza is now open for you to rent and sell to your customers.
						Our location remains the best and surely very accessible. Our
						processes are automated for credibility and satisfaction`}
								</span>
								<span className="text-4xl" style={{
									fontStyle: 'italic',
									fontFamily: 'Space Grotesk'
								}}>"</span>
							</div>
						</div>
					</div>
				</div>
			</Parallax>
			<Parallax blur={10} bgImage="/image/sign.jpg" bgImageAlt="" strength={300} className={'md:hidden w-full'} >
				<div className='lg:w-6/12 h-full w-full flex flex-col justify-center items-center'>
					<div className="max-w-sm p-8" style={{ backgroundColor: '#37303222' }}>
						<div className="text-white lg:text-lg">
							<span className="text-4xl" style={{
								fontStyle: 'italic',
								fontFamily: 'Space Grotesk'
							}}>"</span>
							<span className="text-lg" style={{
								fontStyle: 'italic'
							}}>
								{`Ojarh Plaza is now open for you to rent and sell to your customers.
						Our location remains the best and surely very accessible. Our
						processes are automated for credibility and satisfaction`}
							</span>
							<span className="text-4xl" style={{
								fontStyle: 'italic',
								fontFamily: 'Space Grotesk'
							}}>"</span>
						</div>
					</div>
				</div>
			</Parallax>
		</div>
	);
}

export default HomeSignUp;
