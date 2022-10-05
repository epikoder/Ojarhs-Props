import { createSlice } from "@reduxjs/toolkit";
import { fixSpace } from "../helpers/helpers";
import { loadProperty } from "../actions/property";
import { LoadState, Space } from "../Typing.d";

const initialState = {
    status: 'nil' as LoadState,
    data: {} as Space
}
const propertyDetailSlice = createSlice({
    name: 'propertyDetailSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loadProperty.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(loadProperty.fulfilled, (state, { payload }) => {
            state.status = 'success'
            state.data = fixSpace(payload)
        })
        builder.addCase(loadProperty.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default propertyDetailSlice.reducer