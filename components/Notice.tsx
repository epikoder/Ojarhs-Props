import React from 'react'

function Notice() {
  return (
    <div className='lg:h-[30vh]  flex w-full flex-col lg:flex-row gap-4 lg:gap-0 px-4'>
        <div className='lg:w-4/12 bg-black text-white w-full '>
            Notice goes in here
        </div>

        <div className='lg:w-8/12 w-full'>
            <img src="/image/sign2.jpg" alt="" className='w-full h-full' />
        </div>
    </div>
  )
}

export default Notice