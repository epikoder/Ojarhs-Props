import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store"


export interface TogglePassword {
    show: boolean
}

const initialState: TogglePassword  = {
    show: false
}

const TogglePassword = createSlice({
    name:"TogglePassword",
    initialState: initialState,
    reducers: {
        ShowPassword: (state, action) => {
            state.show = false                               
        },

        HidePassword: (state, action) => {
            state.show = true
            

        }
    }
})


export const { ShowPassword, HidePassword } = TogglePassword.actions;

export const TogglePasswordState = (state: RootState )=> state.togglePassword.show

export default TogglePassword.reducer