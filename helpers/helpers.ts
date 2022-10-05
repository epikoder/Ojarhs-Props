import { STORAGEURL } from "../constants"
import { Space } from "../Typing.d";

export const resolveFilePath = (s: string): string | undefined => { return s !== "" ? STORAGEURL + '/' + s : undefined };
export const money = (amount: number): string => "₦" + (amount !== undefined ? amount.toLocaleString('en-US') : 0.00)
export const addMonth = (date: Date, months: number): string => {
    const _ = new Date(date)
    return date !== undefined && date !== null ? new Date(_.setMonth(_.getMonth() + months)).toLocaleDateString() : "Not Available"
}
export const addWeek = (date: Date, hours: number): string => {
    const _ = new Date(date)
    return date !== undefined && date !== null ? new Date(_.setHours(_.getHours() + hours)).toLocaleDateString() : "Not Available"
}
export const fixSpace = (space: Space): Space => ({
    ...space, galleries: space.galleries as unknown as string !== "" ? (space.galleries as unknown as string).split(",") : [],
    video_galleries: space.galleries as unknown as string !== "" ? (space.video_galleries as unknown as string).split(",") : []
})
export const IsLinkValid = (url: string): boolean => {
    const regExp = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/
    return regExp.test(url)
}

export const parseString = (s: string): string => {
    // s.split(/^w/)
    return s
}