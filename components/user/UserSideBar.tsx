import Link from "next/link"
import { DotsVerticalIcon, XIcon } from "@heroicons/react/solid"
import React from "react"
import { RootState } from "../../store"
import { useSelector } from "react-redux"
import NavLink from "../NavLink"

const MenuItem = ({ title, href = '/' }: { title: string, href?: string }) => {
    return <>
        <NavLink href={href}>
            <div className="hover:cursor-pointer p-4 hover:bg-red-800 active:bg-red-500 duration-300 transition-all ease-in-out hover:text-gray-300 rounded-md uppercase font-sans text-md">
                {title}
            </div>
        </NavLink>
    </>
}

const MenuItemMobile = ({ title, href = '/' }: { title: string, href?: string }) => {
    return <>
        <NavLink href={href}>
            <div className="hover:cursor-pointer p-4 duration-300 transition-all ease-in-out hover:text-gray-300 active:text-red-500 rounded-md uppercase font-sans text-md">
                {title}
            </div>
        </NavLink>
    </>
}

export const UserSideBar = () => {
    const [isOpen, toggleOpen] = React.useState<boolean>(false)
    const { user, authenticated } = useSelector((store: RootState) => store.authSlice)

    React.useEffect(() => {
        if (!authenticated) console.log("IM NOT SUPPOSED TO BE HERE")
    })
    return <React.Fragment>
        {user !== undefined && <div>
            <div className="md:hidden">
                <div className="relative">
                    <DotsVerticalIcon className="text-black w-6 my-2 absolute right-1" onClick={() => toggleOpen(!isOpen)} />
                </div>
                {isOpen && <div className="absolute z-10 text-center text-white w-full h-[100vh]" style={{
                    backgroundColor: '#000000de'
                }}>
                    <div className="relative flex justify-end px-4">
                        <XIcon className="text-white w-8" onClick={() => toggleOpen(!isOpen)} />
                    </div>
                    <MenuItemMobile title="Dasboard" href="/user/dashboard" />
                    <MenuItemMobile title="Profile" href="/user/profile" />
                    <MenuItemMobile title="Service" href="/user/service" />
                    <MenuItemMobile title="Receipts" href="/user/receipt" />
                    <MenuItemMobile title="Disputes" href="/user/dispute" />
                    <MenuItemMobile title="Adverts" href="/user/advert" />
                    {user.reference !== "" && <MenuItemMobile title="Request pack out" href="/user/packout" />}
                    <hr />
                    <div className="hover:cursor-pointer p-4 duration-300 transition-all ease-in-out text-red-700 hover:text-gray-500 rounded-md uppercase font-sans">
                        Logout
                    </div>
                </div>}
            </div>
            <div className="my-2 mx-2 bg-black text-center rounded-md hidden md:block text-white">
                <MenuItem title="Dashboard" href="/user/dashboard" />
                <MenuItem title="Profile" href="/user/profile" />
                <MenuItem title="Service" href="/user/service" />
                <MenuItem title="Receipts" href="/user/receipt" />
                <MenuItem title="Disputes" href="/user/dispute" />
                <MenuItem title="Adverts" href="/user/advert" />
                {user.reference !== "" && <MenuItem title="Request pack out" href="/user/packout" />}

                <hr />
                <div className="hover:cursor-pointer p-4 hover:bg-red-800 duration-300 transition-all ease-in-out text-white hover:text-gray-300 rounded-md uppercase font-sans">
                    Logout
                </div>
            </div>
        </div>}
    </React.Fragment>
}