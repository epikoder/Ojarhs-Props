import { Router } from "next/router";
import React from "react";

export default function Loader() {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 items-center flex flex-col justify-center cursor-wait"
                style={{ backgroundColor: '#00000021' }}
            >
                <div className="spinner">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                    <div className="bar7"></div>
                    <div className="bar8"></div>
                    <div className="bar9"></div>
                    <div className="bar10"></div>
                    <div className="bar11"></div>
                    <div className="bar12"></div>
                </div>
            </div>
        </>
    );
}

export const CardLoader = ({ height = 200, width, count = 4 }: { height?: number, width?: number, count?: number }) => {
    return <>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mx-2'>
            {Array.from(Array(count).keys()).map((i) => <div key={i} className="flex flex-col items-center justify-center">
                <div className="photo shimmer" style={{
                    height: height,
                    width: width ?? '100%'
                }}></div>
                <div className="lines shimmer"></div>
                <div className="lines shimmer"></div>
                <div className="lines shimmer"></div>
            </div>)}
        </div>
    </>
}

export const PageLoader = ({ }: {

}) => {
    const [loading, setLoading] = React.useState(false)
    const val = React.useRef<number>(0)

    Router.events.on('routeChangeStart', () => {
        setLoading(true)
    })
    Router.events.on('routeChangeComplete', () => {
        setLoading(false)
    })

    React.useEffect(() => {
        console.log("PAGE LOADER", val.current, loading)
        if (!loading) return
        const i = setInterval(() => {
            if (val.current >= 98) {
                return clearInterval(i)
            }
            val.current++
            console.log("INCRE", val.current)
        })
    }, [loading])
    return <>
    </>
}