import { ExternalLinkIcon, LinkIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../features/ToggleSideBar";
import { resolveFilePath } from "../helpers/helpers";
import { User } from "../Typing.d";

const AdminMenu = ({ user }: { user: User }) => {
	const router = useRouter()
	return <>
		<div className="flex items-center justify-end text-white">
			<div className="hidden md:flex justify-around w-[50vw]">
				{/* MENU */}
			</div>
			<div
				className="mx-2 cursor-pointer hover:text-red-500 duration-300 ease-in-out transition-all text-sm flex items-center"
				onClick={() => router.push('/')}>
				<span>{'Home'}</span>
				<ExternalLinkIcon height={10} />
			</div>
			<div>
				<img
					src={resolveFilePath(user !== undefined ? user.photo : '')}
					alt='ME'
					className="rounded-full h-14 w-14"
				/>
			</div>
		</div>
	</>
}
function AdminHeader(props: { user: User } & HTMLAttributes<HTMLDivElement>) {
	const dispatch = useDispatch();

	return (
		<>
			<div className={`w-full p-4 ${props.className ?? ''} bg-main`}>
				<div className='flex space-x-5 items-center justify-between'>
					<div className="flex items-center">
						<MenuIcon
							className='w-6 h-6 text-white mx-2 md:hidden'
							onClick={() => dispatch(toggleSideBar())}
						/>
						<Image
							src='/image/logo.png'
							width={80}
							height={40}
							layout='fixed'
							alt='ojarh'
							style={{
								flexGrow: 1
							}}
						/>
					</div>
					<AdminMenu user={props.user} />
				</div>
			</div>
			{/* <Toolbar className="mt-4" /> */}
		</>
	);
}

export default AdminHeader;
