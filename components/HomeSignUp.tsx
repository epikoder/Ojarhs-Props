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
		<div className='flex flex-col md:flex-row lg:space-x-4 space-y-4 md:space-y-1 lg:space-y-0 md:space-x-3 min-w-60 mx-2' style={{
			fontFamily: 'space grotesk'
		}}>
			<Parallax blur={{ min: -1, max: 3 }} bgImage="/image/sign2.jpg" bgImageAlt="" strength={300} className={'xl:h-[40vh] lg:h-[40vh] object-cover w-full'} >
				<div className="md:flex md:h-[40vh]">
					<div className='lg:w-6/12 h-full w-full flex flex-col justify-center items-center'>
						<div className="p-2 lg:p-8" style={{
							backgroundColor: '#37303222'
						}}>
							<div className='text-sm lg:text-xl uppercase font-medium text-white text-center my-5'>
								Have a reference number?
							</div>

							{
								authenticated ? <div>
									<div className='text-sm lg:text-md xl:text-xl 2xl:text-2xl text-white my-4'>
										Rent a property or See your rented property now
									</div>
									<OjarhButton className="hover:bg-transparent" text="dashboard" onClick={() => router.push('/user/dashboard')} />
								</div>
									:
									<div>
										<div className='text-sm lg:text-md xl:text-xl 2xl:text-2xl text-white my-4'>
											Sign up here to pick up your keys or login to message us
										</div>
										<OjarhButton className="hover:bg-transparent" text="signup / login" onClick={() => router.push('/login')} />
									</div>
							}
						</div>
					</div>
					<div className='flex lg:w-6/12 h-full w-full flex-col justify-center items-center'>
						<div className="max-w-sm p-2 my-2 md:my-0 lg:p-8" style={{ backgroundColor: '#37303222' }}>
							<div className="text-white lg:text-lg">
								<span className="text-4xl" style={{
									fontStyle: 'italic',
									fontFamily: 'Space Grotesk'
								}}>{'"'}</span>
								<span className="lg:text-md xl:text-xl 2xl:text-2xl" style={{
									fontStyle: 'italic'
								}}>
									{`Ojarh Plaza is now open for you to rent and sell to your customers.
						Our location remains the best and surely very accessible. Our
						processes are automated for credibility and satisfaction`}
								</span>
								<span className="text-4xl" style={{
									fontStyle: 'italic',
									fontFamily: 'Space Grotesk'
								}}>{'"'}</span>
							</div>
						</div>
					</div>
				</div>
			</Parallax>
		</div>
	);
}

export default HomeSignUp;
