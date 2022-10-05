import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";
import { RootState } from "../store";

export const NoticeBoard = () => {
    const { data, state } = useSelector((store: RootState) => store.indexSlice.notice)
    return <>

        {data.length > 0 && <div className="h-full">
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
                    <div key={i} className="h-full w-full text-left whitespace-pre-line">
                        <div className="font-semibold bg-black text-sec text-center rounded-sm p-1">
                            OJARH NOTICE
                        </div>
                        {n.type === 'text' && <div className="text-center font-semibold">
                            {n.title}
                        </div>}
                        <div className="p-2 flex flex-col items-center justify-center h-full">
                            {n.type !== 'image' ? n.content : <img src={resolveFilePath(n.content)} className='h-full object-cover' />}
                        </div>
                    </div>
                )
                }
            </Carousel >
        </div>}
        {data.length === 0 && <div className="h-full w-full flex justify-center items-center">
            NOTICE BOARD
        </div>}

    </>
}