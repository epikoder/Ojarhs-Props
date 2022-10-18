import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { checkIsAuthenticated, logout } from "../../features/authSlice"
import { RootState, useAppDispatch } from "../../store"
import { User, UserApplicationStatus } from "../../Typing"
import Layout from "../Layout"
import Loader from "../Loader"
import { UserSideBar } from "./UserSideBar"

export const UserDashboardLayout: React.FC<{
    children?: (props: {
        authenticated: boolean
        user: User
        application: UserApplicationStatus
    }) => React.ReactNode,
    className?: string, style?: React.CSSProperties
}> = (props) => {
    const authSlice = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [authenticated, user, appState, application] =
        [authSlice?.authenticated, authSlice?.user, authSlice?.appState, authSlice?.application]

    React.useEffect(() => {
        if (authenticated) return
        sessionStorage.setItem('current', router.asPath)
        dispatch(checkIsAuthenticated({}))
    }, [])

    React.useEffect(() => {
        if (authenticated === false && appState === 'completed') {
            router.push('/login')
            return
        }
        if (user !== undefined && user.is_admin && authenticated) {
            router.replace("/admin/dashboard")
            return
        }
    }, [authenticated, appState])

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