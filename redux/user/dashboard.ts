import { createAsyncThunk } from "@reduxjs/toolkit";
import { Space } from "../../Typing.d";
import { Api } from "../../helpers/api";

export const loadUserProperties =
    createAsyncThunk<Space[] | undefined, {}>("index/load", async (payload: {}, { rejectWithValue }) => {
        try {
            const { status, data } = await Api().get("/user/properties")
            console.log(data)
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