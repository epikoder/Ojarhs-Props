import { Button, Card } from "@mui/material"
import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserDashboardProperties } from "../../components/user/UserDashboardProperties"
import { UserInfo } from "../../components/user/UserInfo"
import { applicationFee } from "../../constants"
import { money } from "../../helpers/helpers"

const UserDashboard = ({ props }: { props: PropsWithChildren }) => {
    const router = useRouter()
    return <UserDashboardLayout>
        {({ user, application }) => <>
            <div className="p-2">
                <UserInfo user={user} />
                {application === 'verified' && <UserDashboardProperties />}
                {application === 'nil' && <React.Fragment>
                    <Card className="py-4 mt-8  px-2 text-sm rounded-md text-white text-center">
                        <div className="text-red-500">NOTICE</div>
                        <div className="lg:mx-12">
                            {`You are required to pay a one time non-refundable application fee of ${money(applicationFee)}`}
                            {' '} {'and upload a Valid ID for verification to access Ojarh Properties.'}
                        </div>
                    </Card>

                    <div className="m-4 flex justify-center">
                        <Button
                            variant='outlined'
                            onClick={() => router.push('/user/upload-document')}>
                            {'BEGIN PROCCESS'}
                        </Button>
                    </div>
                </React.Fragment>}
                {application === 'pending' && <React.Fragment>
                    <Card className="py-4 mt-8 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {`Your application has been received, you'll be notified via email
                            on the status of your application`}
                        </div>
                    </Card>
                    <div className="m-4 flex justify-center">
                        <Button variant="outlined"
                            onClick={() => router.push('/user/application')}>
                            {'LEARN MORE'}
                        </Button>
                    </div>
                </React.Fragment>}
                {application === 'rejected' && <React.Fragment>
                    <Card className="py-4 mt-8 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {'Your application was rejected, click the button to learn more and update your application. '}
                            {'if you are having problems with your application please contact support'}
                        </div>
                    </Card>
                    <div className="m-4 flex justify-center">
                        <Button variant="outlined"
                            onClick={() => router.push('/user/application')}>
                            {'LEARN MORE'}
                        </Button>
                    </div>
                </React.Fragment>}
                {application === 'document-required' && <React.Fragment>
                    <Card className="py-4 mt-8 px-2 text-sm rounded-md text-white text-center">
                        <h6 className="text-red-500">NOTICE</h6>
                        <div className="lg:mx-12">
                            {'Your application was not successful due to problem with the document uploaded, please upload a new document to continue your application,'}
                            {' if you are having problems with your application please contact support as assistance'}
                        </div>
                    </Card>

                    <div className="m-4 flex justify-center">
                        <Button variant="outlined"
                            onClick={() => router.push('/user/application')}>
                            {'UPLOAD NEW DOCUMENT'}
                        </Button>
                    </div>
                </React.Fragment>}
            </div>
        </>
        }
    </UserDashboardLayout >
}

export default UserDashboard