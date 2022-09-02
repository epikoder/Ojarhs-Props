import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import Tenant from "../../components/Tenant";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import NewTenant from "../../components/NewTenant";
import { tenantsList } from "../../features/TenantsSlice";
import { staffList } from "../../features/StaffSlice";
import NewStaff from "../../components/NewStaff";
import Staff from "../../components/Staff";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function Staffs() {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const sideBarState = useSelector(SideBarToggleState);
	const staffArr = useSelector(staffList);

	return (
	<AdminDashboardLayout>
		<div className="flex justify-between" >
		<h1 className='lg:text-3xl text-md red'>All Staffs</h1>

						<button
							type='button'
							className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
							onClick={() => setOpen(true)}
						>
							Add new
						</button>
					</div>
					{open ? <div className="w-full relative"><NewStaff type='new' setOpen={setOpen} /></div> : ""}
					{updateOpen ? <div className="w-full relative"><NewStaff type='update' setOpen={setUpdateOpen} /></div> : ""}

					{staffArr.length !== 0 ? (
						<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
							<table id='customers'>
								<tr className='he w-full flex justi'>
									<th className='inline-block w-[30%] text-left'>Name</th>
									<th className='hidden lg:inline-block w-[30%] text-left '>Email</th>
									<th className='inline-block w-[20%] text-left'>Fee</th>
									<th className='hidden lg:inline-block w-[20%] text-left'>Options</th>
									<th className='lg:hidden'></th>
								</tr>

								{staffArr.map((staff, index) => {
									return (
										<Staff Staff={staff} key={index} setOpen={setUpdateOpen} />
									);
								})}
							</table>
						</div>
					) : (
						<div className='text-center uppercase mt-4 '>No New Staff </div>
					)}
	</AdminDashboardLayout>
	);
}

export default Staffs;
