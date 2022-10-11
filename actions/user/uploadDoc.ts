import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Api } from "../../helpers/api";
import { ApiResponse } from "../../Typing";

export const uploadDoc = createAsyncThunk<ApiResponse, {
    reference?: string
    document: string
    provider?: string
    id?:string
}>
    ("uploadDoc", async (payload, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().post<ApiResponse>("/user/pay", JSON.stringify(payload))
            return data
        } catch (error) {
            const res = (error as AxiosError).response
            if (res.status >= 400 && res.status < 500) {
                return res.data as ApiResponse
            }
            return rejectWithValue({})
        }
    })
