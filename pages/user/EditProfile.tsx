import React from "react"
import { FormPhoneInput } from "../../components/FormInput"
import { ImageUpload } from "../../components/ImageUpload"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { resolveImagePath } from "../../helpers/helpers"

const Page = () => {
    const [phone, setPhone] = React.useState('')
    return <UserDashboardLayout>
        {({ user }) =>
            <React.Fragment>
                <form className="p-4 max-w-sm">
                    <div>
                        <ImageUpload value={resolveImagePath(user.photo)} />
                        <span className="text-sm">PROPFILE PHOTO</span>
                    </div>
                    <FormPhoneInput props={{
                        title: 'Phone',
                        type: 'number',
                        name: 'phone',
                        handleChange: (s: string) => setPhone(s)
                    }} />
                </form>
            </React.Fragment>
        }
    </UserDashboardLayout>
}

export default Page