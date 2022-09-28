import React, { HTMLAttributes } from "react";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";

function SideBar(props?: HTMLAttributes<HTMLDivElement>) {
	const sideBarState = useSelector((store: RootState) => store.toggleSideBar.status);
	return (
		<div className={`${!sideBarState ? 'hidden md:block' : ''} bg-black w-full h-full transition-all duration-700 ease-in-out overflow-y-scroll pb-20 text-sm md:text-md ${props.className ?? ''}`}>
			<div className='px-4'>
				<SideBarItem name='Dashboard' link="/admin/dashboard" />
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
				<SideBarItem name='Services' link="/admin/services" />
				<SideBarItem name='Properties' link="/admin/properties" />
				<SideBarItem name='Records' link="/admin/records" />
				<SideBarItem name='Messages' link="/admin/message" />
				<SideBarItem name='Disputes' link="/admin/disputes" />
				<SideBarItem name='Reports' link="/admin/report" />
				<SideBarItem name='Adverts' link="/admin/adverts" />
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
				<SideBarItem name='Ojarh Printing' link="/admin/printing" />
				<SideBarItem name='Packout Request' link="/admin/packout" />
				<SideBarItem name='Manage Sub-Admin' />
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
	);
}

export default SideBar;
