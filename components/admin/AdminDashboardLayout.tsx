import { Card, Paper, Toolbar } from "@mui/material";
import ChangePassword from "components/ChangePassword";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react"
import { useSelector } from "react-redux";
import { checkIsAuthenticated } from "../../features/authSlice";
import { RootState, useAppDispatch } from "../../store";
import { User } from "../../Typing";
import { CopyRight } from "../Copyright";
import Loader, { PageLoader } from "../Loader";
import SideBar from "../SideBar"
import AdminHeader from "../SideBarHeader"

export const AdminDashboardLayout: React.FC<{
    children?: (params: {
        authenticated: boolean,
        user: User,
        loading: {
            busy: () => void,
            idle: () => void,
            state: boolean
        }
    }) => React.ReactNode | undefined,
    className?: string
    style?: React.CSSProperties
}> = (props) => {
    const sideBarState = useSelector((store: RootState) => store.toggleSideBar.status);
    const { authenticated, user, appState } = useSelector((store: RootState) => store.authSlice)
    const [loading, setLoading] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (authenticated) return
        sessionStorage.setItem('current', router.asPath)
        dispatch(checkIsAuthenticated({ isAdmin: true }))
    }, [dispatch, authenticated, router.asPath])

    React.useEffect(() => {
        if (authenticated === false && appState === 'completed') router.push('/admin/login')
        if (user !== undefined && !user.is_admin) router.push('/login')
    }, [authenticated, appState, router])

    const setIdle = () => setLoading(false)
    const setBusy = () => setLoading(true)

    return <React.Fragment>
        <Script src='/scripts/noimage.js'></Script>
        <Paper className='w-full h-[100vh]'>
            {appState !== 'pending' && authenticated
                &&
                <React.Fragment>
                    <AdminHeader user={user} />
                    <PageLoader />
                    <Card className='grid grid-cols-12 gap-1 duration-300 transition-all ease-in-out' style={{
                        height: 'calc(100% - 136px)'
                    }}>
                        <ChangePassword button={<></>} />
                        <SideBar className="col-span-6 md:col-span-4 lg:col-span-3 h-full" />
                        <div className={`p-2 lg:p-4 w-full overflow-scroll ${sideBarState ? 'col-span-6' : 'col-span-12'} md:col-span-8 lg:col-span-9 ${props.className ?? ''}`} style={props.style}>
                            {(props.children !== undefined && typeof props.children === 'function') && <React.Fragment>
                                {authenticated && user !== undefined && <>
                                    {props.children({ authenticated, user, loading: { idle: setIdle, busy: setBusy, state: loading } })}
                                </>}
                            </React.Fragment>}
                        </div>
                    </Card>
                </React.Fragment>
            }
            {appState === 'pending' &&
                <Loader />}
            <CopyRight className="bg-red text-white fixed bottom-0 left-0 right-0 row-span-1 h-full flex flex-grow flex-col justify-center items-center" />
        </Paper >
    </React.Fragment>
}