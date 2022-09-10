import { createSlice } from "@reduxjs/toolkit";
import { searchProperty, searchServices } from "../redux/property";
import { LoadState, Service, Space } from "../Typing.d";

const initialState = {
    property: {
        data: [] as Space[],
        state: 'nil' as LoadState
    },
    service: {
        data: [] as Service[],
        state: 'nil' as LoadState
    }
}
const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchProperty.pending, (state) => {
            state.property.state = 'pending'
        })
        builder.addCase(searchProperty.fulfilled, (state, { payload }) => {
            state.property.state = 'success'
            state.property.data = payload
        })
        builder.addCase(searchProperty.rejected, (state) => {
            state.property.state = 'failed'
        })

        builder.addCase(searchServices.pending, (state) => {
            state.service.state = 'pending'
        })
        builder.addCase(searchServices.fulfilled, (state, { payload }) => {
            state.service.state = 'success'
            state.service.data = payload
        })
        builder.addCase(searchServices.rejected, (state) => {
            state.service.state = 'failed'
        })
    }
})

export default searchSlice.reducer
