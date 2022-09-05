import React, { useState } from "react";
import { useSelector } from "react-redux";
import Property from "../../components/Property";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { RootState, useAppDispatch } from "../../store";
import { useRouter } from "next/router";
import { Table } from "../../components/Table";
import { resetPropertyStatus, updateProperty } from "../../features/admin/propertySlice";
import { Space } from "../../Typing.d";
import { money } from "../../helpers/helpers";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { loadAdminProperties } from "../../redux/admin/property";

const TableHead = () => <div className="py-4 mt-4 my-1 bg-black px-2 rounded-md text-white text-xs sm:text-sm">
	<div className="grid grid-cols-10 text-center lg:grid-cols-12 gap-2 font-semibold uppercase">
		<div className="col-span-1 text-red-500">id</div>
		<div className="col-span-2">name</div>
		<div className="col-span-3 md:col-span-2">property</div>
		<div className="hidden lg:block col-span-3">address</div>
		<div className="col-span-3 md:col-span-2 lg:col-span-2">amount</div>
		<div className="hidden md:block col-span-2 lg:col-span-1">status</div>
		<div className="col-span-1 lg:col-span-1 text-center">:</div>
	</div>
</div>

const TableBody = ({ space, index }: { space: Space, index: number } & React.Attributes) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	return <div className={`py-2 my-1 ${index % 2 === 0 ? 'bg-black' : 'bg-slate-700'} px-2 rounded-md text-white text-sm`} key={index}>
		<div className="grid grid-cols-10 text-center lg:grid-cols-12 gap-2">
			<div className="col-span-1 text-red-500">{index + 1}</div>
			<div className="col-span-2 text-ellipsis">{space.name}</div>
			<div className="col-span-3 md:col-span-2">{space.type}</div>
			<div className="hidden lg:block col-span-3 text-ellipsis">{space.address}</div>
			<div className="col-span-3 md:col-span-2 text-ellipsis">{money(space.amount)}</div>
			<div className="hidden md:block col-span-2 lg:col-span-1 text-ellipsis">{space.status}</div>
			<div className="col-span-1 lg:col-span-1 flex justify-center"><DotsVerticalIcon height={18} /> </div>
		</div>
	</div>
}

function DashProps() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { status, data } = useSelector((store: RootState) => store.propertySlice)

	React.useEffect(() => {
		dispatch(loadAdminProperties())
	}, [])

	React.useEffect(() => { dispatch(resetPropertyStatus()) }, [status])

	return (
		<AdminDashboardLayout>
			{() => <React.Fragment>
				<div className='flex justify-between w-full items-center shadow-gray-200 shadow-md px-2'>
					<h1 className='lg:text-xl text-lg red'>Properties</h1>
					<button
						type='button'
						className='inline-block px-6 lg:px-12 py-2 rounded-full  hover:scale-110 active:scale-95  text-white bg-red font-medium text-xs leading-tight uppercase mb-4  shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
						onClick={() => { router.push('properties/new-property') }}
					>
						Add new
					</button>
				</div>
				<Table
					tableHead={<TableHead />}
					tableBody={(value: Space, index: number) => <TableBody space={value} key={index} index={index} />}
					data={data}
					state={status} />
			</React.Fragment>}
		</AdminDashboardLayout>
	);
}
export default DashProps;
