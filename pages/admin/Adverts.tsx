import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import NewService from "../../components/NewService";
import { ServiceList } from "../../features/ServiceSlice";
import Service from "../../components/Services";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Adverts() {
	const sideBarState = useSelector(SideBarToggleState);
	const serviceArr = useSelector(ServiceList);
	const [open, setOpen] = useState<Boolean>(false);
	const [updateOpen, setUpdateOpen] = useState<Boolean>(false);

	return (
		<AdminDashboardLayout>
			{() => (
				<React.Fragment>
					<div className='flex justify-between items-center shadow-gray-200 shadow-md px-2 py-2 '>
						<h1 className='lg:text-3xl text-md red'>Adverts</h1>
					</div>
					{serviceArr.length !== 0 ? (
						<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
							<table id='customers'>
								<tr className='he w-full flex justi'>
									<th className='inline-block w-[30%] text-left'>Title</th>
									<th className='hidden lg:inline-block w-[30%] text-left '>
										Duration
									</th>
									<th className='inline-block w-[20%] text-left'>Fee</th>
									<th className='hidden lg:inline-block w-[20%] text-left'>
										Options
									</th>
									<th className='lg:hidden'></th>
								</tr>

								{serviceArr.map((service, index) => {
									return (
										<Service
											Service={service}
											key={index}
											setOpen={setUpdateOpen}
										/>
									);
								})}
							</table>
						</div>
					) : (
						<div className='text-center uppercase mt-4 '>No New Service </div>
					)}
				</React.Fragment>
			)}
		</AdminDashboardLayout>
	);
}

export default Adverts;
