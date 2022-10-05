import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";

function Slider({ images = [], className, advert = false, thumbs = false, slider = false }: {
  images?: string[],
  className?: string,
  advert?: boolean
  thumbs?: boolean
  slider?: boolean
}) {
  return (
    <Carousel
      className={'h-full'}
      autoPlay={true}
      showIndicators={true}
      showStatus={false}
      showThumbs={thumbs}
      infiniteLoop={true}
      transitionTime={1000}
      emulateTouch={true}
    >
      {!advert && !slider ?
        images.map((s, i) =>
          <img key={i} src={resolveFilePath(s)} className={`h-full w-full object-cover ${className}`} />
        )
        : (
          !advert && slider ?
            (images.length === 0 ? ['slider1.jpeg', 'slider2.jpeg',] : images).map((s, i) =>
              <img key={i} src={images.length === 0 ? 'image/' + s : resolveFilePath(s)} className={`h-full w-full object-cover ${className}`} />
            ) :
            (images.length === 0 ? ['advert1.jpeg', 'advert2.jpeg', 'advert3.jpeg',] : images).map((s, i) =>
              <img key={i} src={images.length === 0 ? 'image/' + s : resolveFilePath(s)} className={`h-full w-full object-cover ${className}`} />
            )
        )
      }
    </Carousel>
  );
}
export default Slider;