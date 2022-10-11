import { Edit, Lock, Logout, Menu, OpenInNew } from "@mui/icons-material";
import { Avatar, MenuItem } from "@mui/material";
import { logout } from "features/authSlice";
import { useRouter } from "next/router";
import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "store";
import { toggleSideBar } from "../features/ToggleSideBar";
import { resolveFilePath } from "../helpers/helpers";
import { User } from "../Typing.d";
import { Logo } from "./Logo";
import { KMenu } from "./Menu";
import NotificationBox from "./Notification";

const AdminMenu = ({ user }: { user: User }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	return <>
		<div className="flex items-center justify-end text-white space-x-3">
			<NotificationBox />
			<div
				className="mx-2 cursor-pointer hover:text-red-500 duration-300 ease-in-out transition-all text-sm flex items-center"
				onClick={() => router.push('/')}>
				<span>{'Home'}</span>
				<OpenInNew fontSize="small" />
			</div>

			<KMenu className="rounded-full"
				button={<Avatar src={resolveFilePath(user?.photo)} />}
				menu={[
					(<MenuItem key={'edit'} className="space-x-1"
						onClick={() => router.push('/admin/edit-profile')}>
						<Edit fontSize="small" />
						<span>
							Edit Profile
						</span>
					</MenuItem>),
					(<MenuItem key={'password'} className="space-x-1">
						<Lock fontSize="small" />
						<span>
							Change Password
						</span>
					</MenuItem>),
					(<MenuItem key={'logout'} className="space-x-1" onClick={() => dispatch(logout())}>
						<Logout fontSize="small" />
						<span>
							Logout
						</span>
					</MenuItem>)
				]}
			/>
		</div>
	</>
}
function AdminHeader(props: { user: User } & HTMLAttributes<HTMLDivElement>) {
	const dispatch = useDispatch();

	return (
		<>
			<div className={`w-full px-4 ${props.className ?? ''} bg-main`}>
				<div className='flex space-x-5 items-center justify-between'>
					<div className="flex items-center">
						<Menu
							className='w-6 h-6 text-white mx-2 md:hidden'
							onClick={() => dispatch(toggleSideBar())}
						/>
						<Logo height={100} width={50} />
					</div>
					<AdminMenu user={props.user} />
				</div>
			</div>
		</>
	);
}

export default AdminHeader;
