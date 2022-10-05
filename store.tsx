import { configureStore } from '@reduxjs/toolkit'
import menuStore from "./features/HeaderMenu"
import TogglePassword from './features/TogglePassword'
import ToggleSideBar from './features/ToggleSideBar'
import TenantsSlice from "./features/TenantsSlice"
import IndexSlice from './features/IndexSlice'
import indexAdvertSlice from './features/indexAdvertSlice'
import { useDispatch } from 'react-redux'
import authSlice from './features/authSlice'
import accountSlice from './features/user/accountSlice'
import propertySlice from './features/admin/propertySlice'
import resourceSlice from './features/resourceSlice'
import propertyDetailSlice from './features/propertyDetailSlice'
import searchSlice from './features/searchSlice'
import serviceSlice from './features/admin/serviceSlice'
import advertSlice from './features/admin/advertSlice'
import applicationsSlice from './features/admin/applicationsSlice'
import messageSlice from './features/admin/messageSlice'
import packoutSlice from './features/admin/packoutSlice'
import staffSlice from './features/admin/staffSlice'
import expenseSlice from './features/admin/expenseSlice'
import invoiceSlice from './features/admin/invoiceSlice'


export const store = configureStore({
  reducer: {
    menu: menuStore,
    togglePassword: TogglePassword,
    toggleSideBar: ToggleSideBar,
    tenantsSlice: TenantsSlice,
    propertySlice: propertySlice,
    indexSlice: IndexSlice,
    authSlice: authSlice,
    accountSlice: accountSlice,
    resourceSlice: resourceSlice,
    serviceSlice: serviceSlice,
    propertDetailSlice: propertyDetailSlice,
    searchSlice: searchSlice,
    advertSlice: advertSlice,
    applicationSlice: applicationsSlice,
    indexAdvertSlice: indexAdvertSlice,
    messageSlice: messageSlice,
    packoutSlice: packoutSlice,
    staffSlice: staffSlice,
    expenseSlice: expenseSlice,
    invoiceSlice: invoiceSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()