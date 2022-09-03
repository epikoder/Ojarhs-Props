import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserDashboardProperties } from "../../components/user/UserDashboardProperties"
import { UserInfo } from "../../components/user/UserInfo"
import { applicationFee } from "../../constants"
import { money } from "../../helpers/helpers"
import { User } from "../../Typing.d"

const UserDashboard = ({ props }: { props: PropsWithChildren }) => {
    const router = useRouter()
    return <UserDashboardLayout>
        {({ user }: { user: User }) => <>
            <div className="p-2">
                <UserInfo user={user} onEdit={() => router.push('/user/EditProfile')} />
                {
                    user.reference !== "" ? <UserDashboardProperties /> :
                        <>
                            <div className="py-4 mt-8 bg-gray-800 px-2 text-sm rounded-md text-white text-center">
                                <h6 className="text-red-500">NOTICE</h6>
                                <div className="lg:mx-12">
                                    You are required to pay a one time non-refundable application fee of {money(applicationFee)}
                                    {' '} and upload a Valid ID for verification to access Ojarh Properties.
                                </div>
                            </div>

                            <div className="m-4 flex justify-center">
                                <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                                    onClick={() => router.push('/user/UploadDocument')}>
                                    BEGIN PROCCESS
                                </div>
                            </div>
                        </>
                }
            </div>
        </>}
    </UserDashboardLayout>
}

export default UserDashboard