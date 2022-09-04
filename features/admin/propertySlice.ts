import { createSlice } from "@reduxjs/toolkit";
import { addNewPropertyThunck } from "../../redux/admin/property";
import { DashboardDataState, Map, Space } from "../../Typing.d";

const propertySlice = createSlice({
	name: "propertySlice",
	initialState: {
		data: []
	} as DashboardDataState<Space[]>,
	reducers: {
		addProperty: (state, { payload }) => {
		},

		deleteProperty: (state, { payload }) => {
		},

		getProperty: (state, { payload }) => {
		},

		updateProperty: (state, { payload }) => {
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addNewPropertyThunck.pending, (state, { payload }) => {
			state.status = 'pending'
		})
		builder.addCase(addNewPropertyThunck.fulfilled, (state, { payload }) => {
			state.status = 'success'
		})
		builder.addCase(addNewPropertyThunck.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.err = (payload as { error: Map }).error
		})
	}
});

export const { addProperty, deleteProperty, updateProperty, getProperty } = propertySlice.actions;
export default propertySlice.reducer;

