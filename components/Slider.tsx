import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { resolveFilePath } from "../helpers/helpers";
typeof window !== "undefined" ? import("tw-elements") : " ";

function Slider({ images = [], className }: { images?: string[], className?: string }) {
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
      {images.map((s, i) =>
        <img key={i} src={resolveFilePath(s)} className={'rounded-md h-full w-full object-cover'} />
      )}
    </Carousel>
  );
}
export default Slider;