import axios, { AxiosResponse } from "axios";
import { BASEURL } from "../constants";
import { store } from "../store";
import { clearUserToken, getTokenStore, getUserToken } from "./auth";
import ServerStorage from "./storage";

export var ApiCancel = undefined
const Api = (useInterceptor?: boolean) => {
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

    var refreshInterceptor
    const handleExpiredToken = async (error) => {
        try {
            let t = getUserToken()
            console.log(t)
            if (t === undefined || t === null) {
                return clearUserToken()
            }
            if ((error.response as AxiosResponse).status === 401) {
                console.log("INTERCEPTOR", "GOT HERE")
                console.log("EJECTING", _api.interceptors.response.eject(refreshInterceptor))
                const res = await _api.post('/jwt/refresh')
                console.log("FAILED REFRESHING", res)
                if (res.status !== 200) {
                    console.log("FAILED REFRESHING CLEAR")
                    _api.interceptors.response.eject(refreshInterceptor)
                    return clearUserToken()
                }
            }
        } catch (error) {
            console.log(error)
            _api.interceptors.response.eject(refreshInterceptor)
        }
    }
    if (useInterceptor) {
        refreshInterceptor = _api.interceptors.response.use(handleExpiredToken)
    }
    return _api
}

export { Api }
