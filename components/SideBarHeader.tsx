import { MenuIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { togleSideBar } from "../features/ToggleSideBar";

const AdminMenu = () => {
	return <>
		<div className="flex items-center justify-end text-white">
			<div className="hidden md:flex justify-around w-[50vw]">
				{/* MENU */}
			</div>
			<div>
				<Image
					src='/image/logo.png'
					width={50}
					height={50}
					layout='fixed'
					alt='ME'
					className="rounded-full"
				/>
			</div>
		</div>
	</>
}
function SideBarHeader(props: HTMLAttributes<HTMLDivElement>) {
	const dispatch = useDispatch();

	return (
		<div className={`w-full bg-black p-4 sticky-top ${props.className}`}>
			<div className='flex space-x-5 items-center justify-between'>
				<div className="flex items-center">
					<MenuIcon
						className='w-6 h-6 text-white mx-2 md:hidden'
						onClick={() => dispatch(togleSideBar())}
					/>
					<Image
						src='/image/logo.png'
						width={40}
						height={40}
						layout='fixed'
						alt='ojarh'
					/>
				</div>
				<AdminMenu />
			</div>
		</div>
	);
}

export default SideBarHeader;
