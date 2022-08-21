import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const getProperty = typeof window !== "undefined";

const getInitialValue = () => {    
	const properties = window.localStorage.getItem("propertyList");

	if (properties) {
		return JSON.parse(properties);
	}
	window.localStorage.setItem("propertyList", JSON.stringify([1,2,3]));
	return [];
};

const initialValue = {
	propertyLists: getProperty ? getInitialValue() : [],
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
            propertyArr.map((prop, index)=> {                
                if (prop.Id === action.payload) {                    
                    propertyArr.splice(index, 1)
                    window.localStorage.setItem("propertyList", JSON.stringify(propertyArr))
                }
                state.propertyLists = propertyArr
            })
           }
        },

        GetProperty: (state, action) => {
			const property = window.localStorage.getItem("propertyList");
			if (property) {
				const propertyListArr = JSON.parse(property);
				propertyListArr.forEach((prop) => {
                    if (prop.Id === action.payload) {                            
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
                propertyArr.forEach((prop)=> {
                    if (prop.Id === action.payload.Id){                                           
                    prop.Name = action.payload.Name
                    prop.No = action.payload.No
                    prop.Type = action.payload.Type
                    // prop.Description = action.payload.Description
                    prop.Price = action.payload.Price
                    prop.Size = action.payload.Size
                }
            })
            window.localStorage.setItem("propertyList", JSON.stringify(propertyArr))
            state.propertyLists = propertyArr
        }
		},
	},
});

export const { addProperty, deleteProperty, updateProperty, GetProperty } = PropertySlice.actions;
export const PropertyList = (state: RootState) =>
	state.propertySlice.propertyLists;
export const getIndividualProperty = (state: RootState) =>
	state.propertySlice.getindividaulProperty;

export default PropertySlice.reducer;
