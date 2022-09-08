import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Head from "next/head"
import React, { HTMLAttributes } from "react"
import { useSelector } from "react-redux"
import { loadPlans, loadPropertyTypes } from "../redux/resource"
import { RootState, useAppDispatch } from "../store"

export const PaymentPlans = ({ value, handleChange, className, error }: {
    value?: string
    handleChange: (s: string) => void
    error?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
    const { status, data } = useSelector((store: RootState) => store.resourceSlice.plans)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (status === 'success' && data === undefined) {
            dispatch(loadPlans())
        }
    }, [status, data, dispatch])
    return <React.Fragment>
        <div className={className}>
            <FormControl size="small" fullWidth>
                <InputLabel>{'Payment Plan'}</InputLabel>
                <Select
                    value={value}
                    label="Payment Plan"
                    className="text-sm uppercase"
                    size="small"
                    onChange={(e) => handleChange(e.target.value)}
                >
                    {(status === 'success' && data !== undefined) && data.map((p, i) => <MenuItem className="uppercase text-sm" key={i} value={p.name} > {p.name} </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </React.Fragment>
}

export const PropertyType = ({ value, handleChange, className, error }: {
    value?: string
    handleChange: (s: string) => void
    error?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
    const { status, data } = useSelector((store: RootState) => store.resourceSlice.propertyTypes)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (status === 'success' && data === undefined) {
            dispatch(loadPropertyTypes())
        }
    }, [status, data, dispatch])
    return <React.Fragment>
        <div className={className}>
            <FormControl size="small" fullWidth>
                <InputLabel>{'Property Type'}</InputLabel>
                <Select
                    value={value}
                    label="Property Type"
                    className="text-sm uppercase"
                    size="small"
                    onChange={(e) => handleChange(e.target.value as string)}
                >
                    {(status === 'success' && data !== undefined) && data.map((p, i) => <MenuItem className="uppercase text-sm" key={i} value={p.name} > {p.name} </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </React.Fragment>
}