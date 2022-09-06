import React from "react"
import { LoadState } from "../Typing.d"

export const Table = ({ tableBody, TableHead, state, data, noData }: {
    TableHead: () => JSX.Element,
    tableBody: (value: any, index: number) => JSX.Element,
    data: any[],
    state: LoadState,
    noData?: JSX.Element
}) => {
    const [perPage, setPerPage] = React.useState(20)
    const [page, setPage] = React.useState(0)
    return <React.Fragment>
        <div className="my-2">
            {<TableHead />}
            {data !== undefined && <div>
                {((state === 'success' || state === 'nil') && data.length !== 0) && data
                    .slice(page * perPage, page === 0 ? perPage : (page + 1) * perPage)
                    .map((value, index) => tableBody(value, page === 0 ? index : (perPage * page) + index))}
                {((state === 'success' || state === 'nil') && data.length === 0) && (noData ?? <>
                    <div className="text-center my-4">
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
                {data.length > perPage && <div className="flex justify-center text-black">
                    {
                        Array.from(Array(parseInt((data.length / perPage).toPrecision(1)) + (data.length % perPage !== 0 && 1)).keys()).map((i) => <div key={i}
                            className={`cursor-pointer border border-1 p-2 hover:bg-red-500 hover:text-white ${page === i && 'bg-red-500 text-white'}`}
                            onClick={() => setPage(i)}>
                            {i + 1}
                        </div>)
                    }
                </div>}
            </div>}
        </div>
    </React.Fragment>
}