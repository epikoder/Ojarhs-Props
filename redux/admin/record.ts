import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../helpers/api";
import { ApiResponse, LoadState } from "../../Typing";

type SpaceReport = {
    total: number,
    open: number,
    occupied: number
}
export type RecordData = {
    space: Map<string, SpaceReport>
    advert: {
        total: number
        approved: number
        unapproved: number
        active: number
    }
    rent: {
        total: number
        amount: number
    }
    tenant: number
    invoice: number
    receipt: number
    staff: number
}

export const loadRecord = createAsyncThunk<RecordData>('admin/records', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await Api().get<ApiResponse<RecordData>>('/admin/records')
        return data.data
    } catch (error) {
        return rejectWithValue({})
    }
})