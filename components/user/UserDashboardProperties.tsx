import { useRouter } from "next/router"
import React, { ReactPropTypes } from "react"
import { useSelector } from "react-redux"
import { addMonth, money } from "../../helpers/helpers"
import { loadUserProperties } from "../../redux/user/dashboard"
import { RootState, useAppDispatch } from "../../store"
import { Space } from "../../Typing.d"
import { Table } from "../Table"

const TableHead = () => <div className="py-4 mt-8 my-1 bg-black px-2 rounded-md text-white">
    <div className="grid grid-cols-9 text-center lg:grid-cols-12 gap-2">
        <div className="col-span-1 font-semibold uppercase text-sm">id</div>
        <div className="col-span-3 font-semibold uppercase text-sm">property</div>
        <div className="hidden lg:block col-span-3 font-semibold uppercase text-sm">address</div>
        <div className="hidden lg:block col-span-2 font-semibold uppercase text-sm">expires on</div>
        <div className="col-span-3 lg:col-span-2 font-semibold uppercase text-sm">amount</div>
        <div className="col-span-2 lg:col-span-1 font-semibold uppercase text-sm">action</div>
    </div>
</div>

const TableBody = ({ space, index }: { space: Space, index: number } & React.Attributes) => {
    console.log(space)
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    return <div className="py-4 my-1 bg-black px-2 rounded-md text-white text-sm" key={index}>
        <div className="grid grid-cols-9 text-center lg:grid-cols-12 gap-2">
            <div className="col-span-1 text-sm font-semibold">{index + 1}</div>
            <div className="col-span-3 uppercase text-sm">{space.type}</div>
            <div className="hidden lg:block col-span-3 text-sm">{space.address}</div>
            <div className="hidden lg:block col-span-2 text-sm">{addMonth(space.updated_at, space.duration)}</div>
            <div className="col-span-3 lg:col-span-2 text-sm">{money(space.amount)}</div>
            <div className="col-span-2 lg:col-span-1 text-sm">Action</div>
        </div>
    </div>
}
export const UserDashboardProperties = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.properties)
    const [sortedData, setSortedData] = React.useState<Space[]>([])

    const dispatch = useAppDispatch()
    const router = useRouter()
    React.useEffect(() => {
        dispatch(loadUserProperties({}))
    }, [])

    React.useEffect(() => {
        if (state === 'success') {
            console.log(data)
            setSortedData(data ?? [])
        }
    }, [state])

    const body = (value: Space, index: number): JSX.Element => <TableBody space={value} index={index} key={index} />

    return <Table
        state={state}
        data={data ?? []}
        noData={<div className="text-center bg-black p-3 lg:p-8 my-1 rounded-lg text-white">
            <div>
                <div className="p-2">
                    {'You don\'t have any property, Rented property will appears here'}
                </div>
                <div className="flex justify-center">
                    <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                        onClick={() => router.push('/')}>
                        Rent Now
                    </div>
                </div>
            </div>
        </div>}
        tableHead={<TableHead />}
        tableBody={body}
    />
}