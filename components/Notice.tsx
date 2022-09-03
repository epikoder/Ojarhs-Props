import Image from "next/image";
import React from "react";

function Notice() {
	return (
		<div className='h-[50vh] lg:h-[30vh] flex w-full flex-col lg:flex-row gap-4 lg:gap-0 px-4'>
			<div className='lg:w-4/12 bg-black text-white w-full h-full z-50 rounded-md lg:rounded-r-none'>
				Notice goes in here
			</div>

			<div className='lg:w-8/12 w-[100%] h-full relative'>
				<Image
					src='/image/041.webp'
					alt=''
					className='w-full h-full rounded-md lg:rounded-l-none'
					layout="fill"
				/>
			</div>
		</div>
	);
}

export default Notice;
