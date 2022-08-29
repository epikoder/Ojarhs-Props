import { MenuIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { togleSideBar } from "../features/ToggleSideBar";

function SideBarHeader() {
	const dispatch = useDispatch();

	return (
		<div className='w-full bg-black p-4 fixed top-0 z-20'>
			<div className='flex space-x-7  items-center justify-between '>
			<Image
						src='/image/logo.png'
						width={70}
						height={50}
						layout='fixed'
						alt='ojarh'
					/>
				<MenuIcon
					className='w-6 h-6 text-white mr-4 mt-4'
					onClick={() => dispatch(togleSideBar())}
				/>
			</div>
		</div>
	);
}

export default SideBarHeader;
