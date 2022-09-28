import { ArrowForwardIos } from '@mui/icons-material'
import { Card } from '@mui/material'
import React from 'react'

function DashCards({ name, value, className, endIcon }: {
  name: string
  value: number
  endIcon?: React.ReactNode
  className?: string
}) {
  return (
    <Card className={`h-[15vh] grid grid-cols-7 rounded-md cursor-pointer hover:opacity-90 transit ${className || ''}`}>
      <div className='col-span-5 p-4 flex flex-col text-white justify-between'>
        <div className='uppercase text-md'>
          {name}
        </div>
        <div className='text-4xl font-semibold'
          style={{ fontFamily: 'Space Grotesk' }}
        >
          {value}
        </div>
      </div>
      <div className='col-span-2 flex flex-col items-center justify-center'>
        {endIcon}
      </div>
    </Card>
  )
}

export default DashCards