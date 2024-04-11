"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ sliderList }) => {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
      >
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <img
                src={slider.attributes?.image?.data?.attributes?.url}
                width={1000}
                height={500}
                alt="slider"
                className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Slider;
