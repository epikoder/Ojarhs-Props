import React from 'react'
import { HomeNotificationBox } from './HomeNotificationBox'
import { Search } from './Search'
import Slider from './Slider'

function TopSection() {
  return (
    <div className='flex justify-center bg-white'>
      <div className="md:grid gap-1 md:grid-cols-6 lg:grid-cols-7 my-2 mx-2 xl:max-w-[90%]">
        <div className='col-span-6 md:col-span-4 lg:col-span-5 lg:h-[70vh] xl:h-[60vh] md:h-[50vh] h-[45vh]'>
          <Slider images={[
            "1", "2", "3"
          ]} />
        </div>
        <div className='md:hidden bg-white'>
          <Search />
        </div>
        <div className="bg-black text-center col-span-6 md:col-span-2 text-white lg:h-[70vh] xl:h-[60vh] md:h-[50vh] h-[35vh] rounded-lg">
          <HomeNotificationBox />
        </div>
      </div>
    </div>
  )
}

export default TopSection