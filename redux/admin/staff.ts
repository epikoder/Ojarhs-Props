import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Api } from "../../helpers/api";
import { ApiResponse, Staff } from "../../Typing";

export const loadStaffs = createAsyncThunk<Staff[]>('admin/staffs-all', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await Api().get('/admin/staffs/all')
        return data.data
    } catch (error) {
        return rejectWithValue({})
    }
})