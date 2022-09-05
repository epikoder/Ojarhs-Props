import React, { useState } from "react";
import { Space } from "../Typing.d";
import {
	EyeIcon,
	TrashIcon,
	MailIcon,
	PencilAltIcon,
	DocumentTextIcon,
	DotsHorizontalIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProperty,
	// getProperty,
	updateProperty,
} from "../features/admin/propertySlice";

type Props = {
	Prop: Space;
	setOpen: any;
};

function DashProps({ Prop, setOpen }: Props) {


	const str = Prop.amount.toString();

	const price = parseInt(str);

	return (
		<div>
			<tr className='w-full flex justify-between py-2 px-1 items-center'>
				<td className='inline-block w-[50%] lg:w-[30%]'>
					<span>{Prop.name}</span>
				</td>
				<td className='hidden lg:inline-block  w-[35%]'>
					{price.toLocaleString("en-US")}
				</td>
				<td className='inline-block w-[30%] lg:w-[15%] '>
					<span>{Prop.type}</span>
				</td>
				<td className='inline-block  w-[20%]'>
					<div className='flex space-x-3 '>
						<Link href={`/details/${Prop.slug}`}>
															
								<div className=' hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md cursor-pointer'>
									Details								
							</div>
						</Link>
											
					</div>
				</td>
				
			</tr>
		</div>
	);
}

export default DashProps;
