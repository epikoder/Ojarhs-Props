import { createSlice } from "@reduxjs/toolkit";
import Condition from "yup/lib/Condition";
import { Api } from "../helpers/api";
import { RootState } from "../store";
const _getService = typeof window !== "undefined";

const getInitialValue = () => {
	const service = window.localStorage.getItem("serviceList");

	if (service) {
		return JSON.parse(service);
	}
	window.localStorage.setItem("serviceList", JSON.stringify([]));
	return [];
};

const initialValue = {
	ServiceList: _getService ? getInitialValue() : [],
	getindividualService: {},
};

const ServiceSlice = createSlice({
	name: "ServiceSlice",
	initialState: initialValue,
	reducers: {
		addService: (state, action) => {
			state.ServiceList.push(action.payload);
			const service = window.localStorage.getItem("serviceList");			
			
			Api().post("/admin/services/create", JSON.stringify(action.payload)).then((data)=> console.log(data.status)).catch((error)=> console.log(error))
			
			if (service) {
				const serviceArr = JSON.parse(service);
				serviceArr.push({ ...action.payload });
				window.localStorage.setItem("serviceList", JSON.stringify(serviceArr));
			} else {
				window.localStorage.setItem(
					"serviceList",
					JSON.stringify({ ...action.payload }),
				);
			}
		},

		deleteService: (state, action) => {
			const service = window.localStorage.getItem("serviceList")
			if (service) {
				const serviceArr = JSON.parse(service)
				serviceArr.map((service, index) => {
					if (service.id === action.payload) {
						serviceArr.splice(index, 1)
						window.localStorage.setItem("serviceList", JSON.stringify(serviceArr))
					}
					state.ServiceList = serviceArr
				})
			}
		},

		getService: (state, action) => {
			const service = window.localStorage.getItem("serviceList");
			if (service) {
				const serviceListArr = JSON.parse(service);
				serviceListArr.forEach((service) => {
					if (service.id === action.payload) {
						state.getindividualService = service;
						console.log(state.getindividualService);
					}
				});
			}
		},

		updateService: (state, action) => {
			const service = window.localStorage.getItem("serviceList");

			if (service) {
				const serviceArr = JSON.parse(service)
				serviceArr.forEach((service) => {
					if (service.id === action.payload.id) {
						service.name = action.payload.name						
                        service.description = action.payload.description
                        service.plan = action.payload.plan
                        service.amount = action.payload.amount
                        service.manager = action.payload.manager
					}
				})
				window.localStorage.setItem("serviceList", JSON.stringify(serviceArr))
				state.ServiceList = serviceArr
			}
		},
	},
});

export const { addService, deleteService, updateService, getService } = ServiceSlice.actions;
export const ServiceList = (state: RootState) =>
	state.serviceSlice.ServiceList
export const getIndividualService = (state: RootState) =>
	state.serviceSlice.getindividualService;

export default ServiceSlice.reducer;
