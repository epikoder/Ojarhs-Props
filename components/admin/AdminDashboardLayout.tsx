import React, { HTMLAttributes, PropsWithChildren } from "react"
import { useSelector } from "react-redux";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import SideBar from "../SideBar"
import SideBarHeader from "../SideBarHeader"

export const AdminDashboardLayout = (props: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
    const sideBarState = useSelector(SideBarToggleState);

    return <React.Fragment>
        <div className='w-full grid-rows-6 gap-1 h-[90vh]'>
            <SideBarHeader className="row-span-1" />
            <div className='grid grid-cols-12 h-full duration-300 transition-all ease-in-out md:row-span-5'>
                <SideBar className="col-span-6 md:col-span-3 lg:col-span-3 h-full" />
                <div className={`p-4 w-full overflow-scroll ${sideBarState ? 'col-span-6' : 'col-span-12'} md:col-span-9 lg:col-span-9 ${props.className}`}>
                    {props.children}
                </div>
            </div>
            <footer className="text-center bg-red text-white relative md:fixed w-full bottom-0 z-50 h-12 flex flex-col justify-center items-center">
                <div>&copy; Ojarh Global 2022</div>
            </footer>
        </div >
    </React.Fragment>
}