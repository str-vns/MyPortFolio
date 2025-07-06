import React, { useState } from "react";
import CarouselComponent from "@_/shared/carousel";
import { useColorsTheme } from "@_/shared/colors";
import { Button } from "@_/components/ui/button";
import type { images } from "@_/types/gitProd";
import { Star, Github, Eraser, Pencil } from "lucide-react";
import { useDarkMode } from "@_/stores/useDarkMode";
import { useGitProdDelete } from "@_/hooks/useGitProd";

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
    await deleteGitProd( id )
  };

  return (
    <div
      className={`flex flex-col items-center bg-[${colorTheme.NAVYBLUE}] border border-[${colorTheme.BLACK}] border-solid border-2 mb-2 rounded-4xl shadow-sm md:flex-row md:w-[1000px] w-full max-w-xs sm:max-w-md md:max-w-[1000px] gap-12 md:gap-8`}
    >
      <div className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg p-2">
        {dataProps.images ? (
          <img
            src={dataProps?.images[0]?.url}
            alt={dataProps.title}
            className="w-50 h-50 object-cover rounded-3xl"
          />
        ) : (
          <img
            src={process.env.NOIMAGE}
            alt={dataProps.title}
            className="w-50 h-50 object-cover rounded-3xl"
          />
        )}
      </div>
      <div className="flex flex-col p-4 leading-normal w-full">
        <div className={`flex justify-between items-center`}>
          <div>
            <h5
              className={`flex flex-row mb-2 text-2xl font-bold tracking-tight text-[${colorTheme.TEXT}] `}
            >
              {dataProps.title}{" "}
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
          </div>

          {process.env.BUILD === "DEV" && (
            <div className={`flex flex-row gap-1 items-center text-2xl`}>
              <Button
                className={`text-2xl  text-blue-800 hover:text-blue-500 `}
                variant="ghost"
                onClick={() => handleOpenModal(dataProps?.key)}
              >
                <Pencil
                  fill={isDarkMode ? "blue" : "skyblue"}
                  style={{ width: 20, height: 20 }}
                />
              </Button>
              <Button
                className={`text-2xl text-red-800 hover:text-red-500`}
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
          <Github className="inline-block mr-2 " size={20} />
          {dataProps.gitUrl}
        </p>
        <p className={`mb-3 font-normal text-[${colorTheme.TEXT}]`}>
          {dataProps.description}
        </p>
        <div className="flex justify-end items-end">
          <Button
            className={`bg-[${colorTheme.BUTTON}] text-[${colorTheme.TEXT}] hover:bg-[${colorTheme.HOVERBUTTON}] hover:text-[${colorTheme.HOVERTEXT}]`}
            asChild
          >
            <a
              href={dataProps.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Desc;
