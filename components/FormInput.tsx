import { EyeOffIcon } from "@heroicons/react/outline"
import { EyeIcon } from "@heroicons/react/solid"
import React from "react"
import { useDispatch } from "react-redux"
import { HidePassword, ShowPassword } from "../features/TogglePassword"

export const FormInput = ({ props }: {
    props?: {
        title: String
        type?: React.HTMLInputTypeAttribute           
        handleChange?: <T>(s: T) => {}
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
                placeholder={props.title.toString()}
                className='text-gray-800 bg-transparent outline-none'
                onChange={(e) => props.handleChange(e.target.value)}
            />
        </label>
    </>
}

export const FormPasswordInput = ({ props }: {
    props?: {
        title: String
        hidden: boolean
        handleChange?: <T>(s: T) => {}
    }
}) => {
    const dispatch = useDispatch();
    return <>
        <label
            htmlFor=''
            className='flex flex-col relative bg-gray-200 shadow-sm shadow-gray-400 rounded-lg p-2'
        >
            <span className='text-gray-600 mb-2 text-xs flex justify-between'>
                {props.title}
            </span>
            <input
                type={props.hidden ? "text" : "password"}
                placeholder='password'
                className='text-gray-400 bg-transparent outline-none'
            />

            {props.hidden ? (
                <EyeOffIcon
                    onClick={() => dispatch(ShowPassword())}
                    className='w-4 h-4 absolute bottom-3 right-3'
                />
            ) : (
                <EyeIcon
                    onClick={() => dispatch(HidePassword())}
                    className='w-4 h-4 absolute bottom-3 right-2'
                />
            )}
        </label>
    </>
}