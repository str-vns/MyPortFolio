import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@_components/ui/carousel";
import Navbar from "@_shared/navbar";
import Desc from "@_shared/items/desc";
const home = () => {
  return (
    <div className="bg-white mb-10">
      <Navbar />
      <h1 className="flex text-4xl font-bold mb-4 item-center justify-center mt-4 mb-4">
        Projects
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className=" text-2xl font-bold mb-4 lg:self-start md:self-start sm:justify-center md:ml-27">
            Website{" "}
          </h1>
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full basis-1/1 flex justify-center"
                >
                  <Desc />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 bg-white md:left-16 sm:left-35" />
            <CarouselNext className="absolute right-4 bg-white md:right-16 sm:right-35" />
          </Carousel>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="flex flex-col items-center">
          <h1 className=" text-2xl font-bold mb-4 lg:self-start md:self-start sm:justify-center md:ml-27">
            Mobile App{" "}
          </h1>
          <Carousel className="w-full max-w-4xl">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full basis-1/1 flex justify-center"
                >
                  <Desc />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 bg-white md:left-16 sm:left-35" />
            <CarouselNext className="absolute right-4 bg-white md:right-16 sm:right-35" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default home;
