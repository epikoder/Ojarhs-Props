import React from 'react'
import { HomeNotificationBox } from './HomeNotificationBox'
import { Search } from './Search'
import Slider from './Slider'

function TopSection() {
  return (
    <div className='flex justify-center bg-white'>
      <div className="md:grid md:grid-cols-6 lg:grid-cols-7 w-[100%]">
        <div className='col-span-6 md:col-span-4 lg:col-span-5 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] sm:h-[60vh] h-[40vh]'>
          <Slider demo={true} />
        </div>
        <div className='md:hidden bg-white'>
          <Search />
        </div>
        <div className="bg-black text-center col-span-6 md:col-span-2 text-white 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] sm:h-[60vh] h-[40vh]">
          <HomeNotificationBox />
        </div>
      </div>
    </div>
  )
}

export default TopSection