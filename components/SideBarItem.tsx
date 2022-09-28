import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import SideBarSubItem from "./SideBarSubItem";
import NavLink from "./NavLink";
import { useAppDispatch } from "../store";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useRouter } from "next/router";

function SideBarItem({ name, link, subItem }: { name: string, link?: string, subItem?: { name: string, link: string }[] }) {
	const dispatch = useAppDispatch()
	const router = useRouter()

	if (subItem !== undefined) {
		const path = router.asPath.split('/')
		let href = ''
		if (path.length > 1) {
			href = path[path.length - 2]
		}
		const subPath = subItem.length > 0 ? subItem[0].link.replace('/', (s: string, arr: number): string => {
			return arr === 0 ? '' : s
		}).split('/') : []
		const [toggle, setToggle] = useState(subItem.length > 0 &&
			subPath.length > 1 &&
			subPath[subPath.length - 2] === href)
		return (
			<div className='text-white transition-all duration-200 ease-in-out transit'>
				<div className='hover:bg-[red] rounded-md p-2  cursor-pointer mr-4' onClick={() => setToggle(!toggle)}>
					<div className="flex justify-between w-full">
						<span>{name}</span>
						<div className="relative w-6">
							<ChevronDownIcon fontSize={'small'} className={`absolute h-6 w-6 ${toggle ? '' : 'hidden'} text-white`} />
							<ChevronRightIcon fontSize={'small'} className={`absolute h-6 w-6 ${!toggle ? '' : 'hidden'} text-white`} />
						</div>
					</div>
				</div>

				<SideBarSubItem subItem={subItem} toggle={toggle} />
			</div>
		);
	} else {
		return (
			<div onClick={() => dispatch(toggleSideBar())}>
				<NavLink
					href={link || '#'}
				>
					<div className='text-white hover:bg-[red] transit rounded-md p-2 cursor-pointer'>
						{name}
					</div>
				</NavLink>
			</div>
		);
	}
}

export default SideBarItem;
