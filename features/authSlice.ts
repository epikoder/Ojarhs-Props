import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../helpers/api";
import { getUserToken, setUserToken } from "../helpers/auth";
import { loginAdminApi, loginApi, rejectValue } from "../redux/auth";
import { ApiResponse, LoadState, loginResponse, User, UserApplicationStatus } from "../Typing.d";
import * as jose from 'jose'
import { store } from "../store";
import { AxiosResponse } from "axios";

export type AuthState = {
    authenticated: boolean
    token: loginResponse
    status: LoadState
    appState: 'pending' | 'completed'
    message: string
    error: {
        [key: string]: string
    }
    user?: User
    application: UserApplicationStatus
}

export type JWTCLAIMS = {
    aud: User
    id: string
    iss: string
    sub: 'access_token' | 'refresh_token'
    iat: number
    exp: number
}

const checkIsAuthenticatedAsync = async () => {
    try {
        const { data } = await Api().get<ApiResponse<loginResponse, { application: UserApplicationStatus }>>("/user/user")
        const auth = {} as {
            authenticated: boolean
            token?: loginResponse
            user?: User
            application: UserApplicationStatus
        }
        auth.authenticated = data.status === 'success'
        auth.application = data.extra.application
        if (data.data !== undefined && data.data !== null) {
            auth.token = data.data as loginResponse
            var dec = jose.decodeJwt(auth.token.access)
            auth.user = (dec as unknown as JWTCLAIMS).aud as User
            setUserToken(auth.token)
        } else {
            var token = getUserToken()
            if (token === undefined) {
                store.dispatch(setAuthenticated({ authenticated: false }))
                return
            }
            var dec = jose.decodeJwt(token.access)
            auth.user = (dec as unknown as JWTCLAIMS).aud as User
            auth.token = token
        }
        store.dispatch(setAuthenticated(auth))
    } catch (error) {
        store.dispatch(setAuthenticated({ authenticated: false }))
    }
}

const checkIsAuthenticatedAdminAsync = async () => {
    try {
        const { data } = await Api().get<ApiResponse>("/admin/user")
        const auth = {} as {
            authenticated: boolean
            token?: loginResponse
            user?: User
        }
        auth.authenticated = data.status === 'success'
        if (data.data !== undefined && data.data !== null) {
            auth.token = data.data as loginResponse
            var dec = jose.decodeJwt(auth.token.access)
            auth.user = (dec as unknown as JWTCLAIMS).aud as User
            setUserToken(auth.token)
        } else {
            var token = getUserToken()
            if (token === undefined) {
                store.dispatch(setAuthenticated({ authenticated: false }))
                return
            }
            var dec = jose.decodeJwt(token.access)
            auth.user = (dec as unknown as JWTCLAIMS).aud as User
            auth.token = token
        }
        store.dispatch(setAuthenticated(auth))
    } catch (error) {
        store.dispatch(setAuthenticated({ authenticated: false }))
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        appState: 'completed',
        token: {}
    } as AuthState,
    reducers: {
        logout: (state) => {
            state.authenticated = false
            state.user = undefined
            state.message = undefined
            state.token = {} as loginResponse
            state.error = {}
        },
        setAppState: (state, { payload }: { payload: 'pending' | 'completed' }) => {
            state.appState = payload
        },
        setAuthenticated: (state, { payload }: {
            payload: {
                authenticated: boolean
                token?: loginResponse
                user?: User
                application?: UserApplicationStatus
            }
        }) => {
            state.authenticated = payload.authenticated
            state.user = payload.user
            state.token = payload.token
            state.application = payload.application
            setTimeout(() => {
                store.dispatch(setAppState("completed"))
            }, 1500)
        },
        checkIsAuthenticated: (state, { payload }: {
            payload: {
                isAdmin?: boolean
            }
        }) => {
            if (state.appState === 'pending') return
            state.appState = 'pending'
            if (getUserToken() === undefined) {
                state.appState = 'completed'
                state.authenticated = false
                state.user = undefined
                return
            }
            if (payload.isAdmin) {
                checkIsAuthenticatedAdminAsync()
                return
            }
            checkIsAuthenticatedAsync()
        },
        clearErr: (state) => {
            state.appState = 'completed'
            state.message = undefined
            state.error = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            if (payload.status === 'failed') {
                state.status = 'failed'
                state.message = payload.message
                state.error = payload.error
                return
            }

            setUserToken(payload.data)
            state.token = payload.data
            state.status = 'success'
            state.message = payload.message
            state.authenticated = true

            state.application = payload.extra.application
            const dec = jose.decodeJwt(payload.data.access)
            state.user = (dec as unknown as JWTCLAIMS).aud as User
        })

        builder.addCase(loginApi.pending, (state, { }) => {
            state.status = 'pending'
        })

        builder.addCase(loginApi.rejected, (state, { payload }: { payload }) => {
            state.status = 'failed'
            state.message = (payload as rejectValue).message
        })

        builder.addCase(loginAdminApi.fulfilled, (state, { payload }) => {
            if (payload === undefined) return
            if (payload.status === 'failed') {
                state.status = 'failed'
                state.message = payload.message
                state.error = payload.error
                return
            }

            setUserToken(payload.data)
            state.token = payload.data
            state.status = 'success'
            state.message = payload.message
            state.authenticated = true

            const dec = jose.decodeJwt(payload.data.access)
            state.user = (dec as unknown as JWTCLAIMS).aud as User
        })

        builder.addCase(loginAdminApi.pending, (state, { }) => {
            state.status = 'pending'
        })

        builder.addCase(loginAdminApi.rejected, (state, { payload }: { payload }) => {
            state.status = 'failed'
            state.message = (payload as rejectValue).message
        })
    },
})

export const { logout, setAuthenticated, checkIsAuthenticated, clearErr, setAppState } = authSlice.actions

export default authSlice.reducer