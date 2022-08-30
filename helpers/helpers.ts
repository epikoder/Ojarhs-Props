import { BASEURL } from "../constants"

export const resolveImagePath = (s: string): string => { return BASEURL + '/' + s };
export const money = (amount: number): string => amount.toLocaleString('en-US')
export const addMonth = (date: Date, duration: number): string => {
    const _ = new Date(date)
    return date !== undefined && date !== null ? new Date(_.setMonth(_.getMonth() + duration)).toLocaleDateString() : "Not Available"
}