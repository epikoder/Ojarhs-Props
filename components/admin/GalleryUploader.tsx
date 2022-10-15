import { Cancel } from "@mui/icons-material"
import { Button, Card, IconButton } from "@mui/material"
import React from "react"
import List from "../../helpers/list"
import { ImageUpload, VideoUpload } from "../ImageUpload"

type FilesType = {
    file: string
    raw: string | Blob
}

export const GalleryUploader = ({ type, width, height, title, errMessage, handleChange, pre }: {
    type: 'image' | 'video'
    width: number
    height?: number
    title: string
    errMessage?: string
    handleChange?: (links: string[]) => void
    pre?: number
}) => {
    const [files, setFiles] = React.useState<FilesType[]>([])

    const remove = (index: number) => {
        setFiles(List.remove<FilesType>(files, index))
    }

    const onUpload = (s: string, index: number, raw?: string | Blob,) => {
        let f = files
        f[index] = {
            file: s,
            raw: raw
        }
        setFiles(f)
        if (handleChange !== undefined) {
            handleChange(files.map(v => v.file))
        }
    }

    return <React.Fragment>
        <span className='text-sec mb-2 p-2'>{title} - <span className="text-xs text-red-500 lg:text-sm font-serif">{`${Object.keys(files).length} selected`}</span></span>

        <Card className="p-2 bg-main">
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
                            <IconButton className="absolute z-30 text-orange-500 cursor-pointer top-1 right-1"
                                onClick={() => remove(index)}>
                                <Cancel width={25} />
                            </IconButton>
                            <ImageUpload
                                value={val.raw as string}
                                forceValue={true}
                                message={<div className="text-sm text-gray-500">{"GALLERY IMAGE"}</div>}
                                height={height} width={width}
                                handleUpload={(s, raw) => onUpload(s, index, raw)}
                            />
                        </div>
                    }
                    return <div key={index} className="relative mx-2" style={{
                        width: width,
                        height: height,
                    }}>
                        <IconButton className="absolute z-30 bottom-2 right-[45%]"
                            onClick={() => remove(index)}>
                            <Cancel width={25} />
                        </IconButton>
                        <VideoUpload
                            value={val.raw as Blob}
                            forceValue={true}
                            message={<div className="text-sm text-gray-500">{"GALLERY VIDEO"}</div>}
                            height={height} width={width}
                            handleUpload={(s, raw) => onUpload(s, index, raw)}
                        />
                    </div>
                })}
            </div>
            <div className="text-xs lg:text-sm text-center flex justify-center">
                <Button
                    disabled={pre + files.length >= 20}
                    variant='outlined'
                    size='small'
                    onClick={() => {
                        setFiles([
                            ...files, { file: undefined, raw: undefined }
                        ])
                    }}>
                    Add
                </Button>
            </div>
            <div className='text-red-500 text-center text-sm my-1'>{errMessage} </div>
        </Card>
    </React.Fragment >
}