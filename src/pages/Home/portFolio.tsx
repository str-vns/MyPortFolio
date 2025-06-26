import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@_/components/ui/carousel";
import Desc from "@_/shared/items/desc";
import { useColorsTheme } from "@_/shared/colors";
import Paginate from "@_/shared/pagination/index";

const Portfolio = () => {
  const colorTheme = useColorsTheme();
  const [isSelected, setSelected] = useState<string | null>("All");
  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30">
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1 className="text-4xl font-bold mb-4 "
          style={{ color: colorTheme.NAVYBLUE }}
        >PortFolio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-10 max-w-[350px] py-3">
        <div
          className={`${isSelected === "All" ? `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.NAVYBLUE}] border-b-2 border-[${colorTheme.LIGHTGREY}]` : `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("All")}
        >
          <p className="text-center text-lg font-semibold">All</p>
        </div>
        <div
          className={`${isSelected === "Web" ? `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.NAVYBLUE}] border-b-2 border-[${colorTheme.LIGHTGREY}] ` : `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("Web")}
        >
          <p className="text-center text-lg font-semibold">Web</p>
        </div>
        <div
          className={`${isSelected === "Server" ? `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.NAVYBLUE}] border-b-2 border-[${colorTheme.LIGHTGREY}] ` : `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.SEMIBLACK}]`}  cursor-pointer`}
          onClick={() => setSelected("Server")}
        >
          <p className="text-center text-lg font-semibold">Server</p>
        </div>
        <div
          className={`${isSelected === "Mobile" ? `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.NAVYBLUE}] border-b-2 border-[${colorTheme.LIGHTGREY}] ` : `bg-[${colorTheme.LIGHTGREY}] text-[${colorTheme.SEMIBLACK}]`}  cursor-pointer`}
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
  
    </Paginate>
  </div>
</div>
    </div>
  );
};

export default Portfolio;
