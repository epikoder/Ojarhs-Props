import React, { useState } from "react";
import { useSelector } from "react-redux";
import Property from "../../components/Property";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { RootState } from "../../store";
import { useRouter } from "next/router";

function DashProps() {
	const properties = useSelector((store: RootState) => store.propertySlice)
	const router = useRouter()

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<div className='flex justify-between w-full items-center shadow-gray-200 shadow-md px-2'>
					<h1 className='lg:text-2xl text-lg red'>Properties</h1>
					<button
						type='button'
						className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
						onClick={() => { router.push('properties/new-property') }}
					>
						Add new
					</button>
				</div>
				{properties.data.length !== 0 ? (
					<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
						<table id='customers'>
							<tr className='he w-full flex justify-between'>
								<th className='inline-block w-[50%] lg:w-[30%]'>Name</th>
								<th className='hidden lg:inline-block w-[35%]'>Price</th>
								<th className='inline-block w-[30%] lg:w-[15%]'>Type</th>
								<th className='hidden lg:inline-block w-[20%]'>Options</th>
								<th className='lg:hidden w-[20%]'></th>
							</tr>

							{properties.data.map((prop, index) => {
								console.log(prop);

								return (
									<Property
										key={index}
										Prop={prop}
										setOpen={() => router.push('properties/update-property')}
									/>
								);
							})}
						</table>
					</div>
				) : (
					<div className='text-center uppercase mt-4 '>No New Property </div>
				)}
			</React.Fragment>}
		</AdminDashboardLayout>
	);
}
export default DashProps;
