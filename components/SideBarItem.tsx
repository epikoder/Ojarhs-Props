import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import SideBarSubItem from "./SideBarSubItem";

function SideBarItem({ name, subItem, type }: { name: string, subItem?: { name: string, link: string }[], type?: string }) {
	const [toggle, setToggle] = useState(false)


	if (subItem !== undefined) {
		return (
			<div className='hov text-white transition-all duration-200 ease-in-out my-2 p-2' onClick={() => setToggle(!toggle)}>
				<div className='flex justify-between hov cursor-pointer transition duration-700 ease-in-out mr-4'>
					<span>{name}</span>
					<div className="relative">
						<ChevronDownIcon className={`absolute hov h-6 w-6 ${toggle ? '' : 'hidden'}`} />
						<ChevronRightIcon className={`absolute hov h-6 w-6 ${!toggle ? '' : 'hidden'}`} />
					</div>
				</div>

				<SideBarSubItem subItem={subItem} toggle={toggle} />
			</div>
		);
	} else {
		return (
			<div className='hov my-2 p-2 cursor-pointer'>
				<div className='text-white transition duration-700 ease-in-out hov'>
					<span>{name}</span>
				</div>
			</div>
		);
	}
}

export default SideBarItem;
