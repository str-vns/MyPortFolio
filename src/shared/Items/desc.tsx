import React, { useState } from "react";
import CarouselComponent from "@_/shared/carousel";
import { useColorsTheme } from "@_/shared/colors";
import { Button } from "@_/components/ui/button";
import type { images } from "@_/types/gitProd";
import { Star, Github, Eraser, Pencil } from "lucide-react";
import { useDarkMode } from "@_/stores/useDarkMode";
import { useGitProdDelete } from "@_/hooks/useGitProd";
import Accordions from "../Accordion";

interface DescProps {
  title: string;
  description: string;
  images: images[];
  gitUrl: string;
  favorite: string;
  key: string;
}

type DescDataProps = {
  dataProps: DescProps;
  opening: (val: boolean, isEdit: boolean) => void;
  valID: (value: string) => void;
};

const Desc: React.FC<DescDataProps> = ({
  dataProps,
  opening = () => {},
  valID = () => {},
}) => {
  const colorTheme = useColorsTheme();
  const { isDarkMode } = useDarkMode();
  const { mutateAsync: deleteGitProd } = useGitProdDelete();

  const handleOpenModal = (id: string) => {
    opening(true, true);
    valID(id);
  };

  const handlerDelete = async (id: string) => {
    await deleteGitProd(id);
  };

  return (
    <div
      className={`flex flex-col md:flex-row
    bg-[${colorTheme.NAVYBLUE}]
    border border-[${colorTheme.BLACK}] border-solid border-2
    mb-2 rounded-4xl shadow-sm
    w-full max-w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl
    gap-0`}
    >
      <div className="w-full md:w-80 p-2 flex-shrink-0 flex justify-center items-start">
        <CarouselComponent items={dataProps.images} />
      </div>

      <div className="flex flex-col p-4 leading-normal w-full h-full">
        <div className="flex justify-between items-start flex-wrap">
          <h5
            className={`flex flex-row mb-2 text-2xl font-bold tracking-tight text-[${colorTheme.TEXT}]`}
          >
            {dataProps.title}
            <Star
              className="mt-2 inline-block ml-2"
              size={20}
              stroke="none"
              fill={
                dataProps.favorite === "true"
                  ? isDarkMode
                    ? "#FFDEDE"
                    : "#F1EFEC"
                  : isDarkMode
                    ? "#222"
                    : "#123458"
              }
            />
          </h5>

          {process.env.BUILD === "DEV" && (
            <div className="flex flex-row gap-1 items-center text-2xl">
              <Button
                className="text-2xl text-blue-800 hover:text-blue-500"
                variant="ghost"
                onClick={() => handleOpenModal(dataProps?.key)}
              >
                <Pencil
                  fill={isDarkMode ? "blue" : "skyblue"}
                  style={{ width: 20, height: 20 }}
                />
              </Button>
              <Button
                className="text-2xl text-red-800 hover:text-red-500"
                variant="ghost"
                onClick={() => handlerDelete(dataProps?.key)}
              >
                <Eraser
                  fill={isDarkMode ? "#000" : "#fe7171"}
                  style={{ width: 20, height: 20 }}
                />
              </Button>
            </div>
          )}
        </div>

        <p className={`mb-3 font-normal text-[${colorTheme.TEXT}]`}>
          <Github className="inline-block mr-2" size={20} />
          {dataProps.gitUrl}
        </p>

        <p
          className={`mb-3 font-normal text-[${colorTheme.TEXT}] break-words whitespace-pre-wrap`}
        >
          {dataProps.description}
        </p>

        <div className="w-full mt-2">
          <Accordions items={dataProps} />
        </div>
      </div>
    </div>
  );
};

export default Desc;
