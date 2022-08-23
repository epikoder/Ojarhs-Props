import React, { useState } from "react";
import { Tenants } from "../Typing.d";
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
import { tenantsList, deleteTenant,  getIndividualTenant, Gettenant } from "../features/TenantsSlice";
import NewTenant from "./NewTenant";

type Tenant = {
	Tenant: Tenants;	
	setOpen:any
};

function Tenant({ Tenant, setOpen }: Tenant) {	
	const tenantList = useSelector(tenantsList);
	const dispatch = useDispatch();
	const individualTenant = useSelector(getIndividualTenant);
	
	const handleDelete = () => {
		dispatch(deleteTenant(Tenant.id))
	}
	const handleEdit = () => {	
		dispatch(Gettenant(Tenant))	
		console.log(individualTenant);
		setOpen(true);				
	}	


	if (Tenant) {
		return (				
			<div>			
				<tr className='w-full flex justify-between py-2 px-1 items-center'>
				
				<td className='inline-block w-[50%] lg:w-[30%]'>
					<span>
						{Tenant.lastName} {Tenant.firstName}
					</span>
				</td>
				<td className='hidden lg:inline-block  w-[35%]'>{Tenant.email}</td>
				<td className='inline-block w-[30%] lg:w-[15%] '>
					<span
						className={
							Tenant.states === "active"
								? "text-xs py-1 rounded-md bg-green-200 text-green-700 px-2 text-center uppercase"
								: "text-xs py-1 rounded-md bg-red-200 text-red-700 px-2 text-center uppercase"
						}
					>
						{Tenant.states}
					</span>
				</td>
				<td className='hidden lg:inline-block  w-[20%]'>
					<div className='flex space-x-3 '>
						<Link href={`/Details/${Tenant.id}`}>
							<div className='group cursor-pointer relative'>
								<DocumentTextIcon className='h-6 w-6  cursor-pointer text-gray-500 ' />
								<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer'>
									Details
								</div>
							</div>
						</Link>
						<div className='group cursor-pointer  relative' onClick={handleEdit}>
							<PencilAltIcon className='h-6 w-6  text-gray-500 ' />
							<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer' >
								Edit
							</div>
						</div>
						<div className='cursor-pointer group relative'>
							<MailIcon className='h-6 w-6  text-gray-500 ' />
							<div className='absolute top-6 hov bg-gray-700 text-gray-200 p-2 z-30 rounded-md group-hover:block hidden cursor-pointer'>
								Messsage
							</div>
						</div>
						<div className='cursor-pointer group relative' onClick={handleDelete}>
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
							<span className='px-3 py-1 hov' onClick={handleEdit}>Edit</span>
							<span className='px-3 py-1 hov' onClick={handleDelete}>Delete</span>
						</div>
					</div>
				</td>
			</tr>
	
			</div>
		);
	
	} 	

	
}

export default Tenant;
