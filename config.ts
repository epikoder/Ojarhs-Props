import { DisputeLevel } from "./Typing"

const IsRelease = true
const PaystackMode: 'live' | 'sandbox' = 'live'
export const BASEURL = IsRelease ? "https://ojarhproperties.com/api" : "http://localhost:80/api"
export const WSURL = IsRelease ? "wss://socket.ojarhproperties.com" : "ws://localhost:8000"
export const STORAGEURL = IsRelease ? "https://ojarhproperties.com" : "http://ojarh-properties.com"
export const OjarhEmail = "support@ojarhproperties.com"
export const OjarhAddress = "22 Oraifite Road, Uruagu Nnewi, Anambra State"
export const OjarhPhone = "+2349161103990"
export const pk_key = PaystackMode as string === 'live'
    ? 'pk_live_6ec1727801554d5e3a8ff0d12dbd1dccefba2877' :
    'pk_test_3d46650f14145a55353137f119f1b3df6fcd80d7'
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

