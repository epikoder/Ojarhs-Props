import { createSlice } from "@reduxjs/toolkit";
import { loadExpenses } from "../../actions/admin/admin";
import { Expense, LoadState } from "../../Typing";

const initialState: {
    state: LoadState
    data: Expense[]
} = {
    state: 'nil',
    data: []
}
const expenseSlice = createSlice({
    name: "expenseSlice",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadExpenses.pending, state => {
            state.state = 'pending'
        })
        builder.addCase(loadExpenses.fulfilled, (state, { payload }) => {
            state.data = payload
            state.state = 'success'
        })
        builder.addCase(loadExpenses.rejected, state => {
            state.state = 'failed'
        })
    },
})

export default expenseSlice.reducer