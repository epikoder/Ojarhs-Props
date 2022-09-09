import Image from 'next/image'
import React from 'react'

function Adverts() {
  return (
    <div className='md:flex flex-row justify-center'>
      <img
        src='/image/ads1.jpg'
        alt=''
        className='max-w-[99%] md:max-w-[50%] object-cover'
      />
      <img
        src='/image/ads2.jpg'
        alt=''
        className='max-w-[99%] md:max-w-[50%] object-cover'
      />
    </div>
  )
}

export default Adverts


