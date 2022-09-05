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
				<div onClick={() => router.push("/admin/dashboard")}>
					<SideBarItem name='Dashboard' />
				</div>
				<div>
					<SideBarItem name='Tenants' subItem={[
						{
							link: '/admin/tenants/active-tenants',
							name: 'All Tenants'
						},
						{
							link: '/admin/tenants/all-tenants',
							name: 'Active Tenants'
						},
						{
							link: '/admin/tenants/banned-tenants',
							name: 'Banned Tenants'
						},
					]} />
				</div>
				<div onClick={() => router.push("/admin/message")}>
					<SideBarItem name='Messages' />
				</div>
				<div onClick={() => router.push("/admin/services")}>
					<SideBarItem name='Services' />
				</div>
				<div onClick={() => router.push("/admin/properties")}>
					<SideBarItem name='Properties' />
				</div>
				<div onClick={() => router.push("/admin/records")}>
					<SideBarItem name='Records' />
				</div>
				<div onClick={() => router.push("/admin/d&r")}>
					<SideBarItem name='Dispute & Reports' />
				</div>
				<div onClick={() => router.push("/admin/adverts")}>
					<SideBarItem name='Adverts' />
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
						]}
					/>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
