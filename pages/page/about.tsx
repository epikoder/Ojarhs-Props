import Image from "next/image";
import React from "react";
import { Parallax } from "react-parallax";
import Layout from "../../components/Layout";

const Page = () => {
	return (
		<Layout>
			<div className='text-gray-600 font-light w-full'>
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
										ABOUT<span className='text-red-500'>{" US"}</span>
									</div>
									<div>
										{new Date().getFullYear() - 2020} years of experience
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

				<div className='grid grid-cols-1 md:grid-cols-2  justify-center my-4'>
					<div className='relative md:w-[60%] rounded-lg overflow-hidden w-[70%] h-[30vh] xl:h-[40vh] md:h-full mx-auto quality' style={{
                        backgroundImage:"url('/image/sign.jpg')",
                        backgroundRepeat:"no-repeat",
                        objectFit:"cover",
                        backgroundSize:"cover",
                    }}>						
					</div>
					<div className='p-4 max-w-md  lg:text-lg mx-auto'>
						{`Ojarh Plaza is now open for you to rent and sell to your customers.
					Our location remains the best and surely very accessible. Our
					processes are automated for credibility and satisfaction`}
					</div>
				</div>
				<div>
					<div className='flex flex-col justify-center items-center h-[40vh]'>
						<div
							className='p-2 w-full flex justify-center'
							style={{
								backgroundImage: `url('/image/ads2.jpg')`,
							}}
						>
							<div
								className='rounded-sm m-4 max-w-lg'
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.9)",
								}}
							>
								<div className='border border-gray-300 px-6 py-12 md:px-12 md:py-20 lg:px-16 xl:px-16 2xl:p-16 rounded-sm'>
									<div className='flex flex-col'>
										<div className='font-medium text-1xl xl:text-2xl'>
											COMMITMENT
											<span className='text-red-500'>{" TO QUALITY"}</span>
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
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2  justify-center my-4'>
					<div className='relative md:w-full w-[70%] h-[30vh] md:h-full mx-auto quality '>
						<img
							src='/image/quality-removebg-preview.png'
							alt='quality'
							className="w-full max-h-[50vh] h-full object-cover"
						/>
					</div>
					<div className='p-4 max-w-md  lg:text-lg mx-auto'>
						{`We take pride in our work, performing to the highest possible standard team work: over values are not
                achieved on our own. We understand the importance of working with all our partners, whether
                employees, tenants, suppliers, contractor customers we establish good working relationships and values
                the input of all stakeholders in any aspect of our business.
                Reliability: we understand and appreciate the importance of our clients' time. As such we keep our
                promises in terms of our service. Commitments, timings. And objectives and communicate progress at
                every step of the way to keep our clients informed.`}
					</div>
				</div>
				<div>
					<div className='flex flex-col justify-center items-center h-[40vh]'>
						<div
							className='p-4 w-full flex justify-center'
							style={{
								backgroundImage: `url('/image/ads1.jpg')`,
							}}
						>
							<div
								className='rounded-sm m-4 max-w-sm'
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.9)",
								}}
							>
								<div className='border border-gray-300 px-6 py-12 md:px-12 md:py-20 lg:px-16 xl:px-16 2xl:p-16 rounded-sm'>
									<div className='flex flex-col'>
										<div className='font-medium text-1xl xl:text-2xl'>
											OUR<span className='text-red-500'>{" MISSION"}</span>
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
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center my-4'>
					<div className='pl-4 overflow-hidden relative rounded-lg md:w-[80%] w-[70%] h-[30vh] md:h-[45vh] mx-auto quality '>
						<img src='/image/tower.jpg' alt='quality' className="w-full max-h-[50vh] h-full object-cover" />
					</div>
					<div className='p-4 max-w-md  lg:text-lg mx-auto'>
						{`Ojarh global properties are specialist in residential, commercial and block management as well as many
                aspect of residential and commercial property maintenance. We focus on managing, protecting and
                maximizing the potential of property assets. We bring property and infrastructure management into the
                21st century by aligning the interest of the tenant and clients through service and asset protection as
                well as ensuring the maximization of the asset value.`}
					</div>
				</div>
				<div>
					<div className='flex flex-col justify-center items-center h-[40vh]'>
						<div
							className='p-4 w-full flex justify-center'
							style={{
								backgroundImage: `url('/image/ads3.jpg')`,
							}}
						>
							<div
								className='rounded-sm m-4 max-w-sm'
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.9)",
								}}
							>
								<div className='border border-gray-300 px-6 py-12 md:px-12 md:py-20 lg:px-16 xl:px-16 2xl:p-16 rounded-sm'>
									<div className='flex flex-col'>
										<div className='font-medium text-1xl xl:text-2xl'>
											OUR<span className='text-red-500'>{" VISION"}</span>
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
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center my-4'>
					<div className='pl-4 overflow-hidden relative rounded-lg md:w-[80%] w-[70%] h-[30vh] md:h-[38vh] mx-auto quality '>
						<Image src='/image/vision.jpg' alt='quality' layout='fill' />{" "}
					</div>
					<div className='p-4 max-w-md  lg:text-lg mx-auto'>
						{`Our vision is to be premier organization for the delivery of all aspects of property and asset management
                across Nigeria.
                Helping developers, investors, housing associations and local authorities to create aspirational and
                sustainable development and communities, working in partnership with all stakeholders including
                tenants and residents.`}
					</div>
				</div>
				<div>
					<div className='flex flex-col justify-center items-center h-[40vh]'>
						<div
							className='p-4 w-full flex justify-center'
							style={{
								backgroundImage: `url('/image/ads1.jpg')`,
							}}
						>
							<div
								className='rounded-sm m-4 max-w-sm'
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.9)",
								}}
							>
								<div className='border border-gray-300 px-6 py-12 md:px-12 md:py-20 lg:px-16 xl:px-16 2xl:p-16 rounded-sm'>
									<div className='flex flex-col'>
										<div className='font-medium text-1xl xl:text-2xl'>
											WHAT WE<span className='text-red-500'>{" OFFER"}</span>
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
					</div>
				</div>
				<div className='flex flex-col-reverse md:grid md:grid-cols-2 justify-center my-4'>
					<div className='p-4 max-w-md  lg:text-lg text-slate-500 mx-auto'>
						<div className='font-semibold'>AMENITIES AVAILABLE</div>
						<div className='space-y-1'>
							<div>1. Water Supply</div>
							<div>2. Single face meter for every Tenant.</div>
							<div>3. Generator Power Supply</div>
							<div>4. Fire Fighting Equipment (Industrial Type)</div>
							<div>5. CCTV Security Camera powered by Solar 24 hours</div>
							<div>6. Common Billboard powered by Solar 24 hours</div>
							<div>7. 24 hours Professional Private Security service</div>
							<div>8. After Plaza Hours Service</div>
							<div>9. Emergency Visit service</div>
							<div>10. Security lights powered by Solar All Night</div>
						</div>
						<div className='font-semibold my-2'>OUR VALUES</div>
						<div className='space-y-1'>
							<div>
								1. No Favoritism; We do not Bend our rules and Regulations to
								Favour any tenants
							</div>
							<div>
								2. No Inequalities; All tenants will be regarded and be treated
								equally
							</div>
							<div>3. No preferential treatment to any tenants</div>
							<div>
								4. Dispute settlement; We shall be neutral at all times in
								dispute settlement among tenants.
							</div>
						</div>
					</div>
					<div
						className='relative rounded-lg overflow-hidden md:rounded-none w-[80%] mx-auto md:w-full h-[30vh] md:h-full '
						style={{
                            backgroundImage:"url('/image/offer.jpg')",
                            backgroundRepeat:"no-repeat",
                            objectFit:"contain",
                            backgroundSize:"cover",
                        }}
					>						
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default Page;
