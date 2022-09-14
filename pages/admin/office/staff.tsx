import React, { useState } from "react";
import { AdminDashboardLayout } from "../../../components/admin/AdminDashboardLayout";

function Staffs() {
	return <AdminDashboardLayout>
		{() => (
			<React.Fragment>
				<div className='flex justify-between'>
					<h1 className='lg:text-2xl text-md red'>All Staffs</h1>

					<button
						type='button'
						className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'

					>
						Add new
					</button>
				</div>
				<div className='text-center uppercase mt-4 '>No New Staff </div>
			</React.Fragment>
		)}
	</AdminDashboardLayout>
}

export default Staffs;
