import React, { HTMLAttributes, useState } from "react";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "../store";
import { toggleSideBar } from "../features/ToggleSideBar";

function SideBar(props?: HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const dispatch = useAppDispatch()
	const sideBarState = useSelector((store: RootState) => store.toggleSideBar.status);
	return (
		<div className={`${!sideBarState ? 'hidden md:block' : ''} bg-black w-full h-full transition-all duration-700 ease-in-out overflow-y-scroll pb-8 text-sm md:text-md ${props.className ?? ''}`}>
			<div className='px-4'>
				<div onClick={() => { router.push("/admin/dashboard"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Dashboard' />
				</div>
				<div>
					<SideBarItem name='Tenants' subItem={[
						{
							link: '/admin/tenants/all-tenants',
							name: 'All Tenants'
						},
						{
							link: '/admin/tenants/banned-tenants',
							name: 'Banned Tenants'
						},
					]} />
				</div>
				<div onClick={() => { router.push("/admin/services"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Services' />
				</div>
				<div onClick={() => { router.push("/admin/properties"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Properties' />
				</div>
				<div onClick={() => { router.push("/admin/records"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Records' />
				</div>
				<div onClick={() => { router.push("/admin/message"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Messages' />
				</div>
				<div onClick={() => { router.push("/admin/disputes"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Disputes' />
				</div>
				<div onClick={() => { router.push("/admin/report"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Reports' />
				</div>
				<div onClick={() => { router.push("/admin/adverts"); dispatch(toggleSideBar()) }}>
					<SideBarItem name='Adverts' />
				</div>
				<div>
					<SideBarItem
						name='Tenants Application'
						subItem={[
							{
								link: '/admin/applications/all',
								name: 'All Applications'
							},
							{
								link: '/admin/applications/rejected',
								name: 'Rejected'
							},
						]}
					/>
				</div>
				<div onClick={() => {
					router.push("/admin/printing");
					dispatch(toggleSideBar())
				}}>
					<SideBarItem name='Ojarh Printing' />
				</div>
				{/* <div onClick={() => {
					// router.push("/admin/adverts");
					dispatch(toggleSideBar())
				}}>
					<SideBarItem name='Reference Numbers' />
				</div> */}
				<div onClick={() => {
					router.push("/admin/packout");
					dispatch(toggleSideBar())
				}}>
					<SideBarItem name='Packout Request' />
				</div>
				<div onClick={() => {
					// router.push("/admin/packout");
					dispatch(toggleSideBar())
				}}>
					<SideBarItem name='Manage Sub-Admin' />
				</div>
				
				<div>
					<SideBarItem
						name='Ojarh Office'
						subItem={[
							{
								link: '/admin/office/staffs',
								name: 'Staffs'
							},
							{
								link: '/admin/office/expenses',
								name: 'Expenses'
							},
							{
								link: '/admin/office/notice',
								name: 'Notice Board'
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
