import Link from "next/link";
import React from "react";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useAppDispatch } from "../store";

function SideBarSubItem({ subItem, toggle }: { subItem: { name: string, link: string }[], toggle: boolean }) {
	const dispatch = useAppDispatch()
	return (
		<div className=' text-white flex-col space-y- transition-all duration-1000 ease-in-out'>
			{subItem.map((item, index) => {
				return (
					<div
						key={index}
						className={`text-gray-300 cursor-pointer hov hover:ml-2 transition-all duration-700 py-2 text-sm ${toggle ? '' : 'hidden'}`}
						onClick={() => dispatch(toggleSideBar())}
					>
						<span className="font-semibold">-</span> <Link href={item.link}>{item.name}</Link>
					</div>
				);
			})}
		</div>
	)
}

export default SideBarSubItem;
