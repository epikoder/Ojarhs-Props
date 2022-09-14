import { createSlice } from "@reduxjs/toolkit";
import { addNewPropertyThunck, addNewServiceThunck, loadAdminProperties, loadAdminServices } from "../../redux/admin/admin";
import { store } from "../../store";
import { DashboardDataState, Map, Service, } from "../../Typing.d";

const initialState: DashboardDataState<Service[]> = {
	status: "nil",
	data: [],
}
const serviceSlice = createSlice({
	name: "serviceSlice",
	initialState: initialState,
	reducers: {
		resetServiceState: (state) => {
			state.status = 'nil'
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addNewServiceThunck.pending, (state, { payload }) => {
			state.status = 'pending'
		})
		builder.addCase(addNewServiceThunck.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.message = payload.message;
		})
		builder.addCase(addNewServiceThunck.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.err = (payload as Map).error ?? {}
			state.message = (payload as Map).message ?? undefined
		})

		builder.addCase(loadAdminServices.pending, (state, { payload }) => {
			state.status = 'pending'
		})
		builder.addCase(loadAdminServices.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.data = payload.data;
		})
		builder.addCase(loadAdminServices.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.message = (payload as Map).message ?? undefined
		})
	}
});

export const { resetServiceState } = serviceSlice.actions
export default serviceSlice.reducer;

