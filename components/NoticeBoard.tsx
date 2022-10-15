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
                autoPlay={false}
                emulateTouch
                transitionTime={1000}
                interval={5000}
                showIndicators={false}
                infiniteLoop
                stopOnHover
            >
                {data.map((n, i) =>
                    <div key={i} className="h-full w-full text-left whitespace-pre-line overflow-scroll">
                        {
                            n.type === 'text' && <div className="font-semibold bg-black text-sec text-center rounded-sm p-1">
                                OJARH NOTICE
                            </div>
                        }
                        {n.type === 'text' && <div className="text-center font-semibold">
                            {n.title}
                        </div>}
                        {n.type === 'image' && <img src={resolveFilePath(n.content)} className='h-full object-contain' />}
                        {n.type === 'text' && <div className="p-2 overflow-y-scroll text-center">
                            {n.content}
                        </div>}
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