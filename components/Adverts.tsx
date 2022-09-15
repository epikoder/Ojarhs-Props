import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
// import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index";
import { resolveFilePath } from '../helpers/helpers'
import { RootState } from '../store'
import Slider from './Slider'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

export const SliderAdvert = () => {
  const { slider, state } = useSelector((store: RootState) => store.indexAdvertSlice)

  return <>
    {state !== 'success' && <Slider slider />}
    {state === 'success' &&
      <Carousel
        className={'h-full'}
        autoPlay={true}
        showIndicators={true}
        showStatus={false}
        infiniteLoop={true}
        transitionTime={1000}
        emulateTouch={true}
        showThumbs={false}
      >
        {slider.map((a, i) => <a href={a.link} target='_blank' rel="noreferrer" key={i}>
          <img src={resolveFilePath(a.photo)} className='h-full w-full object-cover' />
        </a>)}
      </Carousel>}
  </>
}

export const PropertyAdvert = () => {
  const { property, state } = useSelector((store: RootState) => store.indexAdvertSlice)
  const i = Math.round((property.length / 2))
  const f = property.slice(0, i)
  const s = property.slice(i + 1)
  return <>
    {state !== 'success' && <Slider slider />}
    {state === 'success' &&
      <div className='md:grid grid-cols-2 w-full h-full gap-1'>
        <Carousel
          className={'object-cover h-full w-full'}
          autoPlay={true}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
          stopOnHover={false}
          infiniteLoop={true}
          transitionTime={1000}
          emulateTouch={true}
          showThumbs={false}
          animationHandler='fade'
          interval={5000}
          onClickItem={(i) => console.log(i)}
        >
          {f.length > 0 ? f.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full object-cover' />)
            :
            (['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',]).map((s, i) =>
              <img key={i} src={'image/' + s} className={`h-full w-full object-cover`} />
            )
          }
        </Carousel>
        <Carousel
          className={'object-cover h-full w-full'}
          autoPlay={true}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
          stopOnHover={false}
          infiniteLoop={true}
          transitionTime={1000}
          emulateTouch={true}
          showThumbs={false}
          animationHandler='fade'
          interval={5000}
          onClickItem={(i) => console.log(i)}
        >
          {s.length > 0 ? s.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full object-cover' />)
            :
            (['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',]).map((s, i) =>
              <img key={i} src={'image/' + s} className={`h-full w-full object-cover`} />
            )
          }
        </Carousel>
      </div>
    }
  </>
}

function MiddleAdvert() {
  const { middle, state } = useSelector((store: RootState) => store.indexAdvertSlice)

  return (
    <div className='md:flex flex-row justify-center h-full'>
      {state !== 'success' && <Slider slider />}
      {state === 'success' &&
        <Carousel
          className={'h-full'}
          autoPlay={true}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
          stopOnHover={false}
          infiniteLoop={true}
          transitionTime={1000}
          emulateTouch={true}
          showThumbs={false}
          animationHandler='fade'
          interval={5000}
          onClickItem={(i) => console.log(i)}
        >
          {middle.length > 0 ? middle.map((a, i) => <div className='h-full w-full' key={i}>
            <img src={resolveFilePath(a.photo)} className='h-full w-full object-cover' />
          </div>) :
            (['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',]).map((s, i) =>
              <img key={i} src={'image/' + s} className={`h-full w-full object-cover`} />
            )}
        </Carousel>}
    </div>
  )
}

export default MiddleAdvert


