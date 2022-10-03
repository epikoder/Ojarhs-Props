import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import SideBarSubItem from "./SideBarSubItem";
import NavLink from "./NavLink";
import { useAppDispatch } from "../store";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

function SideBarItem({ name, link, subItem }: { name: string, link?: string, subItem?: { name: string, link: string }[] }) {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const path = router.asPath.split('/')
	let href = ''
	if (path.length > 1) {
		href = path[path.length - 2]
	}
	const subPath = subItem !== undefined && subItem.length > 0 ? subItem[0].link.replace('/', (s: string, arr: number): string => {
		return arr === 0 ? '' : s
	}).split('/') : []
	const [toggle, setToggle] = useState<boolean>(subPath.length > 1 && subPath[subPath.length - 2] === href)

	if (subItem !== undefined) {
		return (
			<>
				<Button onClick={() => setToggle(!toggle)}
					fullWidth
				>
					<div className="flex justify-between w-full p-1">
						<span>{name}</span>
						<div className="relative w-6">
							<ChevronDownIcon fontSize={'small'} className={`absolute h-6 w-6 ${toggle ? '' : 'hidden'} text-white`} />
							<ChevronRightIcon fontSize={'small'} className={`absolute h-6 w-6 ${!toggle ? '' : 'hidden'} text-white`} />
						</div>
					</div>
				</Button>

				<SideBarSubItem subItem={subItem} toggle={toggle} />
			</>
		);
	} else {
		const p = link !== undefined ? link.replace('/', (s: string, arr: number): string => {
			return arr === 0 ? '' : s
		}).split('/') : []

		return (
			<NavLink
				href={link || '#'}
				active={p.length > 1 && p[p.length - 1] === href}
			>
				<Button onClick={() => dispatch(toggleSideBar())}
					fullWidth
					className="px-3 py-2 text-left"
				>
					<div className="w-full">
						{name}
					</div>
				</Button>
			</NavLink>
		);
	}
}

export default SideBarItem;
