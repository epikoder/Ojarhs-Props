import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";
import { RootState } from "../store";

export const NoticeBoard = () => {
    const { data, state } = useSelector((store: RootState) => store.indexSlice.notice)
    return <>
        <div className='w-full p-2 h-full bg-white text-gray-500'>
            <div className="font-semibold bg-black text-white rounded-sm p-1">
                OJARH NOTICE
            </div>
            {data.length > 0 && <div className="py-2 h-full">
                <Carousel
                    showThumbs={false}
                    showArrows={true}
                    showStatus={false}
                    autoPlay
                    emulateTouch
                    transitionTime={1000}
                    interval={5000}
                    showIndicators
                    infiniteLoop
                    stopOnHover
                >
                    {data.map((n, i) =>
                        <div key={i} className="w-full h-full text-left whitespace-pre-line">
                            <div className="text-center font-semibold">
                                {n.title}
                            </div>
                            <div className="p-2 h-full flex flex-col items-center justify-center">
                                {n.type !== 'image' ? n.content : <img src={resolveFilePath(n.content)} className='h-full w-full' />}
                            </div>
                        </div>
                    )
                    }
                </Carousel >
            </div>}
            {data.length === 0 && <div className="h-full w-full flex justify-center items-center">
                NOTICE BOARD
            </div>}
        </div>
    </>
}