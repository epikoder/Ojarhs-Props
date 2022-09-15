import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { IsLinkValid, resolveFilePath } from '../helpers/helpers'
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
        onClickItem={(i) => IsLinkValid(slider[i].link) ? window.open(slider[i].link, '_blank') : null}
      >
        {slider.length > 0 ?
          slider.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full object-cover' />)
          :
          ['slider1.jpeg', 'slider2.jpeg',].map((s, i) =>
            <img key={i} src={'image/' + s} className={`h-full w-full object-cover`} />
          )
        }
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
      <div className='md:grid grid-cols-2 w-full h-full gap-1 md:gap-5 xl:gap-11 xl:px-24 md:px-12 px-2'>
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
          onClickItem={(i) => IsLinkValid(f[i].link) ? window.open(f[i].link, '_blank') : null}
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
          onClickItem={(i) => IsLinkValid(s[i].link) ? window.open(s[i].link, '_blank') : null}
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
          swipeable={false}
          onClickItem={(i) => IsLinkValid(middle[i].link) ? window.open(middle[i].link, '_blank') : null}
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


