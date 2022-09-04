import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const StaffSlice = createSlice({
	name: "StaffSlice",
	initialState: {},
	reducers: {
		addStaff: (state, action) => {

		},

		deleteStaff: (state, action) => {

		},

		getStaff: (state, action) => {

		},

		updateStaff: (state, action) => {

		},
	},
});

export const { addStaff, deleteStaff, updateStaff, getStaff } = StaffSlice.actions;
export default StaffSlice.reducer;
