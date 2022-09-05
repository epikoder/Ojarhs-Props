import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { SideBarToggleState } from "../../features/ToggleSideBar";

function DR() {

	const sideBarState = useSelector(SideBarToggleState);
	return <AdminDashboardLayout>
		{() => <>
			<h1 className="lg:text-3xl text-md red">
				Dispute and Reports
			</h1>
		</>}
	</AdminDashboardLayout>
}

export default DR;


