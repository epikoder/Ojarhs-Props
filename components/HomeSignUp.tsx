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
		<div className='grid grid-cols-1 md:grid-cols-2 lg:space-x-4 space-y-4 md:space-y-1 lg:space-y-0 md:space-x-3 min-w-60 mx-2' style={{
			fontFamily: 'space grotesk'
		}}>
			<Parallax blur={2} bgImage="/image/sign2.jpg" bgImageAlt="" strength={300} className={'xl:h-[40vh] lg:h-[40vh] object-cover'} >
				<div className='h-[40vh] w-full flex flex-col justify-center items-center'>
					<div className="p-2 lg:p-8" style={{
						backgroundColor: '#373032a3'
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
			</Parallax>
			<div style={{
				backgroundImage: `url('/image/slider1.jpeg')`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}>
				<div className='flex h-full w-full flex-col justify-center items-center' style={{ backgroundColor: 'rgba(255, 0, 0, 0.6)' }}>
					<div className="max-w-sm p-8 md:my-0 lg:p-8">
						<div className="text-white lg:text-lg">
							<span className="text-4xl" style={{
								fontStyle: 'italic',
								fontFamily: 'Space Grotesk'
							}}>{'"'}</span>
							<span className="text-lg xl:text-xl 2xl:text-2xl" style={{
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
		</div>
	);
}

export default HomeSignUp;
