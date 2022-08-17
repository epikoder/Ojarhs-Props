import React, { useState } from "react";
import SideBar from "../components/SideBar";
import SideBarHeader from "../components/SideBarHeader";
import Tenant from "../components/Tenant";
import { TenantsDetails } from "../Data";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../features/ToggleSideBar";
import Link from "next/link";
import NewTenant from "../components/NewTenant";
import { tenantsList } from "../features/TenantsSlice";

function BannedTenants() {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);	
	const sideBarState = useSelector(SideBarToggleState);
	const tenantListArr = useSelector(tenantsList)
	
	const Tenants = tenantListArr.map((tenant, index)=> {
		return tenant
		
	})
	
	return (
		<div className='w-full'>
			<div className=''>
				<SideBarHeader />
			</div>
			<div className='flex fixed top-16 w-full'>
				<div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
					<SideBar />
				</div>

				<div className='w-full'>
					<div className='flex justify-between  w-full items-center shadow-gray-200 shadow-md px-2 mt-2'>
						<h1 className='lg:text-3xl text-md red'>Banned tenants</h1>

						<button
							type='button'
							className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
							onClick={() => setOpen(true)}
						>
							Add new
						</button>
					</div>
						{open ? <NewTenant type ="new" setOpen={setOpen} tenant= {Tenants}  /> : ""}
						{updateOpen ? <NewTenant type="update" setOpen={setUpdateOpen} tenant= {Tenants} /> : ""}

					{tenantListArr.length !== 0 ? <div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll \ pb-12 px-8'>
						<table id='customers'>
							<tr className='he w-full flex justify-between'>
								<th className='inline-block w-[50%] lg:w-[30%]'>Name</th>
								<th className='hidden lg:inline-block w-[35%]'>Email</th>
								<th className='inline-block w-[30%] lg:w-[15%]'>Status</th>
								<th className='hidden lg:inline-block w-[20%]'>Options</th>
								<th className='lg:hidden w-[20%]'></th>
							</tr>

							{tenantListArr.map((tenant, index) => {								
								if (tenant.states === "banned") {
									return <Tenant Tenant={tenant} key={index}  setOpen = {setUpdateOpen} />;
								}
							})}
						</table>
					</div> : <div className="text-center uppercase mt-4 ">No Banned Tenant </div>}
				</div>
			</div>
		</div>
	);
}
export default BannedTenants;
