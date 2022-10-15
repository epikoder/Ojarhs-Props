import { ReactNode } from "react"
import { User } from "../../Typing"
import { AdminDashboardLayout } from "./AdminDashboardLayout"

const SubAdminDashboardLayout: React.FC<{
    children: (params: { authenticated: boolean, user: User }) => ReactNode
}> = (props) => {
    return <AdminDashboardLayout>
        {(params) => <>
            {
                params.user.roles?.find(r => r === 'super-admin')
                    ?
                    props.children(params)
                    :
                    <div className="h-full w-full">
                        NOT ENOUGH PERMISSION TO ACCESS THIS PAGE
                    </div>
            }
        </>}
    </AdminDashboardLayout>
}

export default SubAdminDashboardLayout