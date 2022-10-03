import { Cancel, Visibility, VisibilityOff } from "@mui/icons-material"
import { Card, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { BASEURL } from "../constants"
import { HidePassword, ShowPassword } from "../features/TogglePassword"
import List from "../helpers/list"
import { Country } from "../Typing.d"

export const FormInput = ({ props }: {
    props: {
        title: string
        name?: string
        value?: string | number
        defaultValue?: string | number
        message?: string
        required?: boolean
        type?: React.HTMLInputTypeAttribute
        handleChange: (s: any) => void
    }
}) => {
    return <>
        <div className="my-2">
            <TextField
                label={props.title}
                variant="outlined"
                size="small"
                type={props.type}
                className={`w-full text-sm`}
                required={props.required}
                placeholder={props.title}
                defaultValue={props.defaultValue}
                value={props.value !== undefined ? props.value : undefined}
                error={props.message !== '' && props.message !== undefined}
                onChange={(e) => {
                    props.handleChange(e.target.value)
                }} />
        </div>
    </>
}

export const FormPhoneInput = ({ props }: {
    props?: {
        title: string
        name?: string
        required?: boolean
        message?: string
        type?: React.HTMLInputTypeAttribute
        value?: string | number
        handleChange: (s: any) => void
    }
}) => {
    return <>
        <div className="my-2">
            <TextField
                label={props.title}
                variant="outlined"
                size="small"
                type={props.type}
                className="w-full text-sm"
                value={props.value !== undefined ? props.value : ''}
                required={props.required}
                placeholder={"090XXXXXXXX"}
                error={props.message !== '' && props.message !== undefined}
                onChange={(e) => {
                    props.handleChange(e.target.value)
                }} />
        </div>
    </>
}

export const FormPasswordControlledInput = ({ props }: {
    props?: {
        title: string
        name: string
        requried?: boolean
        message?: string
        hidden: boolean
        handleChange: (s: any) => void
    }
}) => {
    const dispatch = useDispatch();
    return <>
        <div className="my-2">
            <FormControl sx={{ m: 1, width: '100%', margin: 0 }} variant="outlined" size="small">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    type={props.hidden ? 'text' : 'password'}
                    onChange={(e) => {
                        props.handleChange(e.target.value)
                    }}
                    error={props.message !== '' && props.message !== undefined}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => dispatch(ShowPassword())}
                                onMouseDown={() => dispatch(HidePassword())}
                                edge="end"
                            >
                                {props.hidden ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </div>
    </>
}

export const FormPasswordInput = ({ props }: {
    props?: {
        title: string
        name: string
        requried?: boolean
        message?: string
        handleChange: (s: any) => void
    }
}) => {
    const [hidden, setHidden] = React.useState<boolean>(true)
    const toggle = () => setHidden(!hidden)
    return <>
        <div className="my-2">
            <FormControl sx={{ m: 1, width: '100%', margin: 0 }} variant="outlined" size="small">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    type={!hidden ? 'text' : 'password'}
                    onChange={(e) => {
                        props.handleChange(e.target.value)
                    }}
                    error={props.message !== '' && props.message !== undefined}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggle}
                                onMouseDown={toggle}
                                edge="end"
                            >
                                {!hidden ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </div>
    </>
}

export const FormConfirmPasswordInput = ({ props }: {
    props?: {
        title: string
        name: string
        requried?: boolean
        password?: string
    }
}) => {
    const [isHidden, setIsHidden] = React.useState(true)
    const [value, setValue] = React.useState('')

    return <>
        <div className="my-2">
            <FormControl sx={{ m: 1, width: '100%', margin: 0 }} variant="outlined" size="small">
                <InputLabel>{props.title}</InputLabel>
                <OutlinedInput
                    type={!isHidden ? 'text' : 'password'}
                    error={props.password !== "" && props.password !== undefined && props.password !== value}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setIsHidden(!isHidden)}
                                onMouseDown={() => setIsHidden(!isHidden)}
                                edge="end"
                            >
                                {isHidden ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={props.title}
                />
            </FormControl>
        </div>
    </>
}

export const FormCountryInput = ({ props }: {
    props?: {
        title: string
        required?: boolean
        handleChange: <T>(s: T) => void
        value?: string
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
        }
    }
    useEffect(() => {
        fetchCountries()
    }, [])


    let value = props.value !== undefined ? (countries.find((c) => c.code === props.value || c.name === props.value)) : undefined
    return <>
        <div className="my-2">
            <FormControl size="small" fullWidth>
                <InputLabel>{'Country'}</InputLabel>
                <Select
                    value={value !== undefined ? (value as Country).code : ''}
                    label="Country"
                    className="text-sm uppercase"
                    size="small"
                    onChange={(e) => props.handleChange(e.target.value as string)}
                >
                    {countries !== undefined && countries.map((c, i) =>
                        <MenuItem className="uppercase text-sm" key={i} value={c.code} > {c.name} </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    </>
}

export const ApplianceInput = ({ value, handleChange }: {
    handleChange?: (s: string[]) => void
    value?: string[]
}): JSX.Element => {
    const [list, setList] = React.useState<string[]>(value || [])
    const [text, setText] = React.useState<string>('')
    const ref = React.useRef(false)

    React.useEffect(() => {
        if (handleChange !== undefined) {
            handleChange(list)
        }
    }, [list])

    React.useEffect(() => {
        if (value != undefined && value.length > 0 && value[0] !== "" && ref.current == false) {
            ref.current = true
            setList(value)
        }
    }, [value])

    return <>
        <Card className="min-h-[3rem] rounded-md flex flex-wrap p-1" >
            {(list).map((s, i) =>
                <Card key={i} className='px-2 py-1 flex items-center text-sec space-x-1 bg-gray-500 rounded-full m-1'>
                    <span>{s}</span>
                    <Cancel fontSize="small" onClick={() => {
                        setList(List.remove(list, i))
                    }} />
                </Card>)}
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="px-2 outline-none max-w-[320px] w-full rounded-md"
                style={{
                    backgroundColor: 'transparent',
                }}
                type={'text'}
                placeholder='Enter to save'
                onKeyDownCapture={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        if (text === '') return
                        if (!/^[a-zA-Z0-9 ]{2,256}/.test(text.trim())) return
                        setList([...list, text])
                        setText('')
                    }
                }} />
        </Card>
    </>
}