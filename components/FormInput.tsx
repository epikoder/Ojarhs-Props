import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { BASEURL } from "../constants"
import { HidePassword, ShowPassword } from "../features/TogglePassword"
import { Country } from "../Typing.d"

export const FormInput = ({ props }: {
    props: {
        title: string
        name?: string
        message?: string
        required?: boolean
        type?: React.HTMLInputTypeAttribute
        handleChange?: (s: any) => void
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
        handleChange?: (s: any) => void
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
                required={props.required}
                placeholder={"090XXXXXXXX"}
                error={props.message !== '' && props.message !== undefined}
                onChange={(e) => {
                    props.handleChange(e.target.value)
                }} />
        </div>
    </>
}

export const FormPasswordInput = ({ props }: {
    props?: {
        title: string
        name: string
        requried?: boolean
        message?: string
        hidden: boolean
        handleChange?: (s: any) => void
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
        handleChange?: <T>(s: T) => void
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


    return <>
        <div className="my-2">
            <FormControl size="small" fullWidth>
                <InputLabel>{'Country'}</InputLabel>
                <Select
                    value={props.value !== undefined ? props.value : ''}
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
