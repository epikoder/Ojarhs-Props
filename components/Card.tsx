import Link from "next/link";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { money, resolveFilePath } from "../helpers/helpers";
import { Service, Space } from "../Typing.d";
import Button from "./Button";
import PaymentIcon from '@mui/icons-material/Payment';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PlaceIcon from '@mui/icons-material/Place';
import { UserIcon } from "@heroicons/react/outline";
import { Button as MuiButton } from "@mui/material"
import { PayButton } from "./PayButton";


function Card({ data, className }: { data: Space | Service, className?: string }) {
	if (data.type === "service") {
		const service = data as Service
		return (
			<div className={`max-w-6xl ${className || 'w-[90vw] md:w-70 lg:w-70'} border rounded-lg`}>
				<div className="relative">
					<div className='text-xs z-20 absolute top-0 right-0 '>
						<Button text={money(service.amount)} />
					</div>
				</div>

				{/* sliders */}
				<div className='w-full h-48 top-0 cursor-pointer'>
					<img src={"image/ads1.jpg"} className='w-full h-full' />
				</div>
				<div className="bg-white">
					<div className="text-xs text-white text-center bg-red-500">
						<PaymentIcon />
						<span className="uppercase mx-1">
							{service.plan}
						</span>
					</div>
					<div className='text-gray-900 w-full space-y-3 text-xs p-2 cursor-pointer px-8'>
						<div className="text-lg" style={{
							fontFamily: 'Space Grotesk'
						}}>
							{service.name}
						</div>
						<div className="text-gray-500 flex items-center">
							<UserIcon className="w-5" />
							<span className="px-2 text-md">{service.manager}</span>
						</div>
						<div className="ellipse three-lines">
							{service.description}
						</div>
					</div>
					<PayButton slug={service.slug} />
				</div>
			</div >
		);
	}

	const space = data as Space
	return (
		<div className={`my-2 ${className || 'w-[90vw] sm:w-[60vw] md:w-70'} border overflow-hidden bg-white max-w-lg`}>
			<div className="relative">
				<div className='flex justify-between text-xs z-10 absolute top-0 w-full'>
					<Button text={space.status === 'open' ? 'For Rent' : 'Not Available'} className={space.status === 'occupied' ? 'bg-gray-500 text-white' : ''} />
					<Button text={money(space.amount)} />
				</div>
			</div>

			{/* cards description */}
			<div>
				<div className="h-56 relative">
					{/* <div className="absolute z-10 cursor-pointer hover:transform-cpu bg-slate-400">

					</div> */}
					<div className="h-full">
						<Carousel
							className={'h-full'}
							autoPlay={true}
							showIndicators={true}
							showStatus={false}
							showThumbs={false}
							infiniteLoop={true}
							transitionTime={1000}
							emulateTouch={true}
						>
							{space.galleries.concat(space.photo).map((s, i) =>
								<div key={i} className="h-full w-full hover:scale-125 duration-300 transition-all ease-in-out">
									<img src={resolveFilePath(s)} className={'h-full w-full object-cover'} />
								</div>
							)}
						</Carousel>
					</div>
				</div>
				<div className="grid grid-cols-3 text-center items-center bg-red-600">
					<div className="text-xs text-white">
						<FullscreenIcon />
						<span className="uppercase mx-1">
							{space.size}
						</span>
					</div>
					<div className="text-xs uppercase text-white">
						{space.type}
					</div>
					<div className="text-xs text-white">
						<PaymentIcon />
						<span className="uppercase mx-1">
							{space.plan}
						</span>
					</div>
				</div>
				<Link href={'/property/' + space.slug}>
					<div className='bg-white text-gray-900 w-full text-left space-y-3 text-xs p-2 cursor-pointer px-8'>
						<div className="text-lg" style={{
							fontFamily: 'Space Grotesk'
						}}>
							{space.name}
						</div>
						<div className="text-gray-500">
							<PlaceIcon fontSize="small" />
							{space.address}
						</div>
						<div className="ellipse three-lines">
							{space.description}
						</div>
					</div>
				</Link>
			</div>
			<PayButton slug={space.slug} />
		</div>
	);
}

export default Card;
