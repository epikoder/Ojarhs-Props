import React, { useState } from "react";
import { Service } from "../Typing.d";
import {
	TrashIcon,
	MailIcon,
	PencilAltIcon,
	DocumentTextIcon,
	DotsHorizontalIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteService,
	getIndividualService,
	getService,
	ServiceList
} from "../features/ServiceSlice";

type Services = {
	Service: Service;
	setOpen: any;
};

function Service({ Service, setOpen }: Services) {
	const serviceList = useSelector(ServiceList);
	const dispatch = useDispatch();
	const individualService = useSelector(getIndividualService);

	console.log(Service);


	const handleDelete = () => {
		dispatch(deleteService(Service.id));
	};
	const handleEdit = () => {
		dispatch(getService(Service.id));
		console.log(individualService);
		setOpen(true);
	};

	const pricestr = Service.amount.toString()

	const Price = parseInt(pricestr).toLocaleString("en-US")

	if (Service) {
		return (
			<div>
				<tr className='w-full flex  py-2 px-1 items-center'>
					<td className='inline-block w-[30%] capitalize '>
						<span>{Service.name}</span>
					</td>
					<td className='hidden lg:inline-block w-[30%] '>{Service.duration}</td>
					<td className=' lg:inline-block w-[20%] '>{Price}</td>
					<td className=' lg:inline-block hidden w-[20%] '>
						<div className='flex space-x-3 '>
							<Link href={`/Details/${Service.id}`}>
								<div className='group cursor-pointer relative'>
									<DocumentTextIcon className='h-6 w-6  cursor-pointer text-gray-500 ' />
									<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer'>
										Details
									</div>
								</div>
							</Link>
							<div
								className='group cursor-pointer  relative'
								onClick={handleEdit}
							>
								<PencilAltIcon className='h-6 w-6  text-gray-500 ' />
								<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer'>
									Edit
								</div>
							</div>
							<div className='cursor-pointer group relative'>
								<MailIcon className='h-6 w-6  text-gray-500 ' />
								<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer'>
									Messsage
								</div>
							</div>
							<div
								className='cursor-pointer group relative'
								onClick={handleDelete}
							>
								<TrashIcon className='h-6 w-6  text-gray-500 ' />
								<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer'>
									Delete
								</div>
							</div>
						</div>
					</td>
					<td className='lg:hidden w-[20%]'>
						<div className='group relative'>
							<DotsHorizontalIcon className='h-5 w-5' />

							<div className='bg-black w-35 h-35 absolute  hidden group-hover:flex top-5 	 left-0 text-white flex-col p-2 z-30 px-4 rounded-2xl cursor-pointer'>
								<span className='px-3 py-1 hov'>Details</span>
								<span className='px-3 py-1 hov'>Mesaage</span>
								<span className='px-3 py-1 hov' onClick={handleEdit}>
									Edit
								</span>
								<span className='px-3 py-1 hov' onClick={handleDelete}>
									Delete
								</span>
							</div>
						</div>
					</td>
				</tr>
			</div>
		);
	}
}

export default Service;
