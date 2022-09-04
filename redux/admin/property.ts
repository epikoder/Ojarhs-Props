import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Api } from "../../helpers/api";
import { ApiResponse, Space } from "../../Typing.d";

export const addNewPropertyThunck = createAsyncThunk<ApiResponse | {
    status: 'failed'
    message?: string
    error?: Space
}, Space>
    ("properties/new", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().post<ApiResponse>("/admin/properties/create", JSON.stringify({ ...payload, amount: parseInt(payload.amount.toString()) }))
            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            return {
                status: data.status,
                message: data.message
            } as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Space
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })