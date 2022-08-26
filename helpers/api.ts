import axios from "axios";
import { BASEURL } from "../constants";
import { getUserToken } from "./auth";

export var ApiCancel = undefined
export const Api = () => axios.create({
    baseURL: BASEURL,
    cancelToken: new axios.CancelToken((c) => { ApiCancel = c }),
    headers: {
        'authorization': ((): string => {
            let t = getUserToken()
            if (t === undefined) return ''
            return t.access
        })()
    },
    withCredentials: true
})