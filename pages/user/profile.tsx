import { Card, Paper } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { Info } from "../../components/Info"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { UserInfo } from "../../components/user/UserInfo"
import { loadNextOfKin } from "../../actions/auth"
import { RootState, useAppDispatch } from "../../store"
import { User, UserApplicationStatus } from "../../Typing.d"

const NextOfKin = () => {
    const { state, data } = useSelector((store: RootState) => store.authSlice.nextOfKin)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (data === undefined && state !== 'pending' || state === 'nil') {
            dispatch(loadNextOfKin())
        }
    }, [])
    console.log("NEXT OF KIN", state, data !== undefined)
    return <React.Fragment>
        {state === 'pending' && <div></div>}
        {state === 'success' &&
            <div>
                <div className="text-sm uppercase p-2">
                    {'Next Of Kin'}
                </div>
                <div className="md:grid grid-cols-2 gap-2">
                    {data.map((n, i) => <div key={i} className='my-1 space-y-2'>
                        <Info title="First Name" value={n.kfname} />
                        <Info title="Last Name" value={n.klname} />
                        <Info title="Email" value={n.kemail} />
                        <Info title="Phone" value={n.kphone} />
                        <Info title="Address" value={n.kaddress} />
                        <Info title="L.G.A" value={n.klga} />
                        <Info title="State" value={n.kstate} />
                        <Info title="Country" value={n.kcountry} />
                    </div>)}
                </div>
            </div>}
        {state === 'failed' && <div className="text-gray-500">
            {'Could not load next of kin information'}
        </div>}
    </React.Fragment>
}

const Profile = () => {
    return <UserDashboardLayout>
        {({ user, application }: { user: User, application: UserApplicationStatus }) => <>
            <div className="p-2 md:my-2 rounded-md w-full">
                <UserInfo user={user} />
                <div className="flex justify-center">
                    <div className="space-y-2 my-2 max-w-screen-lg w-full">
                        <Info title="Reference No." value={user.reference} />
                        <div className="text-sm uppercase">
                            {'Guarantor Information'}
                        </div>
                        <Info title="Guarantor Name" value={user.guarantor_name} />
                        <Info title="Guarantor Phone" value={user.guarantor_phone} />
                        <Info title="Guarantor Address" value={user.guarantor_address} />
                        <NextOfKin />
                    </div>
                </div>
            </div>
        </>}
    </UserDashboardLayout>
}
export default Profile 