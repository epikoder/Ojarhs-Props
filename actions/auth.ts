import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../constants";
import { Api } from "../helpers/api";
import { loginResponse, ApiResponse, UserApplicationStatus, NextOfKin, NextOfKinApi } from "../Typing"

export type rejectValue = {
    status: 'failed'
    message?: string
    error?: { [key: string]: string }
}

export const loginApi =
    createAsyncThunk<ApiResponse<loginResponse, { application: UserApplicationStatus }> | rejectValue, { email: string, password: string }>("auth/login", async (payload, { rejectWithValue }) => {
        try {
            var response: Response = await fetch(BASEURL + "/auth/login", {
                method: 'POST',
                body: JSON.stringify({ ...payload, remember: localStorage.getItem('persist_auth') || 'false' }),
                credentials: 'include'
            })
            switch (response.status) {
                case 400:
                    let data = await response.json() as ApiResponse
                    return rejectWithValue({
                        status: 'failed',
                        message: 'invalid username or password'
                    })
                case 401:
                    let _data = await response.json()
                    return rejectWithValue({
                        status: 'failed',
                        message: _data.message
                    })
                case 200:
                    let __data = await response.json() as ApiResponse<loginResponse>
                    if (__data.status === 'failed') return {
                        status: 'failed',
                        message: __data.message
                    }
                    return {
                        status: 'success',
                        data: __data.data as loginResponse,
                        message: __data.message,
                        extra: __data.extra
                    }
                default:
                    return rejectWithValue({
                        status: 'failed',
                        message: 'Error connecting to server'
                    })
            }
        } catch (error) {
            return rejectWithValue({
                status: 'failed',
                message: 'Error connecting to server'
            })
        }
    })

export const loginAdminApi =
    createAsyncThunk<ApiResponse<loginResponse> | rejectValue, { email: string, password: string }>("admin/login", async (payload, { rejectWithValue }) => {
        try {
            var response: Response = await fetch(BASEURL + "/admin", {
                method: 'POST',
                body: JSON.stringify({ ...payload, remember: localStorage.getItem('persist_auth') || 'false' }),
                credentials: 'include'
            })
            switch (response.status) {
                case 400:
                    let data = await response.json() as ApiResponse
                    return rejectWithValue({
                        status: 'failed',
                        message: 'invalid username or password'
                    })
                case 401:
                    let _data = await response.json()
                    return rejectWithValue({
                        status: 'failed',
                        message: _data.message
                    })
                case 200:
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
            return rejectWithValue({
                status: 'failed',
                message: 'Error connecting to server'
            })
        }
    })


export const loadNextOfKin = createAsyncThunk<NextOfKin[]>("load/nextofkin", async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await Api().get<ApiResponse<NextOfKinApi[]>>("/user/next_of_kin")
        if (status !== 200) return rejectWithValue({})
        return data.data.map((n) => ({
            kfname: n.fname,
            klname: n.lname,
            kaddress: n.address,
            kcountry: n.country,
            kemail: n.email,
            klga: n.lga,
            kphone: n.phone,
            kstate: n.state
        } as NextOfKin))
    } catch (error) {
        return rejectWithValue({})
    }
})