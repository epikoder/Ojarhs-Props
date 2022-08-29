import { createSlice } from "@reduxjs/toolkit";
import { indexData, loadIndex } from "../redux";
import { LoadState } from "../Typing.d";

export type indexState = {
    data: indexData
    state: LoadState
}
const IndexSlice = createSlice({
    name: "IndexSlice",
    initialState: {} as indexState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadIndex.fulfilled, (state, { payload }) => {
            if (payload === undefined) {
                state.state = 'failed'
                return
            }
            if (payload.status === 'failed') {
                state.state = 'failed'
                return
            }
            if (payload.status === undefined) return
            state.data = payload as indexData
            state.state = 'success'
        })
        builder.addCase(loadIndex.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(loadIndex.rejected, (state) => {
            state.state = 'failed'
        })
    },
})

export default IndexSlice.reducer