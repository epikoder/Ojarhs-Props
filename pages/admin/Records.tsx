import React from "react";
import { useSelector } from "react-redux";
import DashCards from "../../components/DashCards";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import RecordCharts from "../../components/RecordCharts";

function Records() {
	const sideBarState = useSelector(SideBarToggleState);
	return (
		<div className='w-full'>
			<div className=''>
				<SideBarHeader />
			</div>
			<div className='flex fixed top-16 w-full'>
				<div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
					<SideBar />
				</div>

				<div className='w-full h-[100vh] overflow-scroll mt-8 pb-24 p-4'>
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
					<div className='grid gap-12 grid-cols-1 md:grid-cols-2'>					
						<RecordCharts active="Active Tenant" activeVal="100" free="Free Tenants" freeVal="30" />
						<RecordCharts active="Taken Property" activeVal="70" free="Vacant Property" freeVal="30" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Records;
