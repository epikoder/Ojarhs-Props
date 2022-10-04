import { createSlice } from "@reduxjs/toolkit";
import { loadAdminPackoutRequest } from "../../actions/admin/admin";
import { DashboardDataState, LoadState, PackoutRequest } from "../../Typing";

const initialState: {
    state: LoadState
    data: PackoutRequest[]
} = {
    state: 'nil',
    data: []
}
const packoutSlice = createSlice({
    name: "packoutSlice",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAdminPackoutRequest.pending, (state) => { state.state = 'pending' })
        builder.addCase(loadAdminPackoutRequest.fulfilled, (state, { payload }) => {
            state.data = payload
            state.state = 'success'
        })
        builder.addCase(loadAdminPackoutRequest.rejected, (state) => { state.state = 'failed' })
    },
})

export default packoutSlice.reducer
