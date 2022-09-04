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
        <select
            required
            value={value}
            className={`${className ?? "outline-none bg-transparent text-gray-600"} ${error && 'outline-red-500'}`}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value={""}>Choose Payment type</option>
            {(status === 'success' && data !== undefined) && data.map((p, i) => <option key={i} value={p.name} > {p.name} </option>)}
        </select>
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
        <select
            required
            value={value}
            className={`${className ?? "outline-none bg-transparent text-gray-600"} ${error && 'outline-red-500'}`}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value={""}>Choose property type</option>
            {(status === 'success' && data !== undefined) && data.map((p, i) => <option key={i} value={p.name} > {p.name} </option>)}
        </select>
    </React.Fragment>
}