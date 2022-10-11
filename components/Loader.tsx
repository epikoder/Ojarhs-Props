import { Box, CircularProgress, circularProgressClasses, CircularProgressProps, LinearProgress } from "@mui/material";
import { Router } from "next/router";
import React from "react";

export default function Loader(props: CircularProgressProps) {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 items-center flex flex-col justify-center cursor-wait"
                style={{ backgroundColor: '#00000009' }}
            >
                <Box sx={{ position: 'relative' }}>
                    <CircularProgress
                        variant="determinate"
                        sx={{
                            color: (theme) =>
                                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                        value={100}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                            animationDuration: '550ms',
                            position: 'absolute',
                            left: 0,
                            [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: 'round',
                            },
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                    />
                </Box>
                {/* <div className="spinner">
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
                </div> */}
            </div>
        </>
    );
}

export function LoaderWhite() {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 items-center flex flex-col justify-center cursor-wait">
                <div className="spinner bg-force-white">
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

export const PageLoader = () => {
    const ref = React.useRef<ReturnType<typeof setTimeout>>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [val, setVal] = React.useState<number>(0)

    Router.events.on('routeChangeStart', () => {
        setLoading(true)
    })
    Router.events.on('hashChangeStart', () => console.log('HASH CHANGE'))
    Router.events.on('routeChangeComplete', () => {
        setLoading(false)
    })
    Router.events.on('hashChangeComplete', () => setLoading(false))
    return <div
        className={`fixed top-0 left-0 right-0`}
        style={{ zIndex: 11000000, height: 2 }}
    >
        {loading && <LinearProgress color="primary" />}
    </div>
}