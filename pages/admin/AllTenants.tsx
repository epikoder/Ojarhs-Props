import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import SideBarHeader from "../../components/SideBarHeader";
import Tenant from "../../components/Tenant";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import NewTenant from "../../components/NewTenant";
import { tenantsList } from "../../features/TenantsSlice";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { GetStaticProps } from "next";


function AllTenants({ data }) {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const sideBarState = useSelector(SideBarToggleState);
	const tenantListArr = useSelector(tenantsList);

	console.log(data + "fethc");

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<div className='w-full flex justify-between'>
					<h1 className='lg:text-3xl text-md red'>All Tenants</h1>

					<button
						type='button'
						className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
						onClick={() => setOpen(true)}
					>
						Add new
					</button>
				</div>
				{open ? <div className="relative w-full"><NewTenant type='new' setOpen={setOpen} /></div> : ""}
				{updateOpen ? <div className="relative w-full"><NewTenant type='update' setOpen={setUpdateOpen} /></div> : ""}

				{tenantListArr.length !== 0 ? (
					<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center scrollbar-hide overflow-scroll  pb-12 px-8'>
						<table id='customers'>
							<tr className='he w-full flex justify-between'>
								<th className='inline-block w-[50%] lg:w-[30%]'>Name</th>
								<th className='hidden lg:inline-block w-[35%]'>Email</th>
								<th className='inline-block w-[30%] lg:w-[15%]'>Status</th>
								<th className='hidden lg:inline-block w-[20%]'>Options</th>
								<th className='lg:hidden w-[20%]'></th>
							</tr>

							{tenantListArr.map((tenant, index) => {
								return (
									<Tenant Tenant={tenant} key={index} setOpen={setUpdateOpen} />
								);
							})}
						</table>
					</div>
				) : (
					<div className='text-center uppercase mt-4 '>No New Tenant </div>
				)}
			</React.Fragment>}
		</AdminDashboardLayout>
	);
}

export default AllTenants;


export const getStaticProps: GetStaticProps = async () => {
	const res = fetch("https://sleepy-everglades-36547.herokuapp.com/api/admin/tenants/all?chunck=10")


	const result = JSON.stringify(res)

	return {
		props: {
			data: result
		}
	}
}