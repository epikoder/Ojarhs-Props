import { MenuIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { togleSideBar } from "../features/ToggleSideBar";
import { resolveImagePath } from "../helpers/helpers";
import { User } from "../Typing.d";

const AdminMenu = ({ user }: { user: User }) => {
	return <>
		<div className="flex items-center justify-end text-white">
			<div className="hidden md:flex justify-around w-[50vw]">
				{/* MENU */}
			</div>
			<div>
				<img
					src={resolveImagePath(user !== undefined ? user.photo : '')}	
					alt='ME'
					className="rounded-full h-14 w-14"
				/>
			</div>
		</div>
	</>
}
function SideBarHeader(props: { user: User } & HTMLAttributes<HTMLDivElement>) {
	const dispatch = useDispatch();

	return (
		<div className={`w-full bg-black p-4 sticky-top ${props.className ?? ''}`}>
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
				<AdminMenu user={props.user} />
			</div>
		</div>
	);
}

export default SideBarHeader;
