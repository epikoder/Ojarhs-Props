import { useRouter } from "next/router";
import React from "react";
import { Service, Space } from "../Typing.d";
import OjarhCard from "./Card";

interface Shops {
	store: Space[] | Service[];
	name: string
	prop: string
	perPage?: number
}

function Plaza({ name, store, prop, perPage = 12 }: Shops) {
	const router = useRouter()
	return <>
		{store.length > 0 && <div>
			<h1 className='text-center my-4 uppercase text-2xl lg:text-5xl'>
				<span className='uppercase red text-md'>Ojarh</span>{" "}
				{`${" "}  ${name}`}
			</h1>

			<div className="flex justify-center">
				<div className='sm:grid grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center mx-auto 2xl:max-w-[60vw] xl:max-w-[80vw] max-w-[90vw]'>
					{store.map((shop: any, index: number) => {
						if (index + 1 !== perPage) return <OjarhCard key={index} data={shop} />
					})}
				</div>
			</div>

			{prop ? " " : <div className='flex space-x-2 justify-center '>
				{store.length > perPage && <button
					type='button'
					onClick={() => router.push(`/${store[0].type === 'service' ? 'services' : `properties?type=${store[0].type}`}`)}
					className='inline-block px-12 py-3 mt-4 w-60 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
				>
					See more
				</button>}
			</div>}
		</div>}
	</>;
}

export default Plaza;
