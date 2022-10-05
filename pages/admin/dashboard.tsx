import React, { useState } from "react";
import DashCards from "../../components/DashCards";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Dashboard() {
	return <AdminDashboardLayout>
		{
			() => <React.Fragment>
				<h1 className='text-2xl red'>Dashboard</h1>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1 '>

				</div>
			</React.Fragment>
		}
	</AdminDashboardLayout>
}

export default Dashboard;
