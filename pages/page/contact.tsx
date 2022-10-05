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
									<Place />
							</div>
				</div>
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
            </Parallax>
        </div>
		</Layout>
	);
};
export default Page;
