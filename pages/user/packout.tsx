import { MenuItem, Select } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { UserDashboardLayout } from "../../components/user/UserDashboardLayout"
import { money } from "../../helpers/helpers"
import { loadUserProperties } from "../../redux/user/dashboard"
import { RootState, useAppDispatch } from "../../store"

const Page = () => {
    const { state, data } = useSelector((store: RootState) => store.accountSlice.properties)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(loadUserProperties({}))
    }, [])

    return <UserDashboardLayout>
        {() => <>
            <div className="min-h-[20vh] p-2">
                <div className="font-semibold">
                    Request Pack Out
                </div>
                <div className="my-4 max-w-2xl" style={{ height: 400 }}>
                    {state === 'success' && data !== undefined &&
                        <Select className="w-full" size="small">
                            {data.map((p, i) => <MenuItem key={i} value={p.slug}>
                                {p.name} {'  -  '} {money(p.amount)} {'  -  '} {p.type}
                            </MenuItem>)}
                        </Select>}
                </div>
            </div>
        </>}
    </UserDashboardLayout>
}

export default Page
