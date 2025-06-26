import React from "react";
import CarouselComponent from "@_/shared/carousel";
import { colorsTheme } from "@_/shared/colors";
import { Button } from "@_/components/ui/button";

function desc() {
  return (
    <div
      className={`flex flex-col items-center bg-[${colorsTheme.NAVYBLUE}] border border-[${colorsTheme.BLACK}] border-solid border-2 mb-2 rounded-4xl shadow-sm md:flex-row md:w-[800px] w-full max-w-xs sm:max-w-md md:max-w-2xl p-2 gap-12 md:gap-8`}
    >
      <div className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg">
        <CarouselComponent />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className={`mb-2 text-2xl font-bold tracking-tight text-[${colorsTheme.LIGHTGREY}]`}>
          Noteworthy technology acquisitions 2021
        </h5>
        <p className={`mb-3 font-normal text-[${colorsTheme.LIGHTGREY}]`}>
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex justify-end items-end">
          <Button
            className={`bg-[${colorsTheme.LIGHTGREY}] text-[${colorsTheme.LIGHTGREY}] hover:bg-[${colorsTheme.SEMIBLACK}] hover:text-[${colorsTheme.NAVYBLUE}]`}
          >
            Read more
          </Button>
    
      </div>
    </div>
    </div>
  );
}

export default desc;
