import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { SideBarToggleState } from "../../features/ToggleSideBar";

function Message() {
    const sideBarState = useSelector(SideBarToggleState );
	return <AdminDashboardLayout>			
				{
					() => <React.Fragment>
						<div>hello world</div>
					</React.Fragment>
				}
		</AdminDashboardLayout>
	
}

export default Message;
