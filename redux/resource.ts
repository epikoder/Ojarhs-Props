import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../helpers/api";
import { ApiResponse } from "../Typing.d";

export const loadPlans = createAsyncThunk<{ name: string }[]>("load/plans", async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await Api().get<ApiResponse<{ name: string }[]>>('/resources/payment-plans')
        if (status !== 200) return rejectWithValue({
            status: 'failed'
        })
        return data.data
    } catch (error) {
        return rejectWithValue({
            status: 'failed'
        })
    }
})

export const loadPropertyTypes = createAsyncThunk<{ name: string }[]>("load/property-types", async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await Api().get<ApiResponse<{ name: string }[]>>('/resources/property-types')
        if (status !== 200) return rejectWithValue({
            status: 'failed'
        })
        return data.data
    } catch (error) {
        return rejectWithValue({
            status: 'failed'
        })
    }
})