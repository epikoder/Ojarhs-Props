import { Card, Paper } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserInfo } from "../../components/user/UserInfo"
import { User, UserApplicationStatus } from "../../Typing.d"

const Profile = () => {
    return <UserDashboardLayout>
        {({ user, application }: { user: User, application: UserApplicationStatus }) => <>
            <div className="p-2 w-full">
                <UserInfo user={user} />
                <div className="space-y-2">
                    <Card elevation={1} className="p-2">
                        <div className="flex text-sm lg:text-lg justify-between items-center">
                            <div className="uppercase ">
                                {'Application status'}
                            </div>
                            <div className="uppercase text-gray-600 ">
                                {application !== 'verified' ? 'ACTION REQUIRED' : application}
                            </div>
                        </div>
                    </Card>
                    <Card elevation={1} className="p-2">
                        {(user.reference != '' && user.reference !== undefined) &&
                            <div className="flex text-sm lg:text-lg justify-between items-center">
                                <div className="uppercase ">
                                    {'Reference code'}
                                </div>
                                <div className="uppercase text-gray-600 ">
                                    {user.reference}
                                </div>
                            </div>}
                    </Card>
                    <Card elevation={1} className="p-2">
                        <div className="flex text-sm lg:text-lg justify-between items-center">
                            <div className="uppercase ">
                                {'Guarantor Name'}
                            </div>
                            <div className="uppercase text-gray-600 ">
                                {user.guarantor_name}
                            </div>
                        </div>
                    </Card>
                    <Card elevation={1} className="p-2">
                        <div className="flex text-sm lg:text-lg justify-between items-center">
                            <div className="uppercase ">
                                {'Guarantor Phone'}
                            </div>
                            <div className="uppercase text-gray-600 ">
                                {user.guarantor_phone}
                            </div>
                        </div>
                    </Card>
                    <Card elevation={1} className="p-2">
                        <div className="flex text-sm lg:text-lg justify-between items-center">
                            <div className="uppercase ">
                                {'Guarantor Address'}
                            </div>
                            <div className="uppercase text-gray-600 ">
                                {user.guarantor_address}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>}
    </UserDashboardLayout>
}
export default Profile 