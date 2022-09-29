import { createSlice } from "@reduxjs/toolkit";
import { loadRecord, RecordData } from "../../redux/admin/record";
import { LoadState } from "../../Typing";

const initialState: { state: LoadState, data: RecordData } = {
    state: 'nil',
    data: {
        advert: {
            active: 0,
            approved: 0,
            total: 0,
            unapproved: 0
        },
        invoice: 0,
        receipt: 0,
        rent: {
            amount: 0,
            total: 0
        },
        space: new Map(),
        tenant: 0,
        staff: 0
    }
}

const recordSlice = createSlice({
    name: 'recordSlice',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadRecord.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(loadRecord.fulfilled, (state, { payload }) => {
            state.data = payload
            state.state = 'success'
        })
        builder.addCase(loadRecord.rejected, (state) => {
            state.state = 'failed'
        })
    },
})

export default recordSlice.reducer