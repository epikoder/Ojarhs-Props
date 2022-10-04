import { TextField } from "@mui/material"
import React from "react"
import { loadAllTenants } from "../../actions/admin/tenant"
import { useAppDispatch } from "../../store"

export const SearchTenants = () => {
    const dispatch = useAppDispatch()
    const search = React.useRef<string>('')
    const lastKeyEvent = React.useRef<number>(0)
    const timer = React.useRef<ReturnType<typeof setTimeout>>()

    return <div className="w-full">
        <TextField
            onKeyUp={() => {
                lastKeyEvent.current = (new Date()).getTime()
                clearTimeout(timer.current)
                timer.current = setTimeout(() => {
                    const t = (new Date()).getTime() - lastKeyEvent.current
                    dispatch(loadAllTenants({ search: search.current }))
                }, 800)
            }}
            variant="outlined"
            size='small'
            className="w-full"
            placeholder="Name, Email, Phone..."
            onChange={(e) => {
                search.current = e.target.value
            }}
        />
    </div>
}
