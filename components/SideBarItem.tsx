import React, { useState } from "react";
import SideBarSubItem from "./SideBarSubItem";
import NavLink from "./NavLink";
import { useAppDispatch } from "../store";
import { toggleSideBar } from "../features/ToggleSideBar";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { ArrowDropDown, ArrowForwardIos } from "@mui/icons-material";

function SideBarItem({ name, link, subItem, mobile }: {
	name: string,
	link?: string,
	mobile?: boolean
	subItem?: { name: string, link: string }[]
}) {
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
					<div className="flex justify-between w-full p-1 text-sm md:text-md">
						<span>{name}</span>
						<div className="relative w-6">
							<ArrowDropDown fontSize={'small'} className={`absolute ${toggle ? '' : 'hidden'} text-white`} />
							<ArrowForwardIos fontSize={'small'} className={`absolute ${!toggle ? '' : 'hidden'} text-white`} />
						</div>
					</div>
				</Button>

				<SideBarSubItem mobile={mobile} subItem={subItem} toggle={toggle} />
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
				<Button onClick={() => mobile === true ? dispatch(toggleSideBar()) : null}
					fullWidth
					className="px-3 py-2 text-left"
				>
					<div className="w-full text-sm md:text-md">
						{name}
					</div>
				</Button>
			</NavLink>
		);
	}
}

export default SideBarItem;
