import { EyeOffIcon } from "@heroicons/react/outline"
import { EyeIcon } from "@heroicons/react/solid"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { BASEURL } from "../constants"
import { HidePassword, ShowPassword } from "../features/TogglePassword"
import { Country } from "../Typing.d"

export const FormInput = ({ props }: {
    props?: {
        title: string
        name?: string
        message?: string
        required?: boolean
        type?: React.HTMLInputTypeAttribute
        handleChange?: <T>(s: T) => void
    }
}) => {
    return <>
        <label
            htmlFor=''
            className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg px-4 py-2 my-2'
        >
            <span className='text-gray-600 mb-2 text-sm idden'>{props.title}</span>
            <input
                type={props.type}
                placeholder={props.title}
                className='text-gray-500 bg-transparent outline-none'
                onChange={(e) => props.handleChange(e.target.value)}
                required={props.required}
            />
            <span className='text-red-600 font-serif mb-2 text-xs text-center idden'>{props.message}</span>
        </label>
    </>
}

export const FormPhoneInput = ({ props }: {
    props?: {
        title: string
        name?: string
        required?: boolean
        message?: string
        type?: React.HTMLInputTypeAttribute
        handleChange?: <T>(s: T) => void
    }
}) => {
    return <>
        <label
            htmlFor=''
            className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg px-4 py-2 my-2'
        >
            <span className='text-gray-600 mb-2 text-sm idden'>{props.title}</span>
            <input
                type={props.type}
                placeholder={"090XXXXXXXX"}
                className='text-gray-500 bg-transparent outline-none'
                onChange={(e) => props.handleChange(e.target.value)}
                required={props.required}
            />
            <span className='text-red-600 font-serif mb-2 text-xs text-center idden'>{props.message}</span>
        </label>
    </>
}

export const FormPasswordInput = ({ props }: {
    props?: {
        title: string
        name: string
        requried?: boolean
        message?: string
        hidden: boolean
        handleChange?: <T>(s: T) => void
    }
}) => {
    const dispatch = useDispatch();
    return <>
        <label
            htmlFor=''
            className='flex flex-col relative bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2 my-2'
        >
            <span className='text-gray-600 mb-2 text-xs flex justify-between'>
                {props.title}
            </span>
            <div className="flex items-center justify-between">
                <input
                    type={props.hidden ? "text" : "password"}
                    placeholder={props.title}
                    className='text-gray-500 bg-transparent outline-none w-full'
                    onChange={(e) => props.handleChange(e.target.value)}
                    required={props.requried}
                />

                {props.hidden ? (
                    <EyeOffIcon
                        onClick={() => dispatch(ShowPassword())}
                        className='w-4 h-4 bottom-3 right-3'
                    />
                ) : (
                    <EyeIcon
                        onClick={() => dispatch(HidePassword())}
                        className='w-4 h-4 bottom-3 right-2'
                    />
                )}
            </div>
            <span className='text-red-600 font-serif mb-2 text-xs text-center idden'>{props.message}</span>
        </label>
    </>
}

export const FormCountryInput = ({ props }: {
    props?: {
        title: string
        required?: boolean
        handleChange?: <T>(s: T) => void
    }
}) => {
    const [countries, setCountries] = useState<Country[]>([])
    var fetchCountries = async () => {
        try {
            var res = await fetch(BASEURL + "/resources/countries")
            if (res.status != 200) {
                return
            }
            setCountries((await res.json() as {
                data: Country[],
                status: string
            }).data)
        } catch (error) {
            console.log();
        }
    }
    useEffect(() => {
        fetchCountries()
    }, [])


    return <>
        <label
            htmlFor=''
            className='flex flex-col bg-gray-200 shadow-sm shadow-gray-400 rounded-lg px-4 py-2 my-2'
        >
            <span className='text-gray-600 mb-2 text-sm idden'>{props.title}</span>
            <select key={"se"} onChange={(e) => { props.handleChange(e.target.value) }} className='my-2' required={props.required} >
                <option key={"unique"} value={"Select country"}>Select Country</option>
                {countries !== undefined && countries.map((c, i) => <>
                    <option key={i} value={c.code}>{c.name}</option>
                </>)}
            </select>
        </label>
    </>
}
