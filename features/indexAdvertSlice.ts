import { createSlice } from "@reduxjs/toolkit";
import List from "helpers/list";
import { loadAdverts } from "../actions";
import { Advert, LoadState } from "../Typing.d";

const indexAdvertSlice = createSlice({
    name: "advertSlice",
    initialState: {
        state: 'nil' as LoadState,
        slider: [] as Advert[],
        middle: [] as Advert[],
        property: [] as Advert[]
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAdverts.pending, (state) => { state.state = 'pending' })
        builder.addCase(loadAdverts.fulfilled, (state, { payload }) => {
            var slider = [] as Advert[]
            var middle = [] as Advert[]
            var property = [] as Advert[]
            payload.forEach((a) => {
                if (a.position == 'slider') {
                    slider = slider.concat(a)
                }
                if (a.position == 'middle') {
                    middle = middle.concat(a)
                }
                if (a.position == 'property') {
                    property = property.concat(a)
                }
            })
            state.slider = List.shuffle(slider)
            state.property = List.shuffle(property)
            state.middle = List.shuffle(middle)
            state.state = 'success'
        })
        builder.addCase(loadAdverts.rejected, (state) => { state.state = 'failed' })
    },
})

export default indexAdvertSlice.reducer