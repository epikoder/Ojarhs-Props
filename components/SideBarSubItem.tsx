import Link from "next/link";
import React from "react";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useAppDispatch } from "../store";

function SideBarSubItem({ subItem, toggle }: { subItem: { name: string, link: string }[], toggle: boolean }) {
	const dispatch = useAppDispatch()
	return (
		<div className=' text-white flex-col space-y- transition-all duration-1000 ease-in-out my-2'>
			{subItem.map((item, index) => {
				return (
					<Link key={index} href={item.link}>
						<div

							className={`text-gray-300 cursor-pointer hov hover:ml-2 transition-all duration-700 py-2 text-sm ${toggle ? '' : 'hidden'}`}
							onClick={() => dispatch(toggleSideBar())}
						>
							<span className="font-semibold">-</span>
							<span>{item.name}</span>
						</div>
					</Link>
				);
			})}
		</div>
	)
}

export default SideBarSubItem;
