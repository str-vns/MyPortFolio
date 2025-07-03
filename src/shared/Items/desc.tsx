import React from "react";
import CarouselComponent from "@_/shared/carousel";
import { useColorsTheme } from "@_/shared/colors";
import { Button } from "@_/components/ui/button";
import type { images } from "@_/types/gitProd";
import { Star, Github } from "lucide-react";
import { useDarkMode } from "@_/stores/useDarkMode";

interface DescProps {
  title: string;
  description: string;
  images: images[];
  gitUrl: string;
  favorite: string;
}

type DescDataProps = {
  dataProps: DescProps;
};

const Desc: React.FC<DescDataProps> = ({ dataProps }) => {
  const colorTheme = useColorsTheme();
  const { isDarkMode } = useDarkMode();

  console.log("Desc Data:", dataProps);
  return (
    <div
      className={`flex flex-col items-center bg-[${colorTheme.NAVYBLUE}] border border-[${colorTheme.BLACK}] border-solid border-2 mb-2 rounded-4xl shadow-sm md:flex-row md:w-[800px] w-full max-w-xs sm:max-w-md md:max-w-2xl p-2 gap-12 md:gap-8`}
    >
      <div className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg p-2">
        {/* <CarouselComponent images={dataProps.imageUrl} /> */}
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
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
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
                  : "#123458"
                : isDarkMode
                  ? "#222"
                  : "#F1EFEC"
            }
          />
        </h5>
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
