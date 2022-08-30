import { useRouter } from "next/router"
import React, { HTMLAttributes, PropsWithChildren } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Layout from "../Layout"
import { UserSideBar } from "./UserSideBar"

export const UserDashboardLayout = (props?: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
    return <>
        <Layout>
            <div className="flex justify-center">
                <div className="max-w-7xl md:flex justify-between w-full">
                    <div className="md:w-[20%]">
                        <UserSideBar />
                    </div>
                    <div className={`md:w-[70%] ${props.className}`}>
                        {props.children}
                    </div>
                </div>
            </div>
        </Layout>
    </>
}