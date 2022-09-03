import { XCircleIcon } from "@heroicons/react/outline"
import React from "react"
import { Map } from "../../Typing.d"
import { ImageUpload } from "../ImageUpload"

export const GalleryUploader = ({ type, width, height, title, errMessage, handleChange }: {
    type: 'image' | 'video'
    width: string | number
    height?: string | number
    title: string
    errMessage?: string
    handleChange?: (links: string[]) => void
}) => {
    const [files, setFiles] = React.useState<Map<string>>({})

    React.useEffect(() => {
        console.log("FILES", files)
    }, [files])

    return <React.Fragment>
        <span className='text-gray-500 mb-2 p-2'>{title} - <span className="text-xs lg:text-sm font-serif">{`${Object.keys(files).length} uploaded`}</span></span>

        <div className="p-2">
            <div className="h-44 flex justify-left overflow-y-scroll">
                {Object.keys(files).map((val, index) => {
                    console.log("REBUILDING")
                    if (type === 'image') {
                        return <div key={index} className="relative mx-2" style={{
                            width: width,
                            height: height,
                        }}>
                            <div className="absolute z-30 text-orange-500 cursor-pointer top-1 right-1"
                                onClick={() => {
                                    console.log()
                                    // setFiles(files.slice(0, index).concat(files.slice(index + 1, files.length)))
                                    // setFiles
                                }}>
                                <XCircleIcon width={25} />
                            </div>
                            <ImageUpload
                                value={files[val]}
                                message={<div className="text-sm text-gray-500">{"GALLERY IMAGE"}</div>}
                                height={height} width={width}
                                handleUpload={(s) => {
                                    let f = files
                                    f[index] = s
                                    setFiles(f)
                                    console.log(files)
                                    if (handleChange !== undefined) {
                                        // handleChange(f)
                                    }
                                }}
                            />
                        </div>
                    }
                    return <ImageUpload key={index} />
                })}
            </div>
            <div className="text-xs lg:text-sm text-center flex justify-center">
                <button className={`px-6 py-2 ${Object.keys(files).length >= 20 ? 'bg-gray-500' : 'bg-red'} uppercase text-white rounded-xl`}
                    onClick={() => {
                        setFiles({
                            ...files, [Object.keys(files).length]: undefined
                        })
                    }} disabled={Object.keys(files).length >= 20}>
                    Add
                </button>
            </div>
            <div className='text-red-500 text-center text-sm my-1'>{errMessage} </div>
        </div>
    </React.Fragment>
}