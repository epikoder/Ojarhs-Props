import { createSlice } from "@reduxjs/toolkit";
import { loadUserProperties, loadUserServices } from "../../redux/user/dashboard";
import { RootState } from "../../store";
import { LoadState, Service, Space } from "../../Typing.d";

type AccountState = {
    properties: {
        state: LoadState
        data: Space[]
    }
    services: {
        state: LoadState
        data: Service[]
    }
}
const AccountSlice = createSlice({
    name: 'AccountSlice',
    initialState: {
        properties: {
            state: "success"
        },
        services: {
            state: "success"
        }
    } as AccountState,
    reducers: {},
    extraReducers(builder) {
        {/* User Properties */ }
        builder.addCase(loadUserProperties.pending, (state, { payload }) => {
            state.properties.state = 'pending'
        })
        builder.addCase(loadUserProperties.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            state.properties.state = 'success'
            state.properties.data = payload as Space[]
        })
        builder.addCase(loadUserProperties.rejected, (state, { payload }) => { state.properties.state = 'failed' })

        {/* User Services */ }
        builder.addCase(loadUserServices.pending, (state, { payload }) => {
            state.services.state = 'pending'
        })
        builder.addCase(loadUserServices.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            state.services.state = 'success'
            state.services.data = payload as Service[]
        })
        builder.addCase(loadUserServices.rejected, (state, { payload }) => { state.services.state = 'failed' })
    },
})

export const accountState = (store: RootState) => store.accountSlice
export default AccountSlice.reducer