import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const _getProperty = typeof window !== "undefined";

const getInitialValue = () => {
	const properties = window.localStorage.getItem("propertyList");

	if (properties) {
		return JSON.parse(properties);
	}
	window.localStorage.setItem("propertyList", JSON.stringify([]));
	return [];
};

const initialValue = {
	propertyLists: _getProperty ? getInitialValue() : [],
	getindividaulProperty: {},
};

const PropertySlice = createSlice({
	name: "PropertySlice",
	initialState: initialValue,
	reducers: {
		addProperty: (state, action) => {
			state.propertyLists.push(action.payload);
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
					state.propertyLists = propertyArr
				})
			}
		},

		getProperty: (state, action) => {
			const property = window.localStorage.getItem("propertyList");
			if (property) {
				const propertyListArr = JSON.parse(property);
				propertyListArr.forEach((prop) => {
					if (prop.id === action.payload) {
						state.getindividaulProperty = prop;
						console.log(state.getindividaulProperty);
					}
				});
			}
		},

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
				state.propertyLists = propertyArr
			}
		},
	},
});

export const { addProperty, deleteProperty, updateProperty, getProperty } = PropertySlice.actions;
export const PropertyList = (state: RootState) =>
	state.propertySlice.propertyLists;
export const getIndividualProperty = (state: RootState) =>
	state.propertySlice.getindividaulProperty;

export default PropertySlice.reducer;
