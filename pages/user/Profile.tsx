import { useRouter } from "next/router"
import React from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserInfo } from "../../components/user/UserInfo"

const Profile = () => {
    const router = useRouter()

    return <UserDashboardLayout>
        {({ user }) => <>
            <div className="p-2 w-full">
                <UserInfo user={user} onEdit={() => router.push('/user/EditProfile')} />
            </div>
        </>}
    </UserDashboardLayout>
}
export default Profile 