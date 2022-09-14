import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../helpers/api";
import { ApiResponse } from "../../Typing.d";

export const uploadDoc = createAsyncThunk<ApiResponse, {
    reference: string
    document: string
    provider?: string
}>
    ("uploadDoc", async (payload, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().post<ApiResponse>("/user/pay", JSON.stringify(payload))
            return data
        } catch (error) {
            return rejectWithValue({})
        }
    })
