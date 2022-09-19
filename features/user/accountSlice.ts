import { createSlice } from "@reduxjs/toolkit";
import { loadUserAdverts, loadUserProperties, loadUserServices } from "../../redux/user/dashboard";
import { loadUserConversations, loadUserDispute, loadUserReports } from "../../redux/user/message";
import { uploadDoc } from "../../redux/user/uploadDoc";
import { RootState, store } from "../../store";
import { Advert, LoadState, MessageOwner, MessageState, Service, Space } from "../../Typing.d";
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
        message?: string
    },
    adverts: {
        state: LoadState
        data: Advert[]
    },
    message: {
        conversations: MessageState
        disputes: MessageState
        reports: MessageState
    }
}
const initialState: AccountState = {
    properties: {
        state: "success",
        data: []
    },
    services: {
        state: "success",
        data: []
    },
    documentUpload: {
        state: 'nil',
    },
    adverts: {
        state: 'nil',
        data: []
    },
    message: {
        conversations: {
            state: 'nil',
            data: []
        },
        disputes: {
            state: 'nil',
            data: []
        },
        reports: {
            state: 'nil',
            data: []
        }
    }
}
const AccountSlice = createSlice({
    name: 'AccountSlice',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        {/* User Properties */ }
        builder.addCase(loadUserProperties.pending, (state, { payload }) => {
            state.properties.state = 'pending'
        })
        builder.addCase(loadUserProperties.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            state.properties.data = payload as Space[]
            state.properties.state = 'success'
        })
        builder.addCase(loadUserProperties.rejected, (state, { payload }) => { state.properties.state = 'failed' })

        {/* User Services */ }
        builder.addCase(loadUserServices.pending, (state, { payload }) => {
            state.services.state = 'pending'
        })
        builder.addCase(loadUserServices.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            state.services.data = payload as Service[]
            state.services.state = 'success'
        })
        builder.addCase(loadUserServices.rejected, (state, { payload }) => { state.services.state = 'failed' })

        {/* User Advert */ }
        builder.addCase(loadUserAdverts.pending, (state, { payload }) => {
            state.adverts.state = 'pending'
        })
        builder.addCase(loadUserAdverts.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            state.adverts.data = payload as Advert[]
            state.adverts.state = 'success'
        })
        builder.addCase(loadUserAdverts.rejected, (state, { payload }) => { state.adverts.state = 'failed' })

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

        // Messages
        builder.addCase(loadUserConversations.pending, (state) => {
            state.message.conversations.state = 'pending'
        })
        builder.addCase(loadUserConversations.fulfilled, (state, { payload }) => {
            state.message.conversations.state = 'success'
            state.message.conversations.data = payload
        })
        builder.addCase(loadUserConversations.rejected, (state) => {
            state.message.conversations.state = 'failed'
        })

        // Dispute
        builder.addCase(loadUserDispute.pending, (state) => {
            state.message.disputes.state = 'pending'
        })
        builder.addCase(loadUserDispute.fulfilled, (state, { payload }) => {
            state.message.disputes.state = 'success'
            console.log("GOT DISPUTES", payload)
            state.message.disputes.data = payload
        })
        builder.addCase(loadUserDispute.rejected, (state) => {
            state.message.disputes.state = 'failed'
        })

        // Rports
        builder.addCase(loadUserReports.pending, (state) => {
            state.message.reports.state = 'pending'
        })
        builder.addCase(loadUserReports.fulfilled, (state, { payload }) => {
            state.message.reports.state = 'success'
            state.message.reports.data = payload
        })
        builder.addCase(loadUserReports.rejected, (state) => {
            state.message.reports.state = 'failed'
        })
    },
})

export default AccountSlice.reducer