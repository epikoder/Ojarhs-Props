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
		<div className='h-[50vh] md:h-[40vh] flex w-full flex-col md:flex-row gap-4 px-4 justify-around'>
			<div className='md:w-4/12 bg-black text-white w-full sm:h-48 md:h-full z-50 rounded-md lg:rounded-r-none h-full'>
				<NoticeBoard />
			</div>

			<div className='md:w-8/12 w-[100%] h-full relative'>
				<MiddleAdvert />
			</div>
		</div>
	);
}

export default Notice;
