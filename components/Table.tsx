import React from "react"
import { LoadState } from "../Typing.d"

export const Table = ({ tableBody, tableHead, state, data, noData }: {
    tableHead: JSX.Element,
    tableBody: (value: any, index: number) => JSX.Element,
    data: any[],
    state: LoadState,
    noData?: JSX.Element
}) => {
    return <React.Fragment>
        {tableHead}
        {data !== undefined && <div>
            {(state === 'success' && data.length !== 0) && data.map(tableBody)}
            {(state === 'success' && data.length === 0) && (noData ?? <>
                <div className="text-center">
                    NO DATA
                </div>
            </>)}
            {state === 'pending' && <>
                <div className="my-1 relative shimmer box" style={{
                    width: '100%',
                    height: '50px'
                }} />
                <div className="my-1 relative shimmer box" style={{
                    width: '100%',
                    height: '50px'
                }} />
                <div className="my-1 relative shimmer box" style={{
                    width: '100%',
                    height: '50px'
                }} />
                <div className="my-1 relative shimmer box" style={{
                    width: '100%',
                    height: '50px'
                }} />
            </>
            }
            {(state === 'failed') && <div className="text-center my-1 bg-black text-white p-4 rounded-md">
                <span>ERROR</span>
                <span className="text-red-500 text-xl">{" | "}</span>
                {"Try relaoding the page"}
            </div>}
        </div>}
    </React.Fragment>
}