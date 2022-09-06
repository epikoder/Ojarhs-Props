import Link from "next/link";
import React from "react";
import { money } from "../helpers/helpers";
import { Service, Space } from "../Typing.d";
import Button from "./Button";
import Slider from "./Slider";


function Card({ data }: { data: Space | Service }) {
	if (data.type === "service") {
		const service = data as Service
		return (
			<div className='w-70 relative h-[25vh] border rounded-lg overflow-hidden'>
				<div className='text-xs z-20 absolute top-0 right-0 '>
					<Button text={money(service.amount)} />
				</div>

				{/* sliders */}
				<div className='w-full h-[21vh] relative top-0 cursor-pointer'>
					<img
						src="/image/041.webp"
						className="block w-full h-full absolute"
						alt="Wild Landscape"
					/>
					<div className='bg-black absolute opacity-40 z-10 h-full w-full'></div>
					<div className='flex flex-col justify-center items-center absolute z-20 top-0 h-full text-white w-full space-y-3 text-xs px-4'>
						<div>
							<div className='text-gray-300 text-md'>
								Name: <span className='text-white text-prop'>{service.name}</span>
							</div>
							<div className='text-gray-300 text-md'>
								Description: <span className='text-white text-prop'>{service.description}</span>
							</div>
							<div className='text-gray-300 text-md'>
								Manger: <span className='text-white text-prop'>{service.manager}</span>
							</div>
							<div className='text-gray-300 text-md'>
								Payment Plan: <span className='text-white text-prop'>{service.plan}</span>
							</div>
						</div>
					</div>
				</div>

				{/*pay button  */}
				<div className='absolute bottom-0 z-20 text-center border bg-white w-full hov py-1.5 px-3 cursor-pointer bg-hov rounded transition-all duration-300 ease-in-out'>
					PAY
				</div>
			</div>
		);
	}

	const shop = data as Space
	return (
		<div className='w-70 relative h-[60vh] md:h-[40vh] border rounded-lg overflow-hidden'>
			<div className='flex justify-between text-xs z-20 absolute top-0 w-full'>
				<Button text={shop.status} className={shop.status === 'occupied' ? 'bg-gray-500' : ''} />
				<Button text={money(shop.amount)} />
			</div>

			{/* sliders */}
			<div className='w-full h-[35vh] md:h-[25vh] absolute top-0'>
				<Slider images={shop.galleries.concat(shop.photo)} />
			</div>

			{/* cards description */}
			<Link href={'/property/' + shop.slug}>
				<div className='flex flex-col absolute bottom-8 min-h-[8vh] bg-white text-gray-900 w-full space-y-3 text-xs p-2 cursor-pointer'>
					<div className='text-black text-md'>
						Shop No: <span className='text-red-500 text-prop'>{shop.no}</span>
					</div>
					<div className='text-black text-md'>
						Shop Address: <span className='text-red-500 text-prop'>{shop.address}</span>
					</div>
					<div className='text-black text-md'>
						Shop Size: <span className='text-red-500 text-prop'>{shop.size}</span>
					</div>
					<div className='text-black text-md'>
						Shop Description: <span className='text-red-500 text-prop'>{shop.description}</span>
					</div>
					<div className='text-black text-md'>
						Payment Plan: <span className='text-red-500 text-prop uppercase text-sm'>{shop.plan}</span>
					</div>
				</div>
			</Link>

			{/* pay button */}
			<div className='absolute bottom-0 text-center border w-full hov py-1.5 px-3 cursor-pointer bg-hov rounded transition-all duration-300 ease-in-out'>
				PAY
			</div>
		</div>
	);
}

export default Card;
