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
          slider.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full' />)
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
      <div className="md:grid grid-cols-2 w-[100%] overflow-hidden space-y-2">
        <div className='2xl:h-[70vh] px-2 xl:h-[55vh] lg:h-[50vh] md:h-[45vh] sm:h-[60vh] h-[40vh]'>
          <Carousel
            className={'h-full'}
            autoPlay={true}
            showIndicators={true}
            showStatus={false}
            infiniteLoop={true}
            transitionTime={1000}
            emulateTouch={true}
            interval={4000}
            showThumbs={false}
            onClickItem={(i) => IsLinkValid(f[i].link) ? window.open(f[i].link, '_blank') : null}
          >
            {f.length > 0 ? f.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full' />)
              :
              (['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',]).map((s, i) =>
                <img key={i} src={'image/' + s} className={`h-full w-full object-cover`} />
              )
            }
          </Carousel>
        </div>
        <div className="bg-black text-center px-2 text-white 2xl:h-[70vh] xl:h-[55vh] lg:h-[50vh] md:h-[45vh] h-[35vh]">
          <Carousel
            className={'h-full'}
            autoPlay={true}
            showIndicators={true}
            showStatus={false}
            infiniteLoop={true}
            transitionTime={1000}
            interval={3000}
            emulateTouch={true}
            showThumbs={false}
            onClickItem={(i) => IsLinkValid(s[i].link) ? window.open(s[i].link, '_blank') : null}
          >
            {s.length > 0 ? s.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full' />)
              :
              (['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',]).map((s, i) =>
                <img key={i} src={'image/' + s} className={`h-full w-full object-cover`} />
              )
            }
          </Carousel>
        </div>
      </div>
    }
  </>
}

function MiddleAdvert() {
  const { middle, state } = useSelector((store: RootState) => store.indexAdvertSlice)

  return (
    <>
      {state === 'success' ?
        <Carousel
          className={'h-full'}
          autoPlay={true}
          showIndicators={true}
          showStatus={false}
          infiniteLoop={true}
          transitionTime={1000}
          emulateTouch={true}
          interval={5000}
          showThumbs={false}
          onClickItem={(i) => IsLinkValid(middle[i].link) ? window.open(middle[i].link, '_blank') : null}
        >
          {middle.length > 0 ? middle.map((a, i) => <img key={i} src={resolveFilePath(a.photo)} className='h-full w-full object-cover' />) :
            (['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',]).map((s, i) =>
              <img key={i} src={'image/' + s} className={`w-full object-cover`} />
            )}
        </Carousel>
        :
        <Slider slider />
      }
    </>
  )
}

export default MiddleAdvert


