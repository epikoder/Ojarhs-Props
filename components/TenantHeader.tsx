import React from "react";

function TenantHeader({ name }) {
	return (


		<div className='flex justify-between w-full items-center shadow-gray-200 shadow-md px-2 h-20'>


			<h1 className='text-3xl red'>{name}</h1>

			<div className='flex space-x-2 justify-center '>
				<button
					type='button'
					className='inline-block px-12 py-3 mt-4 w-40 h-10 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
				>
					Add new
				</button>
			</div>
		</div>

	);
}

export default TenantHeader;
