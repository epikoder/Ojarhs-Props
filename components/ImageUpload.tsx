import Image from "next/image"
import React, { useRef, useState } from "react"
import { BASEURL } from "../constants"
import Loader from "./Loader"

export const ImageUpload = ({ handleUpload, required = false }: { handleUpload?: (s: string) => void, required?: boolean }) => {
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>()
    function onUpload() {
        setUrl('')
        var reader = new FileReader()
        reader.onload = async function (e) {
            setUrl(e.target.result as string)
            try {
                var req = new FormData()
                setLoading(true)
                req.set("photo", await (await fetch(e.target.result as string)).blob())
                const res = await fetch(BASEURL + "/auth/register/upload", {
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
                handleUpload(data.photo)

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
        <div className="h-36 hover:cursor-pointer w-36 flex flex-col justify-center items-center bg-gray-300 rounded-md relative" onClick={() => {
            if (loading) return
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
                    SELECT PHOTO
                </div>) : loading ? <Loader /> : <>
                    <div className="relative h-full w-full">
                        <img src={url} alt="" className="absolute object-cover h-full w-full rounded-md" />
                        <div className="hover:bg-gray-500 duration-300 transition-all text-transparent hover:text-black ease-in-out opacity-30 absolute flex flex-col justify-center items-center w-full h-full">
                        </div>
                        <div className="z-20 duration-300 transition-all text-transparent hover:text-black ease-in-out opacity-30 absolute flex flex-col justify-center items-center w-full h-full">
                            REMOVE
                        </div>
                    </div>
                </>
            }
        </div>
        <input ref={ref} type={"file"} className='hidden' onChange={onUpload} />
    </>
}