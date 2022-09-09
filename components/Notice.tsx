import Image from "next/image";
import React from "react";
import Slider from "./Slider";

function Notice() {
	return (
		<div className='h-[50vh] md:h-[40vh] flex w-full flex-col md:flex-row gap-4 px-4 justify-around'>
			<div className='md:w-4/12 bg-black text-white w-full sm:h-48 md:h-full z-50 rounded-md lg:rounded-r-none h-full'>
				Notice goes in here
			</div>

			<div className='md:w-8/12 w-[100%] h-full relative'>
				<Image
					src='/image/ads1.jpg'
					alt=''
					className='w-full h-full rounded-md lg:rounded-l-none'
					layout="fill"
				/>
			</div>
		</div>
	);
}

export default Notice;
