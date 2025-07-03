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
import type { gitProd } from "@_/types/gitProd";
import { Button } from "@_/components/ui/button";
import { useDarkMode } from "@_/stores/useDarkMode";
import { ModalCE } from "@_/shared/Modal/index";

interface PortFolioProps {
  projects: gitProd[];
}

const Portfolio: React.FC<PortFolioProps> = ({ projects }) => {
  const colorTheme = useColorsTheme();
  const [isSelected, setSelected] = useState<string | null>("All");
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex flex-col items-center justify-center pt-10 px-4  sm:mr-0 md:mr-20 lg:mr-30">
      <div className="max-w-6xl border-b-2 text-center mb-5 ">
        <h1
          className="text-4xl font-bold mb-4 "
          style={{ color: colorTheme.NAVYBLUE }}
        >
          PortFolio
        </h1>
      </div>
        <ModalCE />


      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-10 max-w-[350px] py-3">
        <div
          className={`${
            isSelected === "All"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("All")}
        >
          <p className="text-center text-lg font-semibold">All</p>
        </div>
        <div
          className={`${
            isSelected === "Web"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("Web")}
        >
          <p className="text-center text-lg font-semibold">Web</p>
        </div>
        <div
          className={`${
            isSelected === "Server"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
          onClick={() => setSelected("Server")}
        >
          <p className="text-center text-lg font-semibold">Server</p>
        </div>
        <div
          className={`${
            isSelected === "Mobile"
              ? isDarkMode
                ? "bg-[#000000] text-[#FFDEDE] border-b-2 border-[#CF0F47]"
                : "bg-[#F1EFEC] text-[#123458] border-b-2 border-[#123458]"
              : isDarkMode
                ? "bg-[#000000] text-[#FFDEDE]"
                : "bg-[#F1EFEC] text-[#123458]"
          } cursor-pointer`}
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
