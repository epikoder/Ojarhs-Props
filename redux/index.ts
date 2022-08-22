import { createAsyncThunk } from "@reduxjs/toolkit";
import { Space, Testimony } from "../Typing.d";

interface indexData {
    Shops: Space,
    Office: Space,
    Warehouse: Space,
    Services: ServiceWorker,
    Testimonials: Testimony
}
const loadIndex = () => createAsyncThunk<Promise<indexData>, {}>("", async (payload: {}, { rejectWithValue }) => {
    try {
        const response = await fetch("")
    } catch (error) {
        
    }
})