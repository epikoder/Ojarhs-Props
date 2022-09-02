import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { SideBarToggleState } from "../../features/ToggleSideBar";

function Message() {
    const sideBarState = useSelector(SideBarToggleState );
	return (
		<AdminDashboardLayout>
			 <div className="w-full h-[100vh] overflow-scroll mt-8">
                    Message
                </div>
		</AdminDashboardLayout>
	);
}

export default Message;
