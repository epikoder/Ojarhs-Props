import { createSlice } from "@reduxjs/toolkit";
import { loadStaffs } from "../../actions/admin/staff";
import { LoadState, Staff } from "../../Typing";

const initialState: {
    state: LoadState
    data: Staff[]
} = {
    state: 'nil',
    data: []
}
const staffSlice = createSlice({
    name: "staffSlice",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadStaffs.pending, state => { state.state = 'pending' })
        builder.addCase(loadStaffs.fulfilled, (state, { payload }) => {
            state.data = payload
            state.state = 'success'
        })
        builder.addCase(loadStaffs.rejected, state => { state.state = 'failed' })
    }
})

export default staffSlice.reducer