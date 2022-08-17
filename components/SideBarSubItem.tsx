import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { toggleState } from "../features/ToggleSubItem";

type subItem = {
	subItem: [];
};

function SideBarSubItem({ subItem }) {
	const ToggleState = useSelector(toggleState);	

	return ToggleState ? (
		<div className=' text-white flex-col space-y- transition-all duration-1000 ease-in-out'>
			{subItem
				? subItem.map((item, index) => {
						return (
							<div
								key={index}
								className='text-gray-300 cursor-pointer hov hover:ml-2 transition-all duration-700 py-2 text-xs'
							>
								<span>-</span> <Link href={item.link}>{item.name}</Link>
							</div>
						);
				  })
				: ""}
		</div>
	) : (
		" "
	);
}

export default SideBarSubItem;
