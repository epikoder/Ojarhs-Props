import { Card } from '@mui/material'
import React from 'react'
import { Advert } from '../Typing.d'
import { SliderAdvert } from './Adverts'
import { NoticeBoard } from './NoticeBoard'
import Slider from './Slider'

function TopSection() {
  return (
    <Card className='flex justify-center'>
      <div className="md:grid grid-cols-8 lg:grid-cols-9 w-[100%]">
        <div className='col-span-5 lg:col-span-6 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] sm:h-[60vh] h-[40vh]'>
          <SliderAdvert />
        </div>
        <div className="bg-black text-center col-span-3 text-white 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] h-[35vh]">
          <NoticeBoard />
        </div>
      </div>
    </Card>
  )
}

export default TopSection