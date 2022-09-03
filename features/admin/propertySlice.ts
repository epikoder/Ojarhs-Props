import { createSlice } from "@reduxjs/toolkit";
import { DashboardDataState, Space } from "../../Typing.d";

const propertySlice = createSlice({
	name: "propertySlice",
	initialState: {
		data: []
	} as DashboardDataState<Space[]>,
	reducers: {
		addProperty: (state, action) => {
			state.data.push(action.payload);
			const property = window.localStorage.getItem("propertyList");
			if (property) {
				const propArr = JSON.parse(property);
				propArr.push({ ...action.payload });
				window.localStorage.setItem("propertyList", JSON.stringify(propArr));
			} else {
				window.localStorage.setItem(
					"propertyList",
					JSON.stringify({ ...action.payload }),
				);
			}
		},

		deleteProperty: (state, action) => {
			const property = window.localStorage.getItem("propertyList")
			if (property) {
				const propertyArr = JSON.parse(property)
				propertyArr.map((prop, index) => {
					if (prop.id === action.payload) {
						propertyArr.splice(index, 1)
						window.localStorage.setItem("propertyList", JSON.stringify(propertyArr))
					}
					state.data = propertyArr
				})
			}
		},

		// getProperty: (state, action) => {
		// 	const property = window.localStorage.getItem("propertyList");
		// 	if (property) {
		// 		const propertyListArr = JSON.parse(property);
		// 		propertyListArr.forEach((prop) => {
		// 			if (prop.id === action.payload) {
		// 				state.getindividaulProperty = prop;
		// 				console.log(state.getindividaulProperty);
		// 			}
		// 		});
		// 	}
		// },

		updateProperty: (state, action) => {
			const property = window.localStorage.getItem("propertyList");

			if (property) {
				const propertyArr = JSON.parse(property)
				propertyArr.forEach((prop) => {
					if (prop.id === action.payload.id) {
						prop.name = action.payload.name
						prop.no = action.payload.no
						prop.type = action.payload.type
						// prop.Description = action.payload.Description
						prop.amount = action.payload.amount
						prop.size = action.payload.size
					}
				})
				window.localStorage.setItem("propertyList", JSON.stringify(propertyArr))
				state.data = propertyArr
			}
		},
	},
});

export const { addProperty, deleteProperty, updateProperty, /*{getProperty}*/ } = propertySlice.actions;
export default propertySlice.reducer;

