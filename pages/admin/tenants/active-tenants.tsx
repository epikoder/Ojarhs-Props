import React, { useState } from "react";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";

function Active() {
	const tenantListArr = [];

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<div className='w-full flex justify-between'>
					<h1 className='lg:text-2xl text-md red'>Active tenants</h1>

					<button
						type='button'
						className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
					>
						Add new
					</button>
				</div>
				{tenantListArr.length !== 0 ? (
					<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll \ pb-12 px-8'>
						<table id='customers'>
							<tr className='he w-full flex justify-between'>
								<th className='inline-block w-[50%] lg:w-[30%]'>Name</th>
								<th className='hidden lg:inline-block w-[35%]'>Email</th>
								<th className='inline-block w-[30%] lg:w-[15%]'>Status</th>
								<th className='hidden lg:inline-block w-[20%]'>Options</th>
								<th className='lg:hidden w-[20%]'></th>
							</tr>

							{/* {tenantListArr.map((tenant, index) => {
								if (tenant.states === "active") {
									return (
										<Tenant Tenant={tenant} key={index} setOpen={setUpdateOpen} />
									);
								}
							})} */}
						</table>
					</div>
				) : (
					<div className='text-center uppercase mt-4 '>No Active Tenant </div>
				)}
			</React.Fragment>
			}
		</AdminDashboardLayout>
	);
}
export default Active;
