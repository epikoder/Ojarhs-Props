import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Api } from "../../helpers/api";
import { Advert, ApiResponse, Service, Space } from "../../Typing.d";

export const addNewPropertyThunck = createAsyncThunk<ApiResponse | {
    status: 'failed'
    message?: string
    error?: Space
}, Space>
    ("properties/new", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().post<ApiResponse>("/admin/properties/create", JSON.stringify({ ...payload, amount: parseInt(payload.amount.toString()) }))
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }
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

export const addNewServiceThunck = createAsyncThunk<ApiResponse | {
    status: 'failed'
    message?: string
    error?: Space
}, Service>
    ("service/new", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().post<ApiResponse>("/admin/services/create", JSON.stringify({ ...payload, amount: parseInt(payload.amount.toString()) }))
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }
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
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const loadAdminProperties = createAsyncThunk<ApiResponse<Space[]>>
    ("properties/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/properties/all")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            return {
                status: data.status,
                data: data.data
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

export const loadAdminServices = createAsyncThunk<ApiResponse<Service[]>>
    ("services/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/services/all")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const loadAdminAdverts = createAsyncThunk<ApiResponse<Advert[]>>
    ("adverts/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/adverts/all")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })

export const loadApplications = createAsyncThunk<ApiResponse<Advert[]>>
    ("applications/all", async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await Api().get<ApiResponse>("/admin/applications/all")
            if (status !== 200) {
                return rejectWithValue({
                    message: 'Error connecting to server'
                })
            }

            if (data.status === 'failed') {
                return rejectWithValue({
                    message: data.message
                })
            }
            return {
                status: data.status,
                data: data.data
            } as ApiResponse
        } catch (error) {
            const { status, data } = (error as AxiosError<ApiResponse>).response
            switch (status) {
                case 400:
                    return rejectWithValue({
                        message: data.message,
                        error: data.error as unknown as Service
                    })
                default:
                    return rejectWithValue({
                        message: 'Error connecting to server'
                    })
            }
        }
    })