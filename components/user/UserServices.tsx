import { DotsVerticalIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import React, { } from "react"
import { useSelector } from "react-redux"
import { accountState } from "../../features/user/accountSlice"
import { addMonth, money } from "../../helpers/helpers"
import { loadUserServices } from "../../redux/user/dashboard"
import { useAppDispatch } from "../../store"
import { Service } from "../../Typing.d"
import { Table } from "../Table"

const TableHead = () => <div className="py-4 my-1 bg-black px-2 rounded-md text-white">
    <div className="grid grid-cols-11 text-center lg:grid-cols-12 gap-2">
        <div className="col-span-1 font-semibold uppercase text-sm">id</div>
        <div className="col-span-3 uppercase text-sm font-semibold">name</div>
        <div className="col-span-3 lg:col-span-2 font-semibold uppercase text-sm">manager</div>
        <div className="hidden lg:block col-span-2 font-semibold uppercase text-sm">expires on</div>
        <div className="col-span-2 lg:col-span-1 font-semibold uppercase text-sm">amount</div>
        <div className="col-start-11 col-end-11 lg:col-end-12 font-semibold uppercase text-sm">
            <div className="sm:hidden md:hidden lg:hidden">:</div>
            <div className="hidden sm:block">more</div>
        </div>
    </div>
</div>

const TableBody = ({ service, index }: { service: Service, index: number } & React.Attributes) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    return <div className={`py-2 my-1 ${index % 2 === 0 ? 'bg-black' : 'bg-slate-700'} px-2 rounded-md text-white text-sm`} key={index}>
        <div className="grid grid-cols-12 text-center lg:grid-cols-12 gap-2">
            <div className="col-span-1 text-sm font-semibold">{index + 1}</div>
            <div className="col-span-3 uppercase text-sm">{service.name}</div>
            <div className="col-span-3 lg:col-span-2 font-semibold uppercase text-sm">{service.manager}</div>
            <div className="hidden lg:block col-span-2 font-semibold uppercase text-sm">{addMonth(service.updated_at, service.duration)}</div>
            <div className="col-span-2 lg:col-span-1 font-semibold uppercase text-sm">{money(service.amount)}</div>
            <div className="col-end-12 font-semibold uppercase text-sm">{""}</div>
        </div>
    </div>
}
export const UserServices = () => {
    const { services } = useSelector(accountState)
    const [sortedData, setSortedData] = React.useState<Service[]>([])

    const dispatch = useAppDispatch()
    const router = useRouter()
    React.useEffect(() => {
        dispatch(loadUserServices({}))
    }, [])

    React.useEffect(() => {
        if (services.state === 'success') {
            setSortedData(services.data ?? [])
        }
    }, [services.state])

    return <Table
        state={services.state}
        data={services.data ?? []}
        noData={<div className="text-center bg-black p-3 lg:p-8 my-1 rounded-lg text-white">
            <div>
                <div className="p-2">
                    {'You don\'t have any service, Rented service will appears here'}
                </div>
                <div className="flex justify-center">
                    <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                        onClick={() => router.push('/services')}>
                        Rent Now
                    </div>
                </div>
            </div>
        </div>}
        TableHead={() => <TableHead />}
        tableBody={(value: Service, index: number): JSX.Element => <TableBody service={value} index={index} key={index} />}
    />
}