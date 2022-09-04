import React from "react";
import { useSelector } from "react-redux";
import DashCards from "../../components/DashCards";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import RecordCharts from "../../components/RecordCharts";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Records() {
	return (
		<AdminDashboardLayout>
			{() => (
				<React.Fragment>
					<div className='grid md:grid-cols-2 grid-cols-1 gap-5 justify-center '>
						{/* the numbers you are seeing as a class is for the linear gradient    */}
						<div className=' one rounded-2xl w-full  '>
							<DashCards name='total properties' lengths='70' />
						</div>
						<div className=' six rounded-2xl w-full  '>
							<DashCards name='total Tenants' lengths='20' />
						</div>{" "}
						<div className=' three rounded-2xl w-full  '>
							<DashCards name='total Staffs' lengths='5' />
						</div>{" "}
						<div className=' four rounded-2xl w-full  justify-self-start'>
							<DashCards name='total adverts' lengths='5' />
						</div>{" "}
					</div>
					<div className='grid gap-12 grid-cols-1 md:grid-cols-2 pb-8'>
						<RecordCharts
							active='Active Tenant'
							activeVal='100'
							free='Free Tenants'
							freeVal='30'
						/>
						<RecordCharts
							active='Taken Property'
							activeVal='70'
							free='Vacant Property'
							freeVal='30'
						/>
					</div>
				</React.Fragment>
			)}
		</AdminDashboardLayout>
	);
}

export default Records;
