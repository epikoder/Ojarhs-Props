import { loginResponse } from "../Typing.d"
import ServerStorage from "./storage"

const ISSERVER = typeof window !== 'undefined'
const _tokenKey = 'x-app-session'

export const getTokenStore = (): Storage => {
    if (!ISSERVER) {
        return new ServerStorage()
    }
    return localStorage.getItem('persist_auth') == 'true' ? localStorage : sessionStorage
}

export const setUserToken = (data: loginResponse) => {
    console.log("SETTING DATA", data)
    getTokenStore().setItem(_tokenKey, `${data.access},${data.access_expires_at}`)
}

export const getUserToken = (): loginResponse | undefined => {
    let t = getTokenStore().getItem(_tokenKey)
    if (t === null) return undefined
    let arr = t.split(',')
    if (arr.length !== 2) return undefined
    return {
        access: arr[0],
        access_expires_at: arr[1] as unknown as Date
    }
}

export const clearUserToken = (): void => {
    getTokenStore().removeItem(_tokenKey)
}