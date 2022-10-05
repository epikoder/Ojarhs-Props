import { createSlice } from "@reduxjs/toolkit";
import { loadAdminAdverts } from "../../actions/admin/admin";
import { Advert, DashboardDataState, Map, } from "../../Typing.d";

const initialState: DashboardDataState<Advert[]> = {
	status: "nil",
	data: [],
}
const advertSlice = createSlice({
	name: "advertSlice",
	initialState: initialState,
	reducers: {
		toggleAdvertStatus: (state, { payload, type }: {
			payload: {
				index: number
				approved: boolean
			},
			type: string
		}) => {
			console.log([...state.data], {
				...state, data: state.data.slice(0, payload.index).concat({
					...state.data[payload.index], approved: payload.approved
				}).concat(state.data.slice(payload.index + 1, state.data.length))
			})
			return {
				...state, data: state.data.slice(0, payload.index).concat({
					...state.data[payload.index], approved: payload.approved
				}).concat(state.data.slice(payload.index + 1, state.data.length))
			}
		},
		deleteAdvert: (state, { payload, type }: {
			payload: number,
			type: string
		}) => {
			return {
				...state,
				data: state.data.slice(0, payload).concat(state.data.slice(payload + 1, state.data.length))
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadAdminAdverts.pending, (state, { payload }) => {
			state.status = 'pending'
		})
		builder.addCase(loadAdminAdverts.fulfilled, (state, { payload }) => {
			state.status = 'success'
			state.data = payload.data;
		})
		builder.addCase(loadAdminAdverts.rejected, (state, { payload }) => {
			state.status = 'failed'
			state.message = (payload as Map).message ?? undefined
		})
	}
});

export const { toggleAdvertStatus, deleteAdvert } = advertSlice.actions
export default advertSlice.reducer;

