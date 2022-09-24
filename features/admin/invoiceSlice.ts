import { createSlice } from "@reduxjs/toolkit";
import { loadInvoices } from "../../redux/admin/admin";
import { Invoice, LoadState } from "../../Typing";

const initialState: {
    state: LoadState
    data: Invoice[]
} = {
    state: 'nil',
    data: []
}
const invoiceSlice = createSlice({
    name: "invoiceSlice",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadInvoices.pending, (state) => {
            state.state = 'pending'
        })
        builder.addCase(loadInvoices.fulfilled, (state, { payload }) => {
            state.state = 'success'
            state.data = payload
        })
        builder.addCase(loadInvoices.rejected, (state) => {
            state.state = 'failed'
        })
    },
})
export default invoiceSlice.reducer