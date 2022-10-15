import React, { HTMLAttributes } from "react";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { Drawer, Toolbar } from "@mui/material";
import { toggleSideBar } from "../features/ToggleSideBar";

const MySideBar = ({ mobile }: { mobile?: boolean }) => <div>
	<SideBarItem mobile={mobile} name='Dashboard' link="/admin/dashboard" />
	<SideBarItem mobile={mobile} name='Tenants' subItem={[
		{
			link: '/admin/tenants/all-tenants',
			name: 'All Tenants'
		},
		{
			link: '/admin/tenants/banned-tenants',
			name: 'Banned Tenants'
		},
	]} />
	<SideBarItem mobile={mobile} name='Services' link="/admin/services" />
	<SideBarItem mobile={mobile} name='Properties' link="/admin/properties" />
	<SideBarItem mobile={mobile} name='Records' link="/admin/records" />
	<SideBarItem mobile={mobile} name='Messages' link="/admin/message" />
	<SideBarItem mobile={mobile} name='Disputes' link="/admin/disputes" />
	<SideBarItem mobile={mobile} name='Reports' link="/admin/report" />
	<SideBarItem mobile={mobile} name='Adverts' link="/admin/adverts" />
	<SideBarItem
		mobile={mobile}
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
	<SideBarItem mobile={mobile} name='Ojarh Printing' link="/admin/printing" />
	<SideBarItem mobile={mobile} name='Packout Request' link="/admin/packout" />
	<SideBarItem mobile={mobile} name='Manage Sub-Admin' link='/admin/subadmin' />
	<SideBarItem
		mobile={mobile}
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

function SideBar(props?: HTMLAttributes<HTMLDivElement>) {
	const dispatch = useAppDispatch()
	const sideBarState = useSelector((store: RootState) => store.toggleSideBar.status);
	return (
		<>
			<div className={`hidden md:block bg-main w-full h-full transition-all duration-700 ease-in-out overflow-y-scroll py-4 px-4 text-sm md:text-md ${props.className ?? ''}`}>
				<MySideBar />
			</div>
			<Drawer
				variant="temporary"
				open={sideBarState}
				onClose={() => dispatch(toggleSideBar())}
				sx={{
					display: { xs: 'block', lg: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, }
				}}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<Toolbar className="bg-main min-h-[80px]" />
				<MySideBar mobile />
			</Drawer>
		</>
	);
}

export default SideBar;
