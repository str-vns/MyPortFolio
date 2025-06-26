import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@_/components/ui/carousel";
import Desc from "@_/shared/items/desc";
import { colorsTheme } from "@_/shared/colors";
import Paginate from "@_/shared/pagination/index";

const Portfolio = () => {
  const [isSelected, setSelected] = useState<string | null>("All");
  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30">
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">PortFolio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-10 max-w-[350px] py-3">
        <div
          className={`${isSelected === "All" ? `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.NAVYBLUE}] border-b-2 border-[${colorsTheme.LIGHTGREY}]` : `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("All")}
        >
          <p className="text-center text-lg font-semibold">All</p>
        </div>
        <div
          className={`${isSelected === "Web" ? `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.NAVYBLUE}] border-b-2 border-[${colorsTheme.LIGHTGREY}] ` : `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("Web")}
        >
          <p className="text-center text-lg font-semibold">Web</p>
        </div>
        <div
          className={`${isSelected === "Server" ? `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.NAVYBLUE}] border-b-2 border-[${colorsTheme.LIGHTGREY}] ` : `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("Server")}
        >
          <p className="text-center text-lg font-semibold">Server</p>
        </div>
        <div
          className={`${isSelected === "Mobile" ? `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.NAVYBLUE}] border-b-2 border-[${colorsTheme.LIGHTGREY}] ` : `bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("Mobile")}
        >
          <p className="text-center text-lg font-semibold">Mobile</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="flex flex-col items-center mb-5">
          <Paginate className="w-full max-w-4xl">
       
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
 <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
              <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
 <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
              <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
 <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
            <Desc />
          </Paginate>
        </div>
      </div>
      {/* <h1 className=" text-2xl font-bold mb-4 lg:self-start md:self-start sm:justify-center md:ml-27">
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
          </Carousel> */}
      {/* </div>
      </div> */}
    </div>
  );
};

export default Portfolio;
