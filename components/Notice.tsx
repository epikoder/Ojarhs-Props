import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { RootState } from "../store";
import MiddleAdvert from "./Adverts";
import { NoticeBoard } from "./NoticeBoard";
import Slider from "./Slider";

function Notice() {
	const { data, state } = useSelector((store: RootState) => store.indexSlice.notice)
	return (
		<div className="md:grid grid-cols-8 w-[100%] overflow-hidden space-y-2">
			<div className='col-span-3 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] sm:h-[60vh] h-[40vh]'>
				<NoticeBoard />
			</div>
			<div className="bg-black text-center px-2 col-span-5 text-white 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] h-[35vh]">
				<MiddleAdvert />
			</div>
		</div>
	);
}

export default Notice;
