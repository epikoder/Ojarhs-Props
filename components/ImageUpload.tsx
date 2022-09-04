import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { BASEURL } from "../constants"
import { RootState, useAppDispatch } from "../store"
import Loader from "./Loader"

export const ImageUpload = ({ value, handleUpload, required = false, disabled = false, message, width, height, forceValue }: {
    handleUpload?: (s: string, raw?: string) => void,
    required?: boolean,
    disabled?: boolean,
    value?: string
    forceValue?: boolean
    message?: React.ReactNode
    width?: string | number
    height?: string | number
}) => {
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>()

    function onChange() {
        setUrl('')
        var reader = new FileReader()
        reader.onload = async function (e) {
            setUrl(e.target.result as string)
            try {
                var req = new FormData()
                setLoading(true)
                req.set("photo", await (await fetch(e.target.result as string)).blob())
                const res = await fetch(BASEURL + "/upload", {
                    method: "POST",
                    body: req
                })
                setLoading(false)
                if (res.status !== 200) {
                    setUrl('')
                    return
                }
                var data = await (res).json() as {
                    status: 'success' | 'failed'
                    photo?: string
                }
                if (data.status === 'failed') {
                    setUrl('')
                    return
                }
                if (handleUpload !== undefined) {
                    handleUpload(data.photo, e.target.result as string)
                }

            } catch (error) {
                console.log(error);
                setUrl('')
                setLoading(false)
                if (handleUpload !== undefined) {
                    handleUpload('')
                }
            }
        }
        const uploader = ref.current;
        if (uploader !== undefined) {
            uploader.click()
        }
        reader.readAsDataURL(uploader.files[0])
    }
    return <>
        <div className="h-36 hover:cursor-pointer w-36 flex flex-col justify-center items-center bg-gray-300 rounded-md relative" onClick={() => {
            if (loading || disabled) return
            if (!required && url !== '') {
                setUrl('')
                if (handleUpload !== undefined) {
                    handleUpload('')
                }
                return
            }
            const uploader = ref.current;
            if (uploader !== undefined) {
                uploader.click()
            }
        }} style={{
            width: width,
            height: height
        }}>
            {
                (value !== undefined && (url === '' || forceValue)) ? <img src={value} alt="" className="object-cover h-full w-full rounded-md" /> :
                    (url === '' ? (<div className="p-1">
                        {message ?? 'SELECT PHOTO'}
                    </div>) : loading ? <Loader /> : <>
                        <div className="relative h-full w-full">
                            <img src={url} alt="" className="absolute object-cover h-full w-full rounded-md" />
                            <div className="hover:bg-gray-500 duration-300 transition-all text-transparent hover:text-black ease-in-out opacity-30 absolute flex flex-col justify-center items-center w-full h-full">
                            </div>
                            <div className="z-20 duration-300 transition-all text-transparent hover:text-black ease-in-out opacity-30 absolute flex flex-col justify-center items-center w-full h-full">
                                REMOVE
                            </div>
                        </div>
                    </>)
            }
        </div>
        <input ref={ref} type={"file"} className='hidden' onChange={onChange} disabled={disabled} accept='image/*' />
    </>
}


export const VideoUpload = ({ value, handleUpload, required = false, disabled = false, message, width, height, forceValue }: {
    handleUpload?: (s: string, raw?: Blob) => void,
    required?: boolean,
    disabled?: boolean,
    value?: Blob
    forceValue?: boolean
    message?: React.ReactNode
    width?: string | number
    height?: string | number
}) => {
    const [blob, setBlob] = useState<Blob>()
    const { access } = useSelector((store: RootState) => store.authSlice.token)
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState<string>(undefined)
    const ref = useRef<HTMLInputElement>()

    function onUpload() {
        setBlob(undefined)
        var reader = new FileReader()
        reader.onload = async function (e) {
            let videoBlob = new Blob([new Uint8Array(e.target.result as ArrayBuffer)], { type: 'video/mp4' });
            setBlob(videoBlob)
            try {
                var req = new FormData()
                setLoading(true)
                req.set("video", videoBlob)
                const res = await fetch(BASEURL + "/admin/upload-video", {
                    method: "POST",
                    body: req,
                    headers: {
                        authorization: `Bearer ${access}`
                    }
                })
                setLoading(false)
                if (res.status !== 200) {
                    setBlob(undefined)
                    return
                }
                var data = await (res).json() as {
                    status: 'success' | 'failed'
                    photo?: string,
                    message?: string
                }
                if (data.status === 'failed') {
                    setBlob(undefined)
                    setErrMessage(data.message)
                    return
                }
                if (handleUpload !== undefined) {
                    handleUpload(data.photo, videoBlob)
                }

            } catch (error) {
                console.log(error);
                setBlob(undefined)
                setLoading(false)
                if (handleUpload !== undefined) {
                    handleUpload('')
                }
            }
        }
        const uploader = ref.current;
        if (uploader !== undefined) {
            uploader.click()
        }
        reader.readAsArrayBuffer(uploader.files[0])
    }
    return <>
        <div className="h-36 hover:cursor-pointer w-36 flex flex-col justify-center items-center bg-gray-300 rounded-md relative" onClick={() => {
            if (loading || disabled) return
            const uploader = ref.current;
            console.log(uploader, blob)
            if (uploader !== undefined && blob === undefined) {
                uploader.click()
            }
        }} style={{
            width: width,
            height: height
        }}>

            {
                (value !== undefined && (blob === undefined || forceValue)) ?
                    (<video
                        src={value !== undefined && URL.createObjectURL(value)}
                        className="object-cover h-full w-full rounded-md"
                        controls />) :
                    (blob === undefined ? (<div className="p-1">
                        {errMessage ?? message ?? 'SELECT VIDEO'}
                    </div>) : loading ? <Loader /> : <>
                        <div className="relative h-full w-full">
                            <video
                                src={blob !== undefined && URL.createObjectURL(blob)}
                                className="object-cover h-full w-full rounded-md"
                                controls />
                            <div className="hover:bg-gray-500 duration-300 transition-all text-transparent hover:text-black ease-in-out opacity-30 absolute flex flex-col justify-center items-center w-full h-full">
                            </div>
                            <div className="z-20 duration-300 transition-all text-transparent hover:text-black ease-in-out opacity-30 absolute flex flex-col justify-center items-center w-full h-full">
                                REMOVE
                            </div>
                        </div>
                    </>)
            }
        </div>
        <input ref={ref} type={"file"} className='hidden' onChange={onUpload} disabled={disabled} accept='video/*' />
        {/* <video src={URL.createObjectURL(value)} className="object-cover h-full w-full rounded-md" autoPlay={true} /> */}
    </>
}

export const DocumentUpload = ({ documentType, handleUpload, required = false, disabled = false }: {
    documentType: string,
    handleUpload?: (s: string) => void,
    required?: boolean
    disabled?: boolean
}) => {
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const ref = useRef<HTMLInputElement>()
    const { access } = useSelector((store: RootState) => store.authSlice.token)
    const dispatch = useAppDispatch()

    function onUpload() {
        setUrl('')
        var reader = new FileReader()
        reader.onload = async function (e) {
            setUrl(e.target.result as string)
            try {
                var req = new FormData()
                setLoading(true)
                req.set("photo", await (await fetch(e.target.result as string)).blob())
                req.set("type", documentType)
                const res = await fetch(BASEURL + "/upload-document", {
                    method: "POST",
                    body: req,
                    headers: {
                        authorization: `Bearer ${access}`
                    }
                })
                setLoading(false)
                switch (res.status) {
                    case 200:
                        {
                            var data = await (res).json() as {
                                status: 'success' | 'failed'
                                photo?: string
                            }
                            if (data.status === 'failed') {
                                setUrl('')
                                return
                            }
                            console.log(data.photo)
                            handleUpload(data.photo)
                            break
                        }
                    case 400:
                        setUrl('')
                        setMessage('ERR: BAD IMAGE FORMAT')
                        break
                    case 401:
                        setUrl('')
                        setMessage('SESSION EXPIRED')
                        break
                    default:
                        setUrl('')
                }


            } catch (error) {
                console.log(error);
                setUrl('')
                setLoading(false)
            }
        }
        const uploader = ref.current;
        if (uploader !== undefined) {
            uploader.click()
        }
        reader.readAsDataURL(uploader.files[0])
    }
    return <>
        <div className="h-[50vh] hover:cursor-pointer w-80 flex flex-col justify-center items-center bg-gray-300 rounded-md relative" onClick={() => {
            if (loading || disabled || (documentType === '' || documentType === '0')) return
            if (!required && url !== '') {
                setUrl('')
                return
            }
            const uploader = ref.current;
            if (uploader !== undefined) {
                uploader.click()
            }
        }}>
            {
                url === '' ? (<div className="p-1">
                    {message !== '' ? message : 'SELECT PHOTO'}
                </div>) : loading ? <Loader /> : <>
                    <img src={url} alt="" className="absolute object-cover h-full w-full rounded-md" />
                </>
            }
        </div>
        <input ref={ref} type={"file"} className='hidden' onChange={onUpload} disabled={disabled} accept='image/*' />
    </>
}