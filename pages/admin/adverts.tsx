import React, { useState } from "react";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Adverts() {
	return <AdminDashboardLayout>
		{() => <React.Fragment>
			<div className='flex justify-between items-center shadow-gray-200 shadow-md px-2 py-2 '>
				<h1 className='lg:text-3xl text-md red'>Adverts</h1>
			</div>
		</React.Fragment>}
	</AdminDashboardLayout>
}

export default Adverts;
