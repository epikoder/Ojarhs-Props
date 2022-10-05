import { createSlice } from "@reduxjs/toolkit";
import { createAdminMessage, loadAdminConverstion, loadAdminDisputes, loadAdminReports } from "../../redux/admin/admin";
import { LoadState, Message, MessageOwner, MessageState } from "../../Typing.d";

const initialState: MessageState = {
    state: 'nil',
    data: []
}

const messageSlice = createSlice({
    name: "messageSlice",
    initialState: initialState,
    reducers: {
        resetMessageState: (state) => { state.state = 'nil' }
    },
    extraReducers(builder) {
        builder.addCase(loadAdminConverstion.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(loadAdminConverstion.fulfilled, (state, { payload }) => {
            state.state = 'success'
            state.data = payload
        })
        builder.addCase(loadAdminConverstion.rejected, (state) => {
            state.state = 'failed'
        })

        // DISPUTES
        builder.addCase(loadAdminDisputes.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(loadAdminDisputes.fulfilled, (state, { payload }) => {
            state.state = 'success'
            state.data = payload
        })
        builder.addCase(loadAdminDisputes.rejected, (state) => {
            state.state = 'failed'
        })

        // REPORT
        builder.addCase(loadAdminReports.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(loadAdminReports.fulfilled, (state, { payload }) => {
            state.state = 'success'
            state.data = payload
        })
        builder.addCase(loadAdminReports.rejected, (state) => {
            state.state = 'failed'
        })


        // CREATE
        builder.addCase(createAdminMessage.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(createAdminMessage.fulfilled, (state, { payload }) => {
            state.state = 'success'
        })
        builder.addCase(createAdminMessage.rejected, (state) => {
            state.state = 'failed'
        })
    },
})

export const { resetMessageState } = messageSlice.actions
export default messageSlice.reducer