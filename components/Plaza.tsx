import React from "react";
import { Service, Space } from "../Typing.d";
import Card from "./Card";

interface Shops {
	store: Space[] | Service[];
	name: string
	prop: string
}

const perPage = 12
function Plaza({ name, store, prop }: Shops) {
	return (
		<div>
			<h1 className='text-black text-center my-4 uppercase text-md lg:text-3xl'>
				{" "}
				<span className='uppercase red lg:text-3xl text-md'>Ojarh</span>{" "}
				{`${" "}  ${name}`}
			</h1>

			<div className='flex flex-row flex-wrap gap-8 items-center justify-center w-[90vw] mx-auto'>
				{store.map((shop, index) => {
					if (index + 1 === perPage) return <Card key={index} data={shop} />
				})}
			</div>

			{prop ? " " : <div className='flex space-x-2 justify-center '>
				{store.length > perPage && <button
					type='button'
					className='inline-block px-12 py-3 mt-4 w-60 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
				>
					See more
				</button>}
			</div>}
		</div>
	);
}

export default Plaza;
