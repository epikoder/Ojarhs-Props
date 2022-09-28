import React from "react";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useAppDispatch } from "../store";
import NavLink from "./NavLink";

function SideBarSubItem({ subItem, toggle }: { subItem: { name: string, link: string }[], toggle: boolean }) {
	const dispatch = useAppDispatch()
	return (
		<div>
			{subItem.map((item, index) => {
				return (
					<NavLink key={index} href={item.link}>
						<div

							className={`text-gray-300 cursor-pointer hover:bg-[red] rounded-md ml-4 hover:ml-6 transition-all duration-700 p-2 text-sm ${toggle ? '' : 'hidden'}`}
							onClick={() => dispatch(toggleSideBar())}
						>
							<span className="font-semibold">{'- '}</span>
							<span>{item.name}</span>
						</div>
					</NavLink>
				);
			})}
		</div>
	)
}

export default SideBarSubItem;
