import { createSlice } from "@reduxjs/toolkit";
import { loadUserProperties, loadUserServices } from "../../redux/user/dashboard";
import { uploadDoc } from "../../redux/user/uploadDoc";
import { RootState, store } from "../../store";
import { LoadState, Service, Space } from "../../Typing.d";
import { checkIsAuthenticated } from "../authSlice";

type AccountState = {
    properties: {
        state: LoadState
        data: Space[]
    }
    services: {
        state: LoadState
        data: Service[]
    },
    documentUpload: {
        state: LoadState
        message: string
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
        },
        documentUpload: {
            state: 'nil'
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

        {/*Document Upload */ }
        builder.addCase(uploadDoc.pending, (state) => {
            state.documentUpload.state = 'pending'
        })
        builder.addCase(uploadDoc.fulfilled, (state, { payload }) => {
            state.documentUpload.state = 'success'
            state.documentUpload.message = payload.message
        })
        builder.addCase(uploadDoc.rejected, (state) => {
            state.documentUpload.state = 'failed'
            state.documentUpload.message = 'Error processing your application'
        })
    },
})

export const accountState = (store: RootState) => store.accountSlice
export default AccountSlice.reducer