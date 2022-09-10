import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserDashboardProperties } from "../../components/user/UserDashboardProperties"
import { UserInfo } from "../../components/user/UserInfo"
import { applicationFee } from "../../constants"
import { money } from "../../helpers/helpers"
import { User, UserApplicationStatus } from "../../Typing.d"

const UserDashboard = ({ props }: { props: PropsWithChildren }) => {
    const router = useRouter()
    return <UserDashboardLayout>
        {({ user, application }: { user: User, application: UserApplicationStatus }) => <>
            <div className="p-2">
                <UserInfo user={user} />
                {application === 'verified' && <UserDashboardProperties />}
                {application === 'nil' && <React.Fragment>
                    <div className="py-4 mt-8 bg-gray-800 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {`You are required to pay a one time non-refundable application fee of ${money(applicationFee)}`}
                            {' '} {'and upload a Valid ID for verification to access Ojarh Properties.'}
                        </div>
                    </div>

                    <div className="m-4 flex justify-center">
                        <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                            onClick={() => router.push('/user/upload-document')}>
                            {'BEGIN PROCCESS'}
                        </div>
                    </div>
                </React.Fragment>}
                {application === 'pending' && <React.Fragment>
                    <div className="py-4 mt-8 bg-gray-800 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {`Your application has been received, you'll be notified via email
                            on the status of your application`}
                        </div>
                    </div>
                    <div className="m-4 flex justify-center">
                        <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                            onClick={() => router.push('/user/application')}>
                            {'LEARN MORE'}
                        </div>
                    </div>
                </React.Fragment>}
                {application === 'rejected' && <React.Fragment>
                    <div className="py-4 mt-8 bg-gray-800 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {'Your application was rejected, you can update your doucment and restart the process with'}
                            <span className="text-red-500">{' NO ADDITIONAL FEE '}</span>
                            {'if you are having problems with your application please contact support'}
                        </div>
                    </div>

                    <div className="m-4 flex justify-center">
                        <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                            onClick={() => router.push('/user/application')}>
                            {'LEARN MORE'}
                        </div>
                    </div>
                </React.Fragment>}
                {application === 'document-required' && <React.Fragment>
                    <div className="py-4 mt-8 bg-gray-800 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {'Your application was not successful due to problem with document upload, please upload a new document,'}
                            {' if you are having problems with your application please contact support as assistance'}
                        </div>
                    </div>

                    <div className="m-4 flex justify-center">
                        <div className="px-4 py-2 bg-red-500 text-sm text-white rounded-full hover:scale-110 duration-300 transition-all ease-in-out cursor-pointer"
                            onClick={() => router.push('/user/application')}>
                            {'UPLOAD NEW DOCUMENT'}
                        </div>
                    </div>
                </React.Fragment>}
            </div>
        </>}
    </UserDashboardLayout>
}

export default UserDashboard