import React from "react";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function DR() {
	return <AdminDashboardLayout>
		{() => <>
			<h1 className="lg:text-3xl text-md red">
				Dispute and Reports
			</h1>
		</>}
	</AdminDashboardLayout>
}

export default DR;


