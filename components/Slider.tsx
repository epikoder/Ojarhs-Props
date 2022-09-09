import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";
typeof window !== "undefined" ? import("tw-elements") : " ";

function Slider({ images = [], className, demo = false }: { images?: string[], className?: string, demo?: boolean }) {
  return (
    <Carousel
      className={'h-full'}
      autoPlay={true}
      showIndicators={true}
      showStatus={false}
      showThumbs={false}
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