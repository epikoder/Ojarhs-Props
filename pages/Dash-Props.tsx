// import React, { useState } from "react";
// import SideBar from "../components/SideBar";
// import SideBarHeader from "../components/SideBarHeader";
// import Tenant from "../components/Tenant";
// import {
// 	AllProducts,
// 	offices,
// 	services,
// 	shops,
// 	TenantsDetails,
// 	warehouse,
// } from "../Data";
// import { useSelector } from "react-redux";
// import { SideBarToggleState } from "../features/ToggleSideBar";
// import Link from "next/link";
// import NewTenant from "../components/NewTenant";
// import { tenantsList } from "../features/TenantsSlice";
// import Plaza from "../components/Plaza";

// function DashProps() {
// 	const [open, setOpen] = useState(false);
// 	const [updateOpen, setUpdateOpen] = useState(false);
// 	const sideBarState = useSelector(SideBarToggleState);

// 	return (
// 		<div className='w-full'>
// 			<div className=''>
// 				<SideBarHeader />
// 			</div>
// 			<div className='flex fixed top-16 w-full'>
// 				<div className={sideBarState ? "w-[40rem]] " : "w-2/12 hidden"}>
// 					<SideBar />
// 				</div>

// 				<div className='w-full'>
// 					<div className='flex justify-between  w-full items-center shadow-gray-200 shadow-md px-2 mt-2'>
// 						<h1 className='lg:text-3xl text-md red'>Properties</h1>

// 						<button
// 							type='button'
// 							className='inline-block px-6 lg:px-12 py-3 mt-4 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
// 							onClick={() => setOpen(true)}
// 						>
// 							Add new
// 						</button>
// 					</div>
// 					{open ? <NewProps type ="new" setOpen={setOpen} tenant= {Tenants}  /> : ""}
// 						{updateOpen ? <NewProps type="update" setOpen={setUpdateOpen} tenant= {Tenants} /> : ""}
// 					`<div className='flex gap-3 lg:flex-row flex-wrap h-[80vh] justify-center  overflow-scroll pb-12 px-8 space-y-10 overflow-x-hidden'>
// 						<Plaza name='plaza shops' store={shops} prop='all' />
// 						<Plaza name='plaza office' store={offices} prop='all' />
// 						<Plaza name='plaza warehouse' store={warehouse} prop='all' />
// 					</div>`
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
// export default DashProps;
