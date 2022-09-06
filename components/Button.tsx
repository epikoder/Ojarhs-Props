import React from 'react'

function Button({ text, className }: { text: string, className?: string }) {
  return (
    <div className={`px-4 py-2 ${className !== '' && className !== undefined ? className : 'bg-red text-white'}`}>
      <h1>{text}</h1>
    </div>
  )
}

export default Button