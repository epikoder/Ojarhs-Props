import { configureStore } from '@reduxjs/toolkit'
import menuStore from "./features/HeaderMenu"
import TogglePassword from './features/TogglePassword'
import ToggleSideBar from './features/ToggleSideBar'
import ToggleSubItem from './features/ToggleSubItem'
import TenantsSlice from "./features/TenantsSlice"
import PropertySlice from './features/PropertySlice'
import StaffSlice from './features/StaffSlice'
import IndexSlice from './features/IndexSlice'
import { useDispatch } from 'react-redux'
import authSlice from './features/authSlice'
import accountSlice from './features/user/accountSlice'
import ServiceSlice from './features/ServiceSlice'


export const store = configureStore({
  reducer: {
    menu: menuStore,
    togglePassword: TogglePassword,
    toggleSubItem: ToggleSubItem,
    toggleSideBar: ToggleSideBar,
    tenantsSlice: TenantsSlice,
    propertySlice: PropertySlice,
    staffSlice: StaffSlice,
    indexSlice: IndexSlice,
    authSlice: authSlice,
    accountSlice: accountSlice
    serviceSlice: ServiceSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()