import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserInfo } from "../../components/user/UserInfo"
import { RootState, useAppDispatch } from "../../store"

const Profile = () => {
    const { authenticated, user } = useSelector((store: RootState) => store.authSlice)
    const router = useRouter()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (!authenticated) router.push('/Login')
        console.log(user)

    }, [authenticated])

    React.useEffect(() => {
        // dispatch(loadUserProperties({}))
    })
    const applicationFee = 10000
    return <UserDashboardLayout>
        {(authenticated && user !== undefined) && <>
            <div className="p-2 w-full">
                <UserInfo user={user} onEdit={() => router.push('/user/EditProfile')} />
            </div>
        </>}
    </UserDashboardLayout>
}
export default Profile 