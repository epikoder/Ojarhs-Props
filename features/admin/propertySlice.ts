import { createSlice } from "@reduxjs/toolkit";
import { addNewPropertyThunck, loadAdminProperties } from "../../redux/admin/admin";
import { store } from "../../store";
import { DashboardDataState, Map, Space } from "../../Typing.d";

const initialState: DashboardDataState<Space[]> = {
	status: "nil",
	data: [],
}
const propertySlice = createSlice({
	name: "propertySlice",
	initialState: initialState,
	reducers: {
		addProperty: (state) => {
		},

		deleteProperty: (state, { payload }) => {
		},

		getProperty: (state, { payload }) => {
		},

		updateProperty: (state) => {
		},
		toggleProperyStatus: (state, { payload, type }: {
			payload: {
				index: number
				status: 'open' | 'occupied'
			},
			type: string
		}) => {
			return {
				...state, data: state.data.slice(0, payload.index).concat({
					...state.data[payload.index], status: payload.status
				}).concat(state.data.slice(payload.index + 1, state.data.length))
			}
		},
		resetPropertyState: (state) => {
			state.status = 'nil'

		}
	},
	extraReducers: (builder) => {
		builder.addCase(addNewPropertyThunck.pending, (state, { payload }) => {
			state.status = 'pending'
		})
		builder.addCase(addNewPropertyThunck.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.message = payload.message;
		})
		builder.addCase(addNewPropertyThunck.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.err = (payload as Map).error ?? {}
			state.message = (payload as Map).message ?? undefined
		})

		builder.addCase(loadAdminProperties.pending, (state, { payload }) => {
			state.status = 'pending'
		})
		builder.addCase(loadAdminProperties.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.data = payload.data;
		})
		builder.addCase(loadAdminProperties.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.message = (payload as Map).message ?? undefined
		})
	}
});

export const { addProperty, deleteProperty, updateProperty, getProperty, resetPropertyState, toggleProperyStatus } = propertySlice.actions;
export default propertySlice.reducer;

