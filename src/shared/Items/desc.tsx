import React from "react";
import CarouselComponent from "@_/shared/carousel";
import { useColorsTheme } from "@_/shared/colors";
import { Button } from "@_/components/ui/button";

function desc() {
  const colorTheme = useColorsTheme();
  return (
    <div
      className={`flex flex-col items-center bg-[${colorTheme.NAVYBLUE}] border border-[${colorTheme.BLACK}] border-solid border-2 mb-2 rounded-4xl shadow-sm md:flex-row md:w-[800px] w-full max-w-xs sm:max-w-md md:max-w-2xl p-2 gap-12 md:gap-8`}
    >
      <div className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg">
        <CarouselComponent />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className={`mb-2 text-2xl font-bold tracking-tight text-[${colorTheme.TEXT}]`}>
          Noteworthy technology acquisitions 2021
        </h5>
        <p className={`mb-3 font-normal text-[${colorTheme.TEXT}]`}>
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex justify-end items-end">
          <Button
            className={`bg-[${colorTheme.BUTTON}] text-[${colorTheme.TEXT}] hover:bg-[${colorTheme.HOVERBUTTON}] hover:text-[${colorTheme.HOVERTEXT}]`}
          >
            Read more
          </Button>
    
      </div>
    </div>
    </div>
  );
}

export default desc;
