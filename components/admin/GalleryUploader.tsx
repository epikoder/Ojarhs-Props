import { XCircleIcon } from "@heroicons/react/outline"
import React from "react"
import { Map } from "../../Typing.d"
import { ImageUpload, VideoUpload } from "../ImageUpload"

type FilesType = {
    file: string
    raw: string | Blob
}[]

export const GalleryUploader = ({ type, width, height, title, errMessage, handleChange }: {
    type: 'image' | 'video'
    width: number
    height?: number
    title: string
    errMessage?: string
    handleChange?: (links: string[]) => void
}) => {
    const [files, setFiles] = React.useState<FilesType>([])

    return <React.Fragment>
        <span className='text-gray-500 mb-2 p-2'>{title} - <span className="text-xs text-red-500 lg:text-sm font-serif">{`${Object.keys(files).length} selected`}</span></span>

        <div className="p-2">
            <div className="h-44 flex justify-left overflow-x-scroll overflow-y-hidden">
                {files.length === 0 && <>
                    <div className="h-full w-full flex text-gray-400 justify-center items-center">
                        <div className="uppercase text-sm">
                            {`UPLOAD GALLERY ${type}`}
                        </div>
                    </div>
                </>}
                {(files).map((val, index) => {
                    if (type === 'image') {
                        return <div key={index} className="relative mx-2" style={{
                            width: width,
                            height: height,
                        }}>
                            <div className="absolute z-30 text-orange-500 cursor-pointer top-1 right-1"
                                onClick={() => {
                                    const f = files.slice(0, index).concat(files.slice(index + 1, files.length))
                                    setFiles(f)
                                    if (handleChange !== undefined) {
                                        handleChange(f.map(v => v.file))
                                    }
                                }}>
                                <XCircleIcon width={25} />
                            </div>
                            <ImageUpload
                                value={val.raw as string}
                                forceValue={true}
                                message={<div className="text-sm text-gray-500">{"GALLERY IMAGE"}</div>}
                                height={height} width={width}
                                handleUpload={(s, raw) => {
                                    let f = files
                                    f[index] = {
                                        file: s,
                                        raw: raw
                                    }
                                    setFiles(f)
                                    if (handleChange !== undefined) {
                                        handleChange(files.map(v => v.file))
                                    }
                                }}
                            />
                        </div>
                    }
                    return <div key={index} className="relative mx-2" style={{
                        width: width,
                        height: height,
                    }}>
                        <div className="absolute z-30 text-orange-500 cursor-pointer bottom-2 right-[45%]"
                            onClick={() => {
                                const f = files.slice(0, index).concat(files.slice(index + 1, files.length))
                                setFiles(f)
                                if (handleChange !== undefined) {
                                    handleChange(f.map(v => v.file))
                                }
                            }}>
                            <XCircleIcon width={25} />
                        </div>
                        <VideoUpload
                            value={val.raw as Blob}
                            forceValue={true}
                            message={<div className="text-sm text-gray-500">{"GALLERY VIDEO"}</div>}
                            height={height} width={width}
                            handleUpload={(s, raw) => {
                                let f = files
                                f[index] = {
                                    file: s,
                                    raw: raw as Blob
                                }
                                setFiles(f)
                                if (handleChange !== undefined) {
                                    handleChange(files.map(v => v.file))
                                }
                            }}
                        />
                    </div>
                })}
            </div>
            <div className="text-xs lg:text-sm text-center flex justify-center">
                <button className={`px-6 py-2 ${Object.keys(files).length >= 20 ? 'bg-gray-500' : 'bg-red'} uppercase text-white rounded-xl`}
                    onClick={() => {
                        setFiles([
                            ...files, { file: undefined, raw: undefined }
                        ])
                    }} disabled={(files).length >= 20}>
                    Add
                </button>
            </div>
            <div className='text-red-500 text-center text-sm my-1'>{errMessage} </div>
        </div>
    </React.Fragment >
}