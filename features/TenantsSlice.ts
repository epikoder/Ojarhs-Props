import { createSlice } from "@reduxjs/toolkit";
import { loadAllTenants } from "../redux/admin/tenant";
import { LoadState, Tenant } from "../Typing.d";

type STATE = {
	status: LoadState
	data: Tenant[]
}

const initialState: STATE = {
	status: 'nil',
	data: []
}

const TenantsSlice = createSlice({
	name: "TenantsSlice",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(loadAllTenants.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(loadAllTenants.fulfilled, (state, { payload }) => {
			state.data = payload
			state.status = 'success'
		})
		builder.addCase(loadAllTenants.rejected, (state) => {
			state.status = 'failed'
		})
	},
});

export default TenantsSlice.reducer;
