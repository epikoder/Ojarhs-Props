import React, { HTMLAttributes, useState } from "react";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../features/ToggleSideBar";
import { useRouter } from "next/router";

function SideBar(props?: HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const sideBarState = useSelector(SideBarToggleState);
	return (
		<div className={`${!sideBarState ? 'hidden md:block' : ''} bg-black w-full h-full transition-all duration-700 ease-in-out ${props.className ?? ''}`}>
			<div className='px-4'>
				<div onClick={() => router.push("/admin/Dashboard")}>
					<SideBarItem name='Dashboard' />
				</div>
				<div>
					<SideBarItem name='Tenants' subItem={[
						{
							link: '/admin/tenants/ActiveTenants',
							name: 'All Tenants'
						},
						{
							link: '/admin/tenants/AllTenants',
							name: 'Active Tenants'
						},
						{
							link: '/admin/tenants/BannedTenants',
							name: 'Banned Tenants'
						},
					]} />
				</div>
				<div onClick={() => router.push("/admin/Message")}>
					<SideBarItem name='Messages' />
				</div>
				<div onClick={() => router.push("/admin/Services")}>
					<SideBarItem name='Services' />
				</div>
				<div onClick={() => router.push("/admin/Properties")}>
					<SideBarItem name='Properties' />
				</div>
				<div onClick={() => router.push("/admin/Records")}>
					<SideBarItem name='Records' />
				</div>
				<div onClick={() => router.push("/admin/D&R")}>
					<SideBarItem name='Dispute & Reports' />
				</div>
				<div onClick={() => router.push("/admin/Adverts")}>
					<SideBarItem name='Adverts' />
				</div>
				<div>
					<SideBarItem
						name='Ojarh Office'
						subItem={[
							{
								link: '/admin/office/Staffs',
								name: 'Staffs'
							},
							{
								link: '/admin/office/Expenses',
								name: 'Expenses'
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
