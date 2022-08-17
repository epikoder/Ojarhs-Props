import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../store"

export interface MenuState {
    isOpen: boolean
}

const initialState: MenuState = {
    isOpen: false
}


const menuSlice  = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        openMenu: (state, action) => {
           state.isOpen = true
        },

        closeMenu: (state, action) => {
            state.isOpen = false
        },
    }
})


export const { openMenu, closeMenu } = menuSlice.actions;

export const openState = (state: RootState) => state.menu.isOpen 

export default menuSlice.reducer;