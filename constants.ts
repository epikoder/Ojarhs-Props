import { DisputeLevel } from "./Typing.d"

const IsRelease = true
export const BASEURL = IsRelease ? "https://ojarhproperties.com/api" : "http://ojarh-properties.com/api"
export const STORAGEURL = IsRelease ? "https://ojarhproperties.com" : "http://ojarh-properties.com"
export const OjarhEmail = "support@ojarproperties.com"
export const OjarhAddress = "Ikeja, Lagos"
export const OjarhPhone = "+2349011111111"
export const pk_key = 'pk_test_7974282ff9c7f73d5afc1a79fd11746cba653e28'
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