import { createSlice } from "@reduxjs/toolkit";

const ServiceSlice = createSlice({
	name: "ServiceSlice",
	initialState: {},
	reducers: {
		addService: (state, action) => {

		},

		deleteService: (state, action) => {

		},

		getService: (state, action) => {

		},

		updateService: (state, action) => {

		}
	},
})

export const { addService, deleteService, updateService, getService } = ServiceSlice.actions;
export default ServiceSlice.reducer;
