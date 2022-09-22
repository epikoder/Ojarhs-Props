import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { RootState } from "../store";
import MiddleAdvert from "./Adverts";
import Slider from "./Slider";

function Notice() {
	const { data, state } = useSelector((store: RootState) => store.indexSlice.notice)
	return (
		<div className='h-[50vh] md:h-[40vh] flex w-full flex-col md:flex-row gap-4 px-4 justify-around'>
			<div className='md:w-4/12 bg-black text-white w-full sm:h-48 md:h-full z-50 rounded-md lg:rounded-r-none h-full'>
				<div className='w-full p-2 h-full bg-white text-gray-500'>
					<div className="font-semibold bg-black text-white rounded-sm p-1 text-center">
						OJARH NOTICE
					</div>
					{data.length > 0 && <div className="py-2">
						<Carousel
							showThumbs={false}
							showArrows={true}
							showStatus={false}
							autoPlay
							emulateTouch
							transitionTime={1000}
							interval={5000}
							showIndicators
							infiniteLoop
							stopOnHover
						>
							{data.map((n, i) =>
								<div key={i} className="w-full text-left whitespace-pre-line">
									<div className="text-center">
										{n.title}
									</div>
									<div className="p-2">
										{n.content}
									</div>
								</div>
							)
							}
						</Carousel >
					</div>}
					{data.length === 0 && <div className="h-full w-full flex justify-center items-center">
						NOTICE BOARD
					</div>}
				</div>
			</div>

			<div className='md:w-8/12 w-[100%] h-full relative'>
				<MiddleAdvert />
			</div>
		</div>
	);
}

export default Notice;
