import * as React from "react";
import { CardContent } from "@_/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@_/components/ui/carousel";

const CarouselComponent: React.FC = () => {
    return (
         <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/1 flex-shrink-0">
            <div className="p-1">
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <img src="https://res.cloudinary.com/diljhwf3a/image/upload/v1696484833/sample.jpg" className="object-cover w-full h-full  rounded-3xl" />
                </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  );
};

export default CarouselComponent;