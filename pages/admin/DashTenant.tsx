import React, { useState } from "react";
import { Tenants } from "../../Typing.d";
import Link from "next/link";

type Tenant = {
	Tenant: Tenants;
	setOpen: any;
};

function DashTenant({ Tenant }: Tenant) {
	if (Tenant) {
		return (
			<div className="w-full">
				<tr className='w-full flex justify-between py-2 px-1 items-center space-x-3'>
					<td className='inline-block '>
						<span>
							{Tenant.lastName} {Tenant.firstName}
						</span>
					</td>					
					<td className='inline-block'>
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
					<td className=''>
						<Link href={`/Details/${Tenant.id}`}>
							<div className='top-6 hov bg-gray-700 text-gray-200 px-2 py-1 z-30 rounded-md block cursor-pointer'>
								Details
							</div>
						</Link>
					</td>
				</tr>
			</div>
		);
	}
}

export default DashTenant;
