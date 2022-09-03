import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const _getStaff = typeof window !== "undefined";

const getInitialValue = () => {
	const staff = window.localStorage.getItem("staffList");

	if (staff) {
		return JSON.parse(staff);
	}
	window.localStorage.setItem("staffList", JSON.stringify([]));
	return [];
};

const initialValue = {
	staffList: _getStaff ? getInitialValue() : [],
	getindividualStaff: {},
};

const StaffSlice = createSlice({
	name: "StaffSlice",
	initialState: initialValue,
	reducers: {
		addStaff: (state, action) => {
			state.staffList.push(action.payload);
			const staff = window.localStorage.getItem("staffList");
			if (staff) {
				const staffArr = JSON.parse(staff);
				staffArr.push({ ...action.payload });
				window.localStorage.setItem("staffList", JSON.stringify(staffArr));
			} else {
				window.localStorage.setItem(
					"staffList",
					JSON.stringify({ ...action.payload }),
				);
			}
		},

		deleteStaff: (state, action) => {
			const staff = window.localStorage.getItem("staffList")
			if (staff) {
				const staffArr = JSON.parse(staff)
				staffArr.map((staff, index) => {
					if (staff.id === action.payload) {
						staffArr.splice(index, 1)
						window.localStorage.setItem("staffList", JSON.stringify(staffArr))
					}
					state.staffList = staffArr
				})
			}
		},

		getStaff: (state, action) => {
			const staff = window.localStorage.getItem("staffList");
			if (staff) {
				const staffListArr = JSON.parse(staff);
				staffListArr.forEach((staff) => {
					if (staff.id === action.payload) {
						state.getindividualStaff = staff;
						console.log(state.getindividualStaff);
					}
				});
			}
		},

		updateStaff: (state, action) => {
			const staff = window.localStorage.getItem("staffList");

			if (staff) {
				const staffArr = JSON.parse(staff)
				staffArr.forEach((staff) => {
					if (staff.id === action.payload.id) {
						staff.name = action.payload.name
						staff.no = action.payload.no	
                        staff.email = action.payload.email					
						staff.Description = action.payload.Description
						staff.fee = action.payload.fee						
					}
				})
				window.localStorage.setItem("staffList", JSON.stringify(staffArr))
				state.staffList = staffArr
			}
		},
	},
});

export const { addStaff, deleteStaff, updateStaff, getStaff } = StaffSlice.actions;
export const staffList = (state: RootState) =>
	state.staffSlice.staffList;
export const getIndividualStaff = (state: RootState) =>
	state.staffSlice.getindividualStaff;

export default StaffSlice.reducer;
