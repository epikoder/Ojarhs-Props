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
import Loader, { PageLoader } from "../Loader"
import { UserSideBar } from "./UserSideBar"

export const UserDashboardLayout = (props?: { children?: (props?: any) => React.ReactNode | undefined, className?: string }) => {
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
        if (user !== undefined && user.is_admin) {
            dispatch(logout())
            router.replace("/admin/login")
            return
        }
    }, [authenticated])

    return <>
        <div className='duration-300 ease-in-out transition-all' style={{
            backgroundColor: '#edf3f8'
        }}>
            <Head>
                <title>Ojarh Properties</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />
            </Head>
            <Script src='/scripts/noimage.js'></Script>
            <Header />
            <PageLoader />
            <div className='min-h-[100vh]'>
                <div className='min-h-[50vh]'>
                    {(appState === 'completed' && authenticated && user !== undefined) &&
                        <main className='min-h-[60vh] lg:flex justify-center'>
                            <div className="lg:max-w-7xl md:flex justify-between w-full">
                                <div className="md:w-[20%]">
                                    <UserSideBar />
                                </div>
                                <div className={`md:w-[70%] ${props.className ?? ''}`}>
                                    {(props.children !== undefined && typeof props.children === 'function') && <React.Fragment>
                                        {props.children({ authenticated, user, application })}
                                    </React.Fragment>}
                                </div>
                            </div>
                        </main>}
                    {(appState === 'pending') &&
                        <div className='p-4 relative h-[50vh]'>
                            <Loader />
                        </div>}
                </div>
                <Footer />
            </div>
            <CopyRight className='bg-red text-white' />
        </div>
    </>
}