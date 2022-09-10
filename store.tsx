import { configureStore } from '@reduxjs/toolkit'
import menuStore from "./features/HeaderMenu"
import TogglePassword from './features/TogglePassword'
import ToggleSideBar from './features/ToggleSideBar'
import TenantsSlice from "./features/TenantsSlice"
import StaffSlice from './features/StaffSlice'
import IndexSlice from './features/IndexSlice'
import { useDispatch } from 'react-redux'
import authSlice from './features/authSlice'
import accountSlice from './features/user/accountSlice'
import ServiceSlice from './features/ServiceSlice'
import propertySlice from './features/admin/propertySlice'
import resourceSlice from './features/resourceSlice'
import propertyDetailSlice from './features/propertyDetailSlice'
import searchSlice from './features/searchSlice'


export const store = configureStore({
  reducer: {
    menu: menuStore,
    togglePassword: TogglePassword,
    toggleSideBar: ToggleSideBar,
    tenantsSlice: TenantsSlice,
    propertySlice: propertySlice,
    staffSlice: StaffSlice,
    indexSlice: IndexSlice,
    authSlice: authSlice,
    accountSlice: accountSlice,
    resourceSlice: resourceSlice,
    serviceSlice: ServiceSlice,
    propertDetailSlice: propertyDetailSlice,
    searchSlice: searchSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()