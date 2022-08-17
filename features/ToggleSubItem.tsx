import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store"

const initialState = {
	isToggled: false,
};

const ToggleSubItem = createSlice({
	name: "ToggleSubItem",
	initialState,
	reducers: {
		Toggle: (state, action) => {
			state.isToggled = !state.isToggled;
		},
		
	},
});

export const { Toggle } = ToggleSubItem.actions;
export const toggleState = (state: RootState) => state.toggleSubItem.isToggled
export default ToggleSubItem.reducer;
