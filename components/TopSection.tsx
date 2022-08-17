import React from 'react'
import Slider from './Slider'

function TopSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center mt-10 lg:h-[80vh] md:h-[50vh] h-[40vh] w-full ">
        <Slider />
        <div className="bg-black text-center items-center w-full lg:w-3/12 text-white">
            Aderts Goes in here
        </div>
    </div>
  )
}

export default TopSection