import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboardLayout } from "../../components/admin/AdminDashboardLayout";
import { RootState, useAppDispatch } from "../../store";
import { useRouter } from "next/router";
import { Table } from "../../components/Table";
import { resetPropertyState, toggleProperyStatus, updateProperty } from "../../features/admin/propertySlice";
import { ApiResponse, Space } from "../../Typing.d";
import { money } from "../../helpers/helpers";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { loadAdminProperties } from "../../redux/admin/admin";
import ReactSwitch from "react-switch";
import { LoaderWhite } from "../../components/Loader";
import { Api } from "../../helpers/api";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { ArrowsExpandIcon, EyeIcon, PencilIcon, TrashIcon, UserAddIcon } from "@heroicons/react/outline";

const TableHead = () => <div className="py-4 mt-4 my-1 bg-black px-2 rounded-md text-white text-xs sm:text-sm">
	<div className="grid grid-cols-10 text-center lg:grid-cols-12 gap-2 font-semibold uppercase">
		<div className="col-span-1 text-red-500">id</div>
		<div className="col-span-2">name</div>
		<div className="col-span-3 md:col-span-2">property</div>
		<div className="hidden lg:block col-span-3">address</div>
		<div className="col-span-3 md:col-span-2 lg:col-span-2">amount</div>
		<div className="hidden md:block col-span-2 lg:col-span-1">occupied</div>
		<div className="col-span-1 lg:col-span-1 text-center cursor-not-allowed">:</div>
	</div>
</div>

const TableBody = ({ space, index }: { space: Space, index: number } & React.Attributes) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(false)
	const dispatch = useAppDispatch()
	const router = useRouter()

	return <div className={`py-2 my-1 ${index % 2 === 0 ? 'bg-black' : 'bg-slate-700'} px-2 rounded-md text-white text-sm`} key={index}>
		<div className="grid grid-cols-10 text-center items-center lg:grid-cols-12 gap-2">
			<div className="col-span-1 text-red-500">{index + 1}</div>
			<div className="col-span-2 cursor-pointer text-ellipsis two-lines overflow-hidden whitespace-nowrap" onClick={() => setIsOpen(!isOpen)}>{space.name}</div>
			<div className="col-span-3 md:col-span-2 text-ellipsis two-lines overflow-hidden whitespace-nowrap">{space.type}</div>
			<div className="hidden lg:block col-span-3">
				<span className="text-ellipsis two-lines overflow-hidden whitespace-nowrap">
					{space.address}
				</span>
			</div>
			<div className="col-span-3 md:col-span-2 text-ellipsis two-lines overflow-hidden whitespace-nowrap">{money(space.amount)}</div>
			<div className="hidden md:block col-span-2 lg:col-span-1 text-ellipsis">
				{loading && <div className="h-full relative">
					<LoaderWhite />
				</div>}
				{!loading && <ReactSwitch
					checked={space.status === 'occupied'}
					onChange={async () => {
						setLoading(true)
						try {
							const { data, status } = await Api().put<ApiResponse<'open' | 'occupied'>>('/admin/properties/update/status', { slug: space.slug, status: space.status === 'occupied' ? 'open' : 'occupied' })
							setLoading(false)
							if (status !== 200) return
							if (data.status === 'failed') return
							dispatch(toggleProperyStatus({
								index: index,
								status: data.data,
							}))
						} catch (error) {
							setLoading(false)
						}
					}} />}
			</div>
			<div className="col-span-1 lg:col-span-1 flex justify-center cursor-pointer transition-all duration-300 ease-in-out">
				<div className="mr-4">
					<Menu menuButton={<DotsVerticalIcon height={18} />}>
						<MenuItem className={'p-2 my-2 bg-white rounded-full hover:scale-110'} >
							<PencilIcon onClick={() => router.push(`/admin/properties/update-property/${space.slug}`)} className="text-black" height={20} />
						</MenuItem>
						<MenuItem className={'p-2 my-2 bg-white rounded-full  hover:scale-110'} >
							<EyeIcon onClick={() => router.push(`/property/${space.slug}`)} className="text-black" height={20} />
						</MenuItem>
						<MenuItem className={'p-2 my-2 bg-white rounded-full  hover:scale-110'} >
							<UserAddIcon className="text-black" height={20} />
						</MenuItem>
						<MenuItem className={'p-2 my-2 bg-white rounded-full hover:scale-110'} >
							<ArrowsExpandIcon onClick={() => setIsOpen(!isOpen)} className="text-black" height={20} />
						</MenuItem>
						<MenuItem className={'p-2 my-2 bg-white rounded-full hover:scale-110'} >
							<TrashIcon className="text-black" height={20} />
						</MenuItem>
					</Menu>
				</div>
			</div>
		</div>
		<div className={`${!isOpen && 'hidden'} px-2 my-2 py-1 w-10/12 lg:w-6/12 bg-white text-black rounded-md mx-2`}>
			<div className="text-red-500 ">
				Details
			</div>
			<ul>
				<li className="text-xs font-mono text-ellipsis overflow-hidden whitespace-nowrap border-y py-1 flex justify-between">
					<span>{'Slug:'}</span> <span>{space.slug}</span>
				</li>
				<li className="text-xs font-mono flex justify-between">
					<span>{'Description:'}</span> <span className="text-ellipsis two-lines overflow-hidden border-y py-1 whitespace-nowrap">{space.description}</span>
				</li>
				<li className="text-xs font-mono text-ellipsis overflow-hidden whitespace-nowrap border-y py-1 flex justify-between">
					<span>{'Size:'}</span> <span>{space.size}</span>
				</li>
				<li className="text-xs font-mono text-ellipsis overflow-hidden whitespace-nowrap border-y py-1 flex justify-between">
					<span>{'Plan:'}</span> <span>{space.plan}</span>
				</li>
				{space.status === 'occupied' && <li className="text-xs font-mono text-ellipsis overflow-hidden border-y py-1 whitespace-nowrap flex justify-between">
					<span>{'Tenant:'}</span> <span>{space.tenant}</span>
				</li>}
			</ul>
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

	React.useEffect(() => { dispatch(resetPropertyState()) }, [status])

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
					TableHead={() => <TableHead />}
					tableBody={(value: Space, index: number) => <TableBody space={value} key={index} index={index} />}
					data={data}
					state={status} />
				<div className="mb-20">
				</div>
			</React.Fragment>}
		</AdminDashboardLayout>
	);
}
export default DashProps;
