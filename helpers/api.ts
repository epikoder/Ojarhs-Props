import axios, { AxiosError } from "axios";
import { BASEURL } from "../constants";
import { JWTCLAIMS, logout, setAuthenticated } from "../features/authSlice";
import { store } from "../store";
import { ApiResponse, loginResponse, User, UserApplicationStatus } from "../Typing";
import { getUserToken, setUserToken } from "./auth";
import * as jose from 'jose'

export var ApiCancel = undefined
const Api = (useInterceptor: boolean = true) => {
    const _api = axios.create({
        baseURL: BASEURL,
        cancelToken: new axios.CancelToken((c) => { ApiCancel = c }),
        headers: {
            authorization: ((): string => {
                const t = getUserToken()
                if (t === undefined || t == null) return ""
                return `Bearer ${t.access}`
            })(),
            'content-type': 'application/json',
            accept: 'application/json'
        },
        withCredentials: true,
    })

    var refreshInterceptor: number
    const handleExpiredToken = async (error: AxiosError) => {
        if (error.response.status === 401) {
            try {
                let t = getUserToken()
                const init: RequestInit = {
                    method: "POST",
                    credentials: 'include',
                }
                if (t !== undefined) {
                    init.headers = { authorization: 'Bearer ' + t?.refresh }
                }
                const res = await fetch(BASEURL + '/jwt/refresh', init)
                if (res.status !== 200) {
                    _api.interceptors.response.eject(refreshInterceptor)
                    store.dispatch(logout())
                    return Promise.reject(error)
                }

                const data = (await res.json()) as ApiResponse<loginResponse, { application: UserApplicationStatus }>
                setUserToken(data.data)
                var dec = jose.decodeJwt(data?.data.access)
                let user = (dec as unknown as JWTCLAIMS).aud as User
                if (user?.is_admin && (user?.roles.find(s => s.includes("admin")) === undefined)) {
                    store.dispatch(setAuthenticated({ authenticated: false }))
                    return Promise.reject(error)
                }
                const auth = {
                    authenticated: true,
                    application: data.extra?.application,
                    token: data.data,
                    user: user
                }
                _api.interceptors.response.eject(refreshInterceptor)
                return store.dispatch(setAuthenticated(auth))
            } catch (error) {
                _api.interceptors.response.eject(refreshInterceptor)
                store.dispatch(logout())
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
    if (useInterceptor) {
        refreshInterceptor = _api.interceptors.response.use(response => {
            return Promise.resolve(response)
        }, handleExpiredToken)
    }
    return _api
}

export { Api }
