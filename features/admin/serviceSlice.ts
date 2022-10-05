import { createSlice } from "@reduxjs/toolkit";
import List from "../../helpers/list";
import { addNewPropertyThunck, addNewServiceThunck, deleteServiceAsync, loadAdminProperties, loadAdminServices } from "../../actions/admin/admin";
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
		deleteService: (_, { payload }: { payload: string }) => {
			setTimeout(() => { store.dispatch(deleteServiceAsync(payload)) }, 300)
		},
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

		builder.addCase(deleteServiceAsync.fulfilled, (state, { payload }) => {
			let index: number
			state.data.forEach((s, i) => {
				if (s.slug === payload) {
					index = i
				}
			})
			state.data = List.remove<Service>(state.data, index)
		})
	}
});

export const { resetServiceState, deleteService } = serviceSlice.actions
export default serviceSlice.reducer;

