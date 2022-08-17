import { createSlice } from "@reduxjs/toolkit";
import { TenantsDetails } from "../Data";
import { RootState } from "../store";
const getTenant = typeof window !== "undefined";

console.log(TenantsDetails);

const getInitialTenants = () => {
	const tenantsList = window.localStorage.getItem("tenantsList");

	if (tenantsList) {
		console.log(tenantsList + "windows");

		return JSON.parse(tenantsList);
	}

	window.localStorage.setItem("tenantsList", JSON.stringify([]));
	return TenantsDetails;
};

const initialValue = {
	tenantsList: getTenant ? getInitialTenants() : [],
	getindividaulTenant: {},
};

const TenantsSlice = createSlice({
	name: "TenantsSlice",
	initialState: initialValue,
	reducers: {
		addTenant: (state, action) => {
			state.tenantsList.push(action.payload);

			const tenantList = window.localStorage.getItem("tenantsList");

			if (tenantList) {
				const tenantListArr = JSON.parse(tenantList);
				tenantListArr.push({ ...action.payload });
				window.localStorage.setItem(
					"tenantsList",
					JSON.stringify(tenantListArr),
				);
			} else {
				window.localStorage.setItem(
					"tenantsList",
					JSON.stringify([{ ...action.payload }]),
				);
			}
		},

		deleteTenant: (state, action) => {
			const tenantList = window.localStorage.getItem("tenantsList");
			if (tenantList) {
				const tenantListArr = JSON.parse(tenantList);
				tenantListArr.forEach((tenant, index) => {
					if (tenant.id === action.payload) {
						tenantListArr.splice(index, 1);
						window.localStorage.setItem(
							"tenantsList",
							JSON.stringify(tenantListArr),
						);
						state.tenantsList = tenantListArr;
						console.log(state.tenantsList);
					}
				});
			}
		},

		Gettenant: (state, action) => {
			const tenantList = window.localStorage.getItem("tenantsList");
			if (tenantList) {
				const tenantListArr = JSON.parse(tenantList);
				tenantListArr.forEach((tenant, index) => {
					if (tenant.id === action.payload.id) {
						state.getindividaulTenant = tenant;
					}
				});
			}
		},

		updateTenant: (state, action) => {
			const tenantList = window.localStorage.getItem("tenantsList");
			if (tenantList) {
				const tenantListArr = JSON.parse(tenantList);
				tenantListArr.forEach((tenant, index) => {
					if (tenant.id === action.payload.id) {                            				
						    tenant.firstName = action.payload.Fname;
							tenant.lastName = action.payload.Lname;
							tenant.phoneNo = action.payload.Phone;
							tenant.shopNo = action.payload.Shop;
							tenant.address = action.payload.Address;
							tenant.states = action.payload.State;
							tenant.email = action.payload.Email;
					}
					window.localStorage.setItem(
						"tenantsList",
						JSON.stringify(tenantListArr),
					);
					state.tenantsList = tenantListArr;
				});
			}
		},
	},
});

export const { addTenant, deleteTenant, updateTenant, Gettenant } =
	TenantsSlice.actions;
export const tenantsList = (state: RootState) => state.tenantsSlice.tenantsList;
export const getIndividualTenant = (state: RootState) =>
	state.tenantsSlice.getindividaulTenant;

export default TenantsSlice.reducer;
