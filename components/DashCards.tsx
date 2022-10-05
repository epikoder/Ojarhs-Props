import { ArrowForwardIos } from '@mui/icons-material'
import { Button, Card, CircularProgress } from '@mui/material'
import React from 'react'

function DashCards({ name, value, className, endIcon, func }: {
  name: string
  value: string | number
  endIcon?: React.ReactNode
  className?: string
  func?: VoidFunction
}) {
  return (
    <Card className={`h-[15vh] grid grid-cols-7 rounded-md hover:opacity-80 transit ${className || ''}`}>
      <div className='col-span-5 p-4 flex flex-col text-white justify-between'>
        <div className='uppercase text-md'>
          {name}
        </div>
        <div className='text-2xl lg:text-4xl font-semibold'
          style={{ fontFamily: 'Space Grotesk' }}
        >
          {value}
        </div>
      </div>
      <div className='col-span-2 flex flex-col items-center justify-center relative'>
        {endIcon}
        {func !== undefined && <>
          <CardProcess handleClick={func} />
        </>}
      </div>
    </Card >
  )
}

const CardProcess = ({ handleClick }: {
  handleClick: VoidFunction
}) => {
  const [loading, setLoading] = React.useState(false)
  return <Button className='absolute cursor-pointer bottom-0 right-0 px-2 py-1'
    variant='outlined'
    size='small'
    endIcon={loading ? <CircularProgress size={14} /> : <ArrowForwardIos fontSize='small' />}
    disabled={loading}
    onClick={() => {
      setLoading(true)
      handleClick()
      setTimeout(() => setLoading(false), 2000)
    }}
  >
    export
  </Button>
}
export default DashCards