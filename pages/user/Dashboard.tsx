import { PencilIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import { useSelector } from "react-redux"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserDashboardProperties } from "../../components/user/UserDashboardProperties"
import { UserInfo } from "../../components/user/UserInfo"
import { money, resolveImagePath } from "../../helpers/helpers"
import { RootState } from "../../store"

const UserDashboard = ({ props }: { props: PropsWithChildren }) => {
    const { authenticated, user } = useSelector((store: RootState) => store.authSlice)
    const router = useRouter()

    React.useEffect(() => {
        if (!authenticated) router.push('/Login')
        console.log(user)
    }, [authenticated])



    const applicationFee = 10000
    return <UserDashboardLayout>
        {(authenticated && user !== undefined) && <>
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