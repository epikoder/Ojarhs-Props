import { useRouter } from "next/router";
import Script from "next/script";
import React from "react"
import { useSelector } from "react-redux";
import { checkIsAuthenticated } from "../../features/authSlice";
import { SideBarToggleState } from "../../features/ToggleSideBar";
import { RootState, useAppDispatch } from "../../store";
import { CopyRight } from "../Copyright";
import Loader from "../Loader";
import SideBar from "../SideBar"
import SideBarHeader from "../SideBarHeader"

export const AdminDashboardLayout = (props?: { children?: (props?: any) => React.ReactNode | undefined, className?: string }) => {
    const sideBarState = useSelector(SideBarToggleState);
    const { authenticated, user, appState } = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (authenticated) return
        localStorage.setItem('current', router.pathname)
        dispatch(checkIsAuthenticated({ isAdmin: true }))
    }, [])

    React.useEffect(() => {
        console.log("AUTHENTICATED:", authenticated, "APPSTATE :", appState)
        if (authenticated === false && appState === 'completed') router.push('/admin/Login')
    }, [authenticated])

    return <React.Fragment>
        <Script src='/scripts/noimage.js'></Script>
        <div className='w-full grid-rows-6 gap-1 h-[88vh]'>
            {appState !== 'pending' ? <React.Fragment>
                <SideBarHeader user={user} className="row-span-1" />
                <div className='grid grid-cols-12 h-full duration-300 transition-all ease-in-out md:row-span-5'>
                    <SideBar className="col-span-6 md:col-span-3 lg:col-span-3 h-full" />
                    <div className={`p-2 lg:p-4 w-full overflow-scroll ${sideBarState ? 'col-span-6' : 'col-span-12'} md:col-span-9 lg:col-span-9 ${props.className ?? ''}`}>
                        {(props.children !== undefined && typeof props.children === 'function') && <React.Fragment>
                            {authenticated && user !== undefined && props.children({ authenticated, user })}
                        </React.Fragment>}
                    </div>
                </div>
                <CopyRight className="bg-red text-white relative md:fixed w-full bottom-0 z-50 h-12 flex flex-col justify-center items-center" />
            </React.Fragment> : <Loader />}
        </div >
    </React.Fragment>
}