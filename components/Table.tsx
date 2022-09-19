import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import React from "react"
import { LoadState } from "../Typing.d"

export const Table = ({ tableBody, tableHead: TableHead, state, data, noData, perPage = 20, navLimit = 10 }: {
    tableHead: () => JSX.Element,
    tableBody: (value: any, index: number) => JSX.Element,
    data: any[],
    state: LoadState,
    perPage?: number
    noData?: JSX.Element
    navLimit?: number
}) => {
    const [page, setPage] = React.useState(0)

    const pages = Array.from(Array(Math.floor(data.length / perPage) + (data.length % perPage !== 0 && 1)).keys())
    return <React.Fragment>
        <div className="my-2">
            {<TableHead />}
            {data !== undefined && <div>
                <div>
                    <div className="min-h-[50vh]">
                        {((state === 'success' || state === 'nil') && data.length !== 0) && data
                            .slice(page * perPage, page === 0 ? perPage : (page + 1) * perPage)
                            .map((value, index) => tableBody(value, page === 0 ? index : (perPage * page) + index))}
                        {((state === 'success' || state === 'nil') && data.length === 0) && (noData ?? <>
                            <div className="text-center text-sm my-4 text-gray-500">
                                NOTHING TO SHOW
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
                    </div>
                    {data.length > perPage && <div className="flex items-center justify-center text-black my-1">
                        {
                            page > navLimit && <>
                                <div
                                    onClick={() => setPage(page - navLimit < 0 ? 0 : page - navLimit)}>
                                    <ArrowBackIos fontSize="small" />
                                </div>
                            </>
                        }
                        {
                            pages.map((i) =>
                                <>
                                    {
                                        ((Math.abs(i - page) <= navLimit)) &&
                                        <div key={i}
                                            className={`cursor-pointer border border-1 px-2 py-1 hover:bg-red-500 hover:text-white ${page === i && 'bg-red-500 text-white'}`}
                                            onClick={() => setPage(i)}>
                                            {i + 1}
                                        </div>
                                    }
                                </>)
                        }
                        {
                            page + navLimit < pages.length - 1 && <>
                                <div
                                    onClick={() => setPage(page + navLimit > pages.length ? pages.length - 1 : page - navLimit)}>
                                    <ArrowForwardIos fontSize="small" />
                                </div>
                            </>
                        }
                    </div>}
                </div>
            </div>}
        </div>
    </React.Fragment>
}