import { Card } from "@mui/material"
import React from "react"

export const Info = ({ title, value }: {
    title: string
    value: number | string
}) => {
    return <React.Fragment>
        <Card elevation={1} className='p-1 px-2 max-w-md'>
            <div className="text-xs lg:text-sm text-gray-300">
                {title}
            </div>
            <div className="text-sm text-gray-100 ellipse">
                {value}
            </div>
        </Card>
    </React.Fragment>
}