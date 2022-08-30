import React from "react"
import { useSelector } from "react-redux"
import { FormInput, FormPhoneInput } from "../../components/FormInput"
import { ImageUpload } from "../../components/ImageUpload"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { resolveImagePath } from "../../helpers/helpers"
import { RootState } from "../../store"

const Page = () => {
    const [phone, setPhone] = React.useState('')
    const { user, authenticated } = useSelector((store: RootState) => store.authSlice)
    return <UserDashboardLayout>
        {(authenticated && user !== undefined) &&
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