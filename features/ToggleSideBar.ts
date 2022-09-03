import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const initialState = {
    sidebarToggle:false
}


const SideBarToggle = createSlice({
    name:"SideBarToggle",
    initialState,
    reducers: {
        togleSideBar: (state) => {
            state.sidebarToggle = !state.sidebarToggle
        }
    }
})


export const {togleSideBar} = SideBarToggle.actions
export const SideBarToggleState = (state: RootState )=> state.toggleSideBar.sidebarToggle
export default SideBarToggle.reducer