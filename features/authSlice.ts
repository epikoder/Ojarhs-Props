import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../helpers/api";
import { clearUserToken, getUserToken, setUserToken } from "../helpers/auth";
import { loadNextOfKin, loginAdminApi, loginApi, rejectValue } from "../actions/auth";
import { ApiResponse, LoadState, loginResponse, NextOfKin, User, UserApplicationStatus } from "../Typing.d";
import * as jose from 'jose'
import { store } from "../store";
import { updateUserProfile } from "../actions/user/dashboard";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";

type AuthState = {
    authenticated: boolean
    token: loginResponse
    status: LoadState
    appState: 'pending' | 'completed'
    message: string
    error: {
        [key: string]: string
    }
    user?: User
    nextOfKin: {
        state: LoadState
        data: NextOfKin[]
    },
    profileUpdate: {
        state: LoadState
        message?: string
    }
    application: UserApplicationStatus
}
const initialState: AuthState = {
    appState: 'pending',
    token: undefined,
    nextOfKin: {
        state: 'nil',
        data: []
    },
    profileUpdate: {
        state: 'nil'
    },
    authenticated: false,
    user: undefined,
    status: "nil",
    message: undefined,
    error: {},
    application: "nil"
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
    console.log("CHEEEEEEKKIII")
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
        const { data } = await Api().get<ApiResponse<loginResponse>>("/admin/user")
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
            if (!(auth.user.is_admin && auth.user.roles !== undefined && auth.user.roles.find(s => s.includes("admin")))) {
                store.dispatch(setAuthenticated({ authenticated: false }))
                return
            }
            auth.token = token
        }
        store.dispatch(setAuthenticated(auth))
    } catch (error) {
        store.dispatch(setAuthenticated({ authenticated: false }))
    }
}

const logoutAsync = async (token: string) => {
    try {
        await fetch('/user/logout', {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            headers: {
                authorization: 'Bearer ' + token
            }
        })
    } catch (error) {

    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            console.log('LOGGGING OUT')
            state.appState = 'completed'
            state.authenticated = false
            state.user = undefined
            state.message = undefined
            state.token = {} as loginResponse
            state.error = {}
            logoutAsync(state.token?.access)
            clearUserToken()
            // TODO: Clear token cache
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
            state.appState = 'completed'
            state.user = payload.user
            state.token = payload.token
            state.application = payload.application
        },

        checkIsAuthenticated: (state, { payload }: {
            payload: {
                isAdmin?: boolean
            }
        }) => {
            if (state.authenticated === true && state.user !== undefined) return
            state.appState = 'pending'
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
            state.application = payload.extra.application
            const dec = jose.decodeJwt(payload.data.access)
            state.user = (dec as unknown as JWTCLAIMS).aud as User

            setUserToken(payload.data)
            state.token = payload.data
            state.status = 'success'
            state.message = payload.message
            state.authenticated = true

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
            const dec = jose.decodeJwt(payload.data.access)
            state.user = (dec as unknown as JWTCLAIMS).aud as User
            if (!(state.user.is_admin && state.user.roles !== undefined && state.user.roles.find(s => s.includes("admin")))) {
                state.authenticated = false
                state.appState = 'completed'
                return
            }

            setUserToken(payload.data)
            state.token = payload.data
            state.status = 'success'
            state.message = payload.message
            state.authenticated = true

        })

        builder.addCase(loginAdminApi.pending, (state, { }) => {
            state.status = 'pending'
        })

        builder.addCase(loginAdminApi.rejected, (state, { payload }: { payload }) => {
            state.status = 'failed'
            state.message = (payload as rejectValue).message
        })

        {/* User profile: NEXT OF KIN */ }
        builder.addCase(loadNextOfKin.pending, (state) => {
            state.nextOfKin.state = 'pending'
        })
        builder.addCase(loadNextOfKin.fulfilled, (state, { payload }) => {
            state.nextOfKin.data = payload
            state.nextOfKin.state = 'success'
        })
        builder.addCase(loadNextOfKin.rejected, (state) => {
            state.nextOfKin.state = 'failed'
        })

        {/* User profile: Update Profile */ }
        builder.addCase(updateUserProfile.pending, (state) => {
            state.profileUpdate.state = 'pending'
        })
        builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
            if (payload.status === 'failed') {
                state.profileUpdate.state = 'failed'
                state.profileUpdate.message = payload.message
                return
            }
            setUserToken(Object.assign(payload.data))
            state.profileUpdate.message = payload.message
            state.profileUpdate.state = 'success'
            state.token = payload.data
            var dec = jose.decodeJwt(payload.data.access)
            state.user = (dec as unknown as JWTCLAIMS).aud as User
        })
        builder.addCase(updateUserProfile.rejected, (state, { payload }) => {
            state.profileUpdate.state = 'failed'
            state.profileUpdate.message = 'Failed to update profile'
        })
    },
})

export const { logout, setAuthenticated, checkIsAuthenticated, clearErr, setAppState } = authSlice.actions

export default authSlice.reducer