import { Paper } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"
import React from "react"
import { useSelector } from "react-redux"
import { checkIsAuthenticated, logout } from "../../features/authSlice"
import { RootState, useAppDispatch } from "../../store"
import { CopyRight } from "../Copyright"
import Footer from "../Footer"
import Header from "../Header"
import Layout from "../Layout"
import Loader, { PageLoader } from "../Loader"
import { UserSideBar } from "./UserSideBar"

export const UserDashboardLayout = (props?: { children?: (props?: any) => React.ReactNode | undefined, className?: string, style?: React.CSSProperties }) => {
    const { authenticated, user, appState, application } = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (authenticated) return
        sessionStorage.setItem('current', router.asPath)
        dispatch(checkIsAuthenticated({}))
    }, [])

    React.useEffect(() => {
        console.log("CHECKING", authenticated, appState)
        if (authenticated === false && appState === 'completed') {
            router.push('/login')
            return
        }
        if (user !== undefined && user.is_admin && authenticated) {
            router.replace("/admin/dashboard")
            return
        }
    }, [authenticated])

    return <Layout>
        {(appState === 'completed' && authenticated && user !== undefined) &&
            <div className='min-h-[60vh] py-4 lg:flex justify-center'>
                <div className="lg:max-w-7xl md:flex justify-between w-full">
                    <div className="md:w-[25%]">
                        <UserSideBar />
                    </div>
                    <div className={`md:w-[70%] ${props.className ?? ''}`} style={props.style}>
                        {(props.children !== undefined && typeof props.children === 'function') && <React.Fragment>
                            {props.children({ authenticated, user, application })}
                        </React.Fragment>}
                    </div>
                </div>
            </div>}
        {(appState === 'pending') &&
            <div className='p-4 relative h-[50vh]'>
                <Loader />
            </div>}
    </Layout>
}