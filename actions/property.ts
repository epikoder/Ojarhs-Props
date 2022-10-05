import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../helpers/api";
import { fixSpace } from "../helpers/helpers";
import { ApiResponse, Service, Space } from "../Typing";

export const loadProperty = createAsyncThunk<Space, string>("load/property-item", async (payload: string, { rejectWithValue }) => {
    try {
        const { data } = await Api().get<ApiResponse<Space>>(`/property/${payload}`)
        return data.data
    } catch (error) {
        return rejectWithValue(404)
    }
})

export const searchProperty = createAsyncThunk<Space[], string>("search/property", async (payload: string, { rejectWithValue }) => {
    try {
        const { data } = await Api().get<ApiResponse<Space[]>>(`/property?${payload}`)
        return data.data.map((s) => fixSpace(s))
    } catch (error) {
        return rejectWithValue(404)
    }
})

export const loadService = createAsyncThunk<Service, string>("load/service-item", async (payload: string, { rejectWithValue }) => {
    try {
        const { data } = await Api().get<ApiResponse<Service>>(`/property/${payload}`)
        return {
            ...data.data, type: 'service'
        }
    } catch (error) {
        return rejectWithValue(404)
    }
})

export const searchServices = createAsyncThunk<Service[], string>("search/service", async (payload: string, { rejectWithValue }) => {
    try {
        const { data } = await Api().get<ApiResponse<Service[]>>(`/service?${payload}`)
        return data.data.map(s => ({ ...s, type: 'service' }))
    } catch (error) {
        return rejectWithValue(404)
    }
})