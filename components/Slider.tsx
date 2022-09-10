import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";

function Slider({ images = [], className, demo = false, thumbs = false }: {
  images?: string[],
  className?: string,
  demo?: boolean
  thumbs?: boolean
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
      {demo === false ?
        images.map((s, i) =>
          <img key={i} src={resolveFilePath(s)} className={`h-full w-full object-cover ${className}`} />
        )
        :
        ['ads1.jpg', 'ads2.jpg', 'ads3.jpg'].map((s, i) =>
          <img key={i} src={'image/' + s} className={`h-full w-full object-cover ${className}`} />
        )
      }
    </Carousel>
  );
}
export default Slider;