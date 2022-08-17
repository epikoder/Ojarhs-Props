import React from 'react'


function FT({icon, title, details}) {
  return (
    <div className='text-white flex-col flex gap-2 text-center items-center justify-center font-body'>
        <div className='w-10 '>{icon}</div>
        <h1 className='font-thin'>{title}</h1>
        <p className='text-sm font-thin font-serif'>{details}</p>
    </div>
  )
}

export default FT