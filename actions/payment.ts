import { createAsyncThunk } from "@reduxjs/toolkit";

export const makePayment = createAsyncThunk("app/pay", (payload: {}, { rejectWithValue }) => { })