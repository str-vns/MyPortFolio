import * as React from "react";
import { CardContent } from "@_/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@_/components/ui/carousel";
import type { images } from "@_/types/gitProd";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDarkMode } from "@_/stores/useDarkMode";

interface CarouselProps {
  items?: images[];
}
const CarouselComponent: React.FC<CarouselProps> = ({ items = [] }) => {
  const { isDarkMode } = useDarkMode();
  const validImages = items.filter((img) => img?.url?.trim() !== "");
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const emblaRef = React.useRef<any>(null);

  const onSelect = () => {
    if (!emblaRef.current) return;
    setSelectedIndex(emblaRef.current.selectedScrollSnap());
  };

  const setApi = (api: any) => {
    emblaRef.current = api;
    emblaRef.current.on("select", onSelect);
  };

  const handleThumbnailClick = (index: number) => {
    if (emblaRef.current) {
      emblaRef.current.scrollTo(index);
    }
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4">
      <Carousel
        opts={{ align: "start", loop: false }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {(validImages.length > 0
            ? validImages
            : [{ url: process.env.NOIMAGE }]
          ).map((img, index) => (
            <CarouselItem key={index} className="basis-1/1 flex-shrink-0">
              <div className="p-1">
                <CardContent className=" p-2 flex items-center justify-center overflow-hidden">
                  <Zoom>
                    <img
                      src={img.url}
                      alt={`Image ${index + 1}`}
                      className="w-[300px] h-[300px] object-cover rounded-2xl cursor-zoom-in"
                    />
                  </Zoom>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex gap-2 overflow-x-auto max-w-full px-1">
        {validImages.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            onClick={() => handleThumbnailClick(idx)}
            className={`h-16 w-16 object-cover rounded-md cursor-pointer border-2 transition-all ${
              selectedIndex === idx
                ? `${isDarkMode ? `border-[#FFDEDE]`: "border-[#F1EFEC]"}`
                : `border-transparent ${isDarkMode ? `hover:border-[#000000]` : 'hover:border-[#030303]'} `
            }`}
            alt={`Thumbnail ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
