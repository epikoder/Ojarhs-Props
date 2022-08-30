import { createSlice } from "@reduxjs/toolkit";
import { makePayment } from "../redux/payment";
import { LoadState } from "../Typing.d";

type paymenState = {
    locked: boolean
    state: LoadState
}

const paymentSlice = createSlice({
    name: "paymentSlice",
    initialState: {} as paymenState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makePayment.pending, (state, { payload }) => { })
        builder.addCase(makePayment.fulfilled, (state, { payload }) => { })
        builder.addCase(makePayment.rejected, (state, { payload }) => { })
    }
})