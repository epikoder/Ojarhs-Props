import { DisputeLevel } from "./Typing"

const IsRelease = true
const PaystackMode: 'live' | 'sandbox' = 'live'
export const BASEURL = IsRelease ? "https://ojarhproperties.com/api" : "http://ojarh-properties.com/api"
export const WSURL = IsRelease ? "wss://ojarhproperties.com" : "ws://ojarh-properties.com"
export const STORAGEURL = IsRelease ? "https://ojarhproperties.com" : "http://ojarh-properties.com"
export const OjarhEmail = "support@ojarhproperties.com"
export const OjarhAddress = "22 Oraifite Road, Uruagu Nnewi, Anambra State"
export const OjarhPhone = "+2349161103990"
export const pk_key = PaystackMode === 'live'
    ? 'pk_live_4c0f3320aee947b3031bbd229db688dde451e17b' :
    'pk_test_7974282ff9c7f73d5afc1a79fd11746cba653e28'
export const applicationFee = 10000
export const advertPrices = [{
    position: 'slider',
    amount: 3000
}, {
    position: 'middle',
    amount: 2000
}, {
    position: 'property',
    amount: 1500
},]

export const disputeLevel: {
    value: DisputeLevel,
    name: string
}[] = [
        {
            name: 'Normal',
            value: 0
        },
        {
            name: 'Medium',
            value: 1
        },
        {
            name: 'Severe',
            value: 2
        },
    ]

