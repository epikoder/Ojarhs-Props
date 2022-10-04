import { createSlice } from "@reduxjs/toolkit";
import { loadApplications } from "../../actions/admin/admin";
import { LoadState } from "../../Typing.d";

const applicationsSlice = createSlice({
    name: "applicationsSlice",
    initialState: {
        status: 'nil' as LoadState,
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadApplications.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(loadApplications.fulfilled, (state, { payload }) => {
            state.data = payload.data
            state.status = 'success'
        })
        builder.addCase(loadApplications.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default applicationsSlice.reducer