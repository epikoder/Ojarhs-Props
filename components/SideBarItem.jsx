import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import SideBarSubItem from "./SideBarSubItem";
import { useDispatch } from "react-redux";
import { Toggle } from "../features/ToggleSubItem";

function SideBarItem({ name, subItem }) {
	const dispatch = useDispatch();	

	if (subItem) {
		return (
			<div className='hov text-white transition-all duration-200 ease-in-out ' onClick={() => dispatch(Toggle())}>
				<div
					className='flex justify-between hov cursor-pointer my-2 transition
          duration-700
          ease-in-out'
				>
					<span>{name}</span>
					<ChevronDownIcon className=' hov h-6 w-6' />
				</div>

				<SideBarSubItem subItem={subItem} />
			</div>
		);
	} else {
		return (
			<div className='hov'>
				<div
					className='flex justify-between text-white hov cursor-pointer my-2   transition
          duration-700
          ease-in-out'
				>
					<span>{name}</span>					
				</div>

				<SideBarSubItem />
			</div>
		);
	}
}

export default SideBarItem;
