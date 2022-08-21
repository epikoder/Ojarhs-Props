import React from "react";
import { Space } from "../Typing.d";
import Button from "./Button";
import Slider from "./Slider";

interface Shops {
	shop: Space;

}





function Card({ shop }: Shops) {
	if (shop.type === "service") {
		return (
			<div className='w-60 relative min-h-[40vh] border rounded-lg overflow-hidden'>
				<div className='text-xs z-20 absolute top-0 right-0 '>
					<Button text={shop.amount.toLocaleString("en-US")} />
				</div>

				{/* sliders */}
				<div className='w-full h-[34vh] absolute top-0'>
					<Slider />
				</div>

				{/*pay button  */}
				<div className='absolute bottom-0 text-center border w-full hov py-1.5 px-3 cursor-pointer bg-hov rounded transition-all duration-300 ease-in-out'>
					PAY
				</div>
			</div>
		);
	}

	return (
		<div className='w-60 relative h-[60vh] border rounded-lg overflow-hidden'>
			<div className='flex justify-between text-xs z-20 absolute top-0 w-full'>
				<Button text={shop.type} />
				<Button text={shop.amount.toLocaleString("en-US")} />
			</div>

			{/* sliders */}
			<div className='w-full h-[30vh] absolute top-0'>
				<Slider />
			</div>

			{/* cards description */}
			<div className='flex flex-col absolute bottom-8 min-h-[40%] bg-white text-gray-900 w-full space-y-3 text-xs p-2'>
				<div className='text-black text-md'>
					Shop No: <span className='text-gray-700'>{shop.no}</span>
				</div>
				<div className='text-black text-md'>
					Shop Address:<span className='text-gray-700'>{shop.address}</span>
				</div>
				<div className='text-black text-md'>
					Shop Size: <span className='text-gray-700'>{shop.size} </span>
				</div>
				<div className='text-black text-md'>
					Shop Description:{" "}
					<span className='text-gray-700'>{shop.description} </span>
				</div>
			</div>

			{/* pay button */}
			{shop.type !== "shop" ? (
				<div className='absolute bottom-0 text-center border w-full hov py-1.5 px-3 cursor-pointer bg-hov rounded transition-all duration-300 ease-in-out'>
					PAY
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default Card;
