import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../constants";
import { Api } from "../helpers/api";
import { loginResponse, ApiResponse } from "../Typing.d"

export type rejectValue = {
    status: 'failed'
    message?: string
    error?: { [key: string]: string }
}

export const loginApi =
    createAsyncThunk<ApiResponse<loginResponse> | rejectValue, { email: string, password: string }>("auth/login", async (payload, { rejectWithValue }) => {
        try {
            var response: Response = await fetch(BASEURL + "/auth/login", {
                method: 'POST',
                body: JSON.stringify(payload),
                credentials: 'include'
            })
            switch (response.status) {
                case 400:
                    console.log(400)
                    let data = await response.json() as ApiResponse
                    let ee = {} as { email: string, password: string }
                    for (let n in data.error) {
                        ee[n] = data.error[n]
                    }
                    return rejectWithValue({
                        status: 'failed',
                        error: ee
                    })
                case 401:
                    console.log(401)
                    let _data = await response.json()
                    console.log(_data);

                    return rejectWithValue({
                        ..._data
                    })
                case 200:
                    console.log(200)
                    let __data = await response.json() as ApiResponse<loginResponse>
                    if (__data.status === 'failed') return {
                        status: 'failed',
                        message: __data.message
                    }
                    return {
                        status: 'success',
                        data: __data.data as loginResponse,
                        message: __data.message
                    }
                default:
                    return rejectWithValue({
                        status: 'failed',
                        message: 'Error connecting to server'
                    })
            }
        } catch (error) {
            console.log(error)
            rejectWithValue({
                status: 'failed',
                message: 'Error connecting to server'
            })
        }
    })

export const checkAuthApi = createAsyncThunk<Promise<ApiResponse<loginResponse>>, {}>("", async (payload: {}, { rejectWithValue }) => {
    try {
        const response = await fetch("")
        return {} as ApiResponse<loginResponse>
    } catch (error) {
        rejectWithValue({})
    }
})