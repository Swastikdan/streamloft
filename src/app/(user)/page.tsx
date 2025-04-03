{
  /*import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <Carousel className="h-full w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className="rounded-none">
                <CardContent className="flex aspect-video h-full max-h-[70vh] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="left-5 disabled:hidden"
        variant="secondary"
      />
      <CarouselNext className="right-5 disabled:hidden" variant="secondary" />
    </Carousel>
  );
}
*/
}

import HomePageHeroCarousel from "@/components/user/carousel/hero-carousel";
import React from "react";

export default function Home() {
  return <HomePageHeroCarousel />;
}
