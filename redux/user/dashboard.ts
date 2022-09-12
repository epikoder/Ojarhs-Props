import { createAsyncThunk } from "@reduxjs/toolkit";
import { Advert, Service, Space } from "../../Typing.d";
import { Api } from "../../helpers/api";

export const loadUserProperties =
    createAsyncThunk<Space[] | undefined, {}>("user/properties", async (payload: {}, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/properties")
            if (status !== 200) {
                return rejectWithValue({
                    status: "failed"
                })
            }
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })
            return data.data as Space[]
        } catch (error) {
            rejectWithValue({
                status: "failed"
            })
        }
    })

export const loadUserServices =
    createAsyncThunk<Service[] | undefined, {}>("user/services", async (payload: {}, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/services")
            if (status !== 200) {
                return rejectWithValue({
                    status: "failed"
                })
            }
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })
            return data.data as Service[]
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })

export const loadUserAdverts =
    createAsyncThunk<Advert[] | undefined, {}>("user/adverts", async (payload: {}, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/adverts")
            if (status !== 200) {
                return rejectWithValue({
                    status: "failed"
                })
            }
            if (data.status === 'failed') return rejectWithValue({ status: 'failed' })
            return data.data as Advert[]
        } catch (error) {
            return rejectWithValue({
                status: "failed"
            })
        }
    })