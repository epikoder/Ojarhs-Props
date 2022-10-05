import axios, { AxiosResponse } from "axios";
import { BASEURL } from "../constants";
import { logout } from "../features/authSlice";
import { store } from "../store";
import { getUserToken } from "./auth";
export var ApiCancel = undefined
const Api = (useInterceptor: boolean = false) => {
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
    const handleExpiredToken = async (error) => {
        if (error.response.status === 401) {
            try {
                let t = getUserToken()
                if (t === undefined || t === null) {
                    console.log('HMMMM')
                    return store.dispatch(logout())
                }
                if ((error.response as AxiosResponse).status === 401) {
                    const res = await fetch(BASEURL + '/jwt/refresh', {
                        method: "POST",
                        credentials: 'include'
                    })
                    if (res.status !== 200) {
                        _api.interceptors.response.eject(refreshInterceptor)
                        return store.dispatch(logout())
                    }
                }
            } catch (error) {
                console.log('ejecting')
                _api.interceptors.response.eject(refreshInterceptor)
                return store.dispatch(logout())
            }
        }
    }
    if (useInterceptor) {
        refreshInterceptor = _api.interceptors.response.use(null, handleExpiredToken)
    }
    return _api
}

export { Api }
