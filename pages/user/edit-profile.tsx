import { Button, TextField } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { FormCountryInput, FormPhoneInput } from "../../components/FormInput"
import { ImageUpload } from "../../components/ImageUpload"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { resolveFilePath } from "../../helpers/helpers"
import { updateUserProfile } from "../../actions/user/dashboard"
import { RootState, useAppDispatch } from "../../store"
import { User, UserUpdateForm } from "../../Typing.d"

const Page = () => {
    const { user, profileUpdate } = useSelector((store: RootState) => store.authSlice)
    const [form, setForm] = React.useState({} as UserUpdateForm)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (user !== undefined) {
            setForm({
                fname: user.fname,
                lname: user.lname,
                phone: user.phone,
                address: user.address,
                lga: user.lga,
                state: user.state,
                country: user.country,
                photo: undefined
            })
            console.log("form changed")
        }
    }, [user])

    const update = () => {
        dispatch(updateUserProfile({
            ...form,
            country: user.country === form.country ? '' : form.country
        }))
    }

    return <UserDashboardLayout>
        {({ user }: { user: User }) =>
            <React.Fragment>
                <form className="p-4 max-w-sm">
                    <div>
                        <ImageUpload value={user.photo}
                            handleUpload={(s) => setForm({ ...form, photo: s })} />
                        <span className="text-sm">PROPFILE PHOTO</span>
                    </div>
                    {form.country !== undefined && <div className="space-y-2 my-2">
                        <TextField
                            name="fname"
                            label='First Name'
                            size="small"
                            defaultValue={form.fname}
                            className="max-w-lg w-full"
                            onChange={(e) => setForm({ ...form, fname: e.target.value })}
                        />
                        <TextField
                            name="lname"
                            label='Last Name'
                            size="small"
                            defaultValue={form.lname}
                            className="max-w-lg w-full"
                            onChange={(e) => setForm({ ...form, lname: e.target.value })}
                        />
                        <TextField
                            name="phone"
                            label='Phone'
                            size="small"
                            defaultValue={form.phone}
                            className="max-w-lg w-full"
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <TextField
                            name="address"
                            label='Address'
                            size="small"
                            defaultValue={form.address}
                            className="max-w-lg w-full"
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                        <TextField
                            name="lga"
                            label='LGA'
                            size="small"
                            defaultValue={form.lga}
                            className="max-w-lg w-full"
                            onChange={(e) => setForm({ ...form, lga: e.target.value })}
                        />
                        <TextField
                            name="state"
                            label='State'
                            size="small"
                            defaultValue={form.state}
                            className="max-w-lg w-full"
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                        />
                        <FormCountryInput props={{
                            title: 'Country',
                            value: form.country,
                            handleChange: (s) => {
                                setForm({ ...form, country: s as unknown as string })
                            },
                        }} />
                        <div className="text-center max-w-lg w-full">
                            <div className={`text-${profileUpdate.state === 'success' ? 'blue' : 'red'}-500`}>
                                {profileUpdate.message}
                            </div>
                        </div>
                        <div className="max-w-lg w-full flex justify-end">
                            <Button
                                variant='outlined'
                                size="small"
                                disabled={profileUpdate.state === 'pending'}
                                onClick={update}
                            >
                                UPADTE
                            </Button>
                        </div>
                    </div>}
                </form>
            </React.Fragment>
        }
    </UserDashboardLayout>
}

export default Page