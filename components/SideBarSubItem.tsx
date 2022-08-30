import Link from "next/link";
import React from "react";

function SideBarSubItem({ subItem, toggle }: { subItem: { name: string, link: string }[], toggle: boolean }) {
	return (
		<div className=' text-white flex-col space-y- transition-all duration-1000 ease-in-out'>
			{subItem.map((item, index) => {
				return (
					<div
						key={index}
						className={`text-gray-300 cursor-pointer hov hover:ml-2 transition-all duration-700 py-2 text-sm ${toggle ? '' : 'hidden'}`}
					>
						<span className="font-semibold">-</span> <Link href={item.link}>{item.name}</Link>
					</div>
				);
			})}
		</div>
	)
}

export default SideBarSubItem;
