import { createAsyncThunk } from "@reduxjs/toolkit";
import { type } from "os";
import { Service, Space, Testimony } from "../Typing.d";

type indexData = {
    Shops: Space[],
    Office: Space[],
    Warehouse: Space[],
    Services: Service[],
    Testimonials: Testimony[]
}
const loadIndex = () => createAsyncThunk<Promise<indexData>, {}>("", async (payload: {}, { rejectWithValue }) => {
    try {
        const response = await fetch("")
        return {
            Shops: [],
            Office: [],
            Warehouse: [],
            Services: [],
            Testimonials: []
        }
    } catch (error) {
        rejectWithValue({})
    }
})