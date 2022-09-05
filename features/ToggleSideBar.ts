import { createSlice } from "@reduxjs/toolkit"

const SideBarToggle = createSlice({
    name: "SideBarToggle",
    initialState: { status: false },
    reducers: {
        toggleSideBar: (state) => {
            state.status = !state.status
        }
    }
})


export const { toggleSideBar } = SideBarToggle.actions
export default SideBarToggle.reducer