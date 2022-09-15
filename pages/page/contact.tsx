import { Mail, Phone, Place } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React from "react";
import { Parallax } from "react-parallax";
import Layout from "../../components/Layout";
import { OjarhAddress, OjarhEmail, OjarhPhone } from "../../constants";

const Page = () => {
	return (
		<Layout>
			<div className='text-gray-600 font-light w-full bg-white'>
				<Parallax bgImage='/image/ads1.jpg' className='w-full' strength={500}>
					<div className='flex flex-col justify-center items-center my-10 lg:my-40'>
						<div
							className='p-2 rounded-sm'
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.9)",
							}}
						>
							<div className='border border-gray-300 p-8 lg:p-12 xl:p-16 2xl:p-24 rounded-sm'>
								<div className='flex flex-col justify-center items-center'>
									<div className='font-medium text-3xl'>
										CONTACT<span className='text-red-500'>{" US"}</span>
									</div>
									<hr
										className='w-4/5 my-px bg-red-500'
										style={{ height: "2px" }}
									/>
									<hr
										className='w-3/5 my-px bg-red-500'
										style={{ height: "1.8px" }}
									/>
									<hr
										className='w-2/5 my-px bg-red-500'
										style={{ height: "1.5px" }}
									/>
								</div>
							</div>
						</div>
					</div>
				</Parallax>
				<div className='flex justify-center my-4 lg:mt-12'>
					<div className='lg:min-w-[60vw] md:grid grid-cols-2 gap-10'>
						<div>
							<form>
								<div>
									<div className='font-medium text-lg lg:text-2xl text-black'>
										SEND US A<span className='text-red-500'>{" MESSAGE"}</span>
									</div>
									<div className='max-w-sm'>
										<hr
											className='w-3/12 my-px bg-red-500'
											style={{ height: "2px" }}
										/>
										<hr
											className='w-2/12 my-px bg-red-500'
											style={{ height: "1.8px" }}
										/>
										<hr
											className='w-1/12 my-px bg-red-500'
											style={{ height: "1.5px" }}
										/>
									</div>
								</div>
								<div className='my-6 lg:my-12 space-y-2'>
									<div>
										<TextField label='Name' size='small' className='w-full' />
									</div>
									<div>
										<TextField label='Phone' size='small' className='w-full' />
									</div>
									<div>
										<TextField label='Email' size='small' className='w-full' />
									</div>
									<div>
										<TextField
											label='Subject'
											size='small'
											className='w-full'
										/>
									</div>
									<div>
										<textarea
											className='border border-1 w-full'
											placeholder='Message'
										/>
									</div>
									<div className='flex justify-end'>
										<Button variant='outlined' size='small'>
											SEND
										</Button>
									</div>
								</div>
							</form>
						</div>

						<div>
							<div>
								<div className='font-medium text-lg lg:text-2xl text-black'>
									GET IN<span className='text-red-500'>{" TOUCH"}</span>
								</div>
								<div className='max-w-sm'>
									<hr
										className='w-3/12 my-px bg-red-500'
										style={{ height: "2px" }}
									/>
									<hr
										className='w-2/12 my-px bg-red-500'
										style={{ height: "1.8px" }}
									/>
									<hr
										className='w-1/12 my-px bg-red-500'
										style={{ height: "1.5px" }}
									/>
								</div>
							</div>
							<div className='my-6 lg:my-12 space-y-2'>
								<div className='flex space-x-2'>
									<Phone />
									<div>{OjarhPhone}</div>
								</div>
								<div className='flex space-x-2'>
									<Mail />
									<div>{OjarhEmail}</div>
								</div>
								<div className='flex space-x-2'>
									<Place />
									<div>{OjarhAddress}</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:max-w-[60vw] mb-4 mx-auto w-[90%] md:w-[80%] rounded-lg overflow-hidden">
					<div className='mapouter w-full h-full'>
						<div className='gmap_canvas w-full h-full'>
							<iframe
								className="w-full h-[40vh] md:h-[60vh]"
								height='500'
								id='gmap_canvas'
								src='https://maps.google.com/maps?q=ikeja,%20lagos&t=&z=13&ie=UTF8&iwloc=&output=embed'
								frameBorder='0'
								scrolling='no'													
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default Page;
