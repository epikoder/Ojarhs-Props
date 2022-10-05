import { createSlice } from "@reduxjs/toolkit";
import { indexData, loadIndex, loadNotice } from "../redux";
import { LoadState, Notice } from "../Typing.d";

type noticeState = { data: Notice[], state: LoadState }
export type indexState = {
    data: indexData
    state: LoadState
    notice?: noticeState
}
const IndexSlice = createSlice({
    name: "IndexSlice",
    initialState: {
        notice: {
            data: [],
            state: 'nil'
        }
    } as indexState,
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

        builder.addCase(loadNotice.pending, (state) => {
            state.notice.state = 'pending'
        })
        builder.addCase(loadNotice.fulfilled, (state, { payload }) => {
            state.notice.data = payload
            state.notice.state = 'success'
        })
        builder.addCase(loadNotice.rejected, (state) => {
            state.notice.state = 'failed'
        })
    },
})

export default IndexSlice.reducer