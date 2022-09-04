import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import Tenant from "../../components/Tenant";
import { TenantsDetails } from "../../Data";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import Link from "next/link";
import NewTenant from "./NewTenant";
import { tenantsList } from "../../features/TenantsSlice";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";

function BannedTenants() {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const sideBarState = useSelector(SideBarToggleState);
	const tenantListArr = useSelector(tenantsList);

	const Tenants = tenantListArr.map((tenant, index) => {
		return tenant;
	});

	return (
		<AdminDashboardLayout>
			{() => (
				<React.Fragment>
					<div className='w-full flex justify-between'>
						<h1 className='lg:text-3xl text-md red'>Banned tenants</h1>
						
					</div>

					{tenantListArr.length !== 0 ? (
						<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll \ pb-12 px-8'>
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
										return (
											<Tenant
												Tenant={tenant}
												key={index}
												setOpen={setUpdateOpen}
											/>
										);
									}
								})}
							</table>
						</div>
					) : (
						<div className='text-center uppercase mt-4 '>No Banned Tenant </div>
					)}
				</React.Fragment>
			)}
		</AdminDashboardLayout>
	);
}
export default BannedTenants;
