import { BASEURL } from "../constants"
import { Space } from "../Typing.d";

export const resolveFilePath = (s: string): string => { return s !== "" ? BASEURL + '/' + s : undefined };
export const money = (amount: number): string => "₦" + amount.toLocaleString('en-US')
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