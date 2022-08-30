import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../helpers/api";

export const uploadDoc = createAsyncThunk("uploadDoc", async (payload: {
    reference: string
    document: string
    provider?: string
}, { rejectWithValue }) => {
    try {
        let response = await Api().post("/user/pay", JSON.stringify(payload))
        console.log(response)
    } catch (error) {
        console.log(error)
    }
})
