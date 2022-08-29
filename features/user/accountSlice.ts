import { createSlice } from "@reduxjs/toolkit";
import { loadUserProperties } from "../../redux/user/dashboard";
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
    name: 'DashboardSlice',
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
        builder.addCase(loadUserProperties.pending, (state, { payload }) => {
            state.properties.state = 'pending'
        })
        builder.addCase(loadUserProperties.fulfilled, (state, { payload }) => {
            state.properties.data = payload as Space[]
            state.properties.state = 'success'
        })
        builder.addCase(loadUserProperties.rejected, (state, { payload }) => { })
    },
})

export default AccountSlice.reducer