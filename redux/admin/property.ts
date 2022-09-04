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
            const { data, status } = await Api().post("/admin/properties/create", JSON.stringify(payload))

            return {} as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        status: 'failed',
                        message: data.message,
                        error: data.error as unknown as Space
                    })
                default:
                    return rejectWithValue({
                        status: 'failed',
                        message: 'Error connecting to server'
                    })
            }
        }
    })