import { useRouter } from "next/router"
import React from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserInfo } from "../../components/user/UserInfo"

const Profile = () => {
    return <UserDashboardLayout>
        {({ user }) => <>
            <div className="p-2 w-full">
                <UserInfo user={user} />
            </div>
        </>}
    </UserDashboardLayout>
}
export default Profile 