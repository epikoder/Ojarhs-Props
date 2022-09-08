import React, { HTMLAttributes } from 'react'

export const OjarhButton = ({ text, position = 'center', rounded = false, onClick, fullWidth = false, className = 'hover:bg-red-600' }: {
  text: string
  position?: 'center' | 'start' | 'end'
  rounded?: boolean
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}) => {
  return <React.Fragment>
    <div className={`${fullWidth ? '' : 'flex'} justify-${position} items-center`}>
      <div
        onClick={onClick}
        className={`text-white uppercase bg-red-700 ${className} hover:text-white border px-2 py-1 duration-300 transition-all ease-in-out cursor-pointer ${rounded ? 'rounded-md' : ''}`}>
        {text}
      </div>
    </div>
  </React.Fragment>
}

function Button({ text, className }: { text: string, className?: string }) {
  return (
    <div className={`px-4 py-2 ${className !== '' && className !== undefined ? className : 'bg-red text-white'}`}>
      <h1>{text}</h1>
    </div>
  )
}

export default Button