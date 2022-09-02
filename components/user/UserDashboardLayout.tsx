import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { checkIsAuthenticated } from "../../features/authSlice"
import { RootState, useAppDispatch } from "../../store"
import Layout from "../Layout"
import Loader from "../Loader"
import { UserSideBar } from "./UserSideBar"

export const UserDashboardLayout = (props?: { children?: (props?: any) => React.ReactNode | undefined, className?: string }) => {
    const { authenticated, user, appState } = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (authenticated) return
        localStorage.setItem('current', router.pathname)
        dispatch(checkIsAuthenticated())
    }, [])

    React.useEffect(() => {
        if (!authenticated && appState === 'completed') router.push('/Login')
    }, [authenticated])

    return <>
        <Layout>
            <div className="flex justify-center">
                <div className="max-w-7xl md:flex justify-between w-full">
                    <div className="md:w-[20%]">
                        <UserSideBar />
                    </div>
                    <div className={`md:w-[70%] ${props.className}`}>
                        {(props.children !== undefined && typeof props.children === 'function') && <React.Fragment>
                            {authenticated && user !== undefined ? props.children({ authenticated, user }) : <Loader />}
                        </React.Fragment>}
                    </div>
                </div>
            </div>
        </Layout>
    </>
}