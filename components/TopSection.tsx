import React from 'react'
import Slider from './Slider'

function TopSection() {
  return (
    <div className="grid grid-rows-2 md:grid-rows-1 lg:grid-rows-1 gap-1 md:grid-cols-6 lg:grid-cols-7 mt-8 mx-2 lg:mx-4 lg:h-[50vh] md:h-[40vh] h-[70vh]">
      <div className='col-span-6 md:col-span-4 lg:col-span-5 h-full'>
        <Slider images={[
          "1", "2", "3"
        ]} />
      </div>
      <div className="bg-black text-center col-span-6 md:col-span-2 text-white lg:h-[70vh] md:h-[40vh] h-[35vh]">
        <div className='w-full'>
          Notification Box
        </div>
      </div>
    </div>
  )
}

export default TopSection