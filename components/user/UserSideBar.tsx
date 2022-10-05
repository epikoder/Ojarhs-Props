import React from "react"
import { RootState, useAppDispatch } from "../../store"
import { useSelector } from "react-redux"
import NavLink from "../NavLink"
import { logout } from "../../features/authSlice"
import { Button, Card } from "@mui/material"
import { useRouter } from "next/router"

const MenuItem = ({ title, href = '/' }: { title: string, href?: string }) => {
    const router = useRouter()
    const path = router.asPath.replace('/', (s: string, arr: number): string => {
        return arr === 0 ? '' : s
    }).split('/')
    let _href = ''
    if (path.length > 1) {
        _href = path[1]
    }
    const subPath = href.replace('/', (s: string, arr: number): string => {
        return arr === 0 ? '' : s
    }).split('/')
    return <>
        <div>
            <NavLink href={href} active={subPath.length > 1 && subPath[1] === _href}>
                <Button
                    fullWidth
                    size='large'>
                    {title}
                </Button>
            </NavLink>
        </div>
    </>
}

export const UserSideBar = () => {
    const { user } = useSelector((store: RootState) => store.authSlice)
    const dispatch = useAppDispatch()
    return <React.Fragment>
        {user !== undefined && <div>
            <Card className="my-2 mx-2 text-center rounded-md hidden md:block">
                <MenuItem title="Dashboard" href="/user/dashboard" />
                <MenuItem title="Profile" href="/user/profile" />
                <MenuItem title="Service" href="/user/service" />
                <MenuItem title="Receipts" href="/user/receipt" />
                <MenuItem title="Messages" href="/user/message" />
                <MenuItem title="Disputes" href="/user/disputes" />
                <MenuItem title="Report" href="/user/report" />
                <MenuItem title="Adverts" href="/user/advert" />
                <MenuItem title="Request pack out" href="/user/packout" />

                <hr />
                <Button
                    fullWidth
                    size='large'
                    sx={{
                        ':hover': {
                            backgroundColor: 'red'
                        }
                    }}
                    onClick={() => dispatch(logout())}>
                    LOGOUT
                </Button>
            </Card>
        </div>}
    </React.Fragment>
}