import Image from "next/image";
import React from "react";

function Notice() {
	return (
		<div className='lg:h-[30vh]  flex w-full h-full flex-col lg:flex-row gap-4 lg:gap-0 px-4'>
			<div className='lg:w-4/12 bg-black text-white w-full z-50'>
				Notice goes in here
			</div>

			<div className='lg:w-8/12 w-[100%] h-[30vh] relative'>
				<Image
					src='/image/041.webp'
					alt=''
					className='w-full h-full '
					layout="fill"
				/>
			</div>
		</div>
	);
}

export default Notice;
