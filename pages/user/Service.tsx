import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserServices } from "../../components/user/UserServices"

const Page = () => {
    return <UserDashboardLayout className="p-2">
        <h1 className="py-2 text-lg red font-semibold">Services</h1>
        <UserServices />
    </UserDashboardLayout>
}

export default Page