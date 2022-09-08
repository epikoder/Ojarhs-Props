import React from 'react'


function FT({ icon, title, details }: {
  icon: JSX.Element
  title: string
  details: JSX.Element
}) {
  return (
    <div className='text-white text-center'>
      <div className='flex justify-center'>{icon}</div>
      <div className='font-thin text-sm'>{title}</div>
      <div className='text-sm font-thin font-serif' style={{
        overflowWrap: 'anywhere'
      }}>{details}</div>
    </div>
  )
}

export default FT