"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark, Info, Play } from "lucide-react";

interface Props {
  className?: string;
  carousel: {
    content_logo: string;
    content_title: string;
    content_subtext: string;
    content_description: string;
    content_watch_link: string;
    content_watch_text: string;
    is_added_to_watchlist: boolean;
    handelWatchlistCLick: () => void;
    is_navigation_buttons_visible?: boolean;
    is_pagination_buttons_visible?: boolean;
  }[];
}

export default function HomePageHeroCarousel({ className, carousel }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    setTotalSlides(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);
  const handleDotClick = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index);
    },
    [carouselApi],
  );
  // Mock data for demonstration
  const mockCarousel = Array(5).fill({
    content_logo: "/image/logo.png",
    content_title: "Featured Title",
    content_subtext: "ENGLISH | HINDI | MARATHI | TELUGU | TAMIL | URDU",
    content_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus consectetur suscipit impedit possimus ex explicabo dolorum minima harum quaerat deserunt esse nisi ad sunt cumque, corporis, autem dicta eum eveniet!",
    content_watch_link: "#",
    content_watch_text: "Watch Now",
    is_added_to_watchlist: false,
    handelWatchlistCLick: () => {},
  });

  const carouselData = carousel || mockCarousel;
  return (
    <div className="flex flex-col items-center">
      <Carousel className="group h-full w-full" setApi={setCarouselApi}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card className="px-0 py-0">
                  <CardContent className="relative flex aspect-video h-full max-h-[80vh] items-center justify-center px-0 py-0 rounded-md" >
                    <img
                      src="/image/backdrop.jpg"
                      alt="image"
                      width={1920}
                      height={1080}
                      className="h-auto w-full rounded-md object-cover"
                    />

                    <div className="group items-atart absolute bottom-10 left-20 flex w-full max-w-xl flex-col justify-center gap-3">
                      <img
                        src="/image/logo.png"
                        alt="logo"
                        width={800}
                        height={400}
                        className="h-auto w-96 object-contain"
                      />
                      <span className="text-sm font-semibold">
                        ENGLISH | HINDI | MARATHI | TELUGU | TAMIL | URDU
                      </span>
                      <div className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempore in enim, repellat eos quia labore molestiae
                        recusandae cumque itaque quaerat.
                      </div>
                      <div className="flex w-full items-center gap-2">
                        <Button
                          variant="default"
                          size="lg"
                          className="h-14 w-52 rounded-full px-20 text-base"
                        >
                          <Play className="size-6 fill-current" />
                          Watch Now
                        </Button>

                        <Button
                          variant="default"
                          size="icon"
                          className="size-14 rounded-full"
                        >
                          <Bookmark className="size-6 fill-current" />
                        </Button>
                        <Button
                          variant="default"
                          size="icon"
                          className="size-14 rounded-full"
                        >
                          <Info className="size-6 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-5 -z-10 size-12 group-hover:z-10 disabled:hidden"
          variant="secondary"
        />
        <CarouselNext
          className="right-5 -z-10 size-12 group-hover:z-10 disabled:hidden"
          variant="secondary"
        />
        <div className="absolute right-0 bottom-5 left-0 mt-4 flex items-center justify-center">
          <div className="flex w-48 items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "bg-foreground h-1.5 rounded-full transition-all",
                  currentSlide === index ? "bg-primary w-12" : "w-3",
                )}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}

{
  /* <div className="flex w-full flex-col items-center">
      <Carousel className="group h-full w-full" setApi={setCarouselApi}>
        <CarouselContent>
          {carouselData.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden border-0 px-0 py-0">
                <CardContent className="relative flex aspect-video h-full max-h-[70vh] items-center justify-center p-0">
      
                  <div className="absolute inset-0 h-full w-full">
                    <img
                      src="/image/backdrop.jpg"
                      alt="backdrop"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                      className="object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </div>

                 
                  <div
                    className="relative z-10 flex h-full w-full flex-col"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="flex h-full max-w-full flex-col justify-center px-4 sm:px-8 md:px-16 lg:max-w-3xl lg:px-20">
                    
                      <div className="mb-2 sm:mb-4">
                        <img
                          src={item.content_logo || "/placeholder.svg"}
                          alt="logo"
                          width={800}
                          height={400}
                          className="h-auto w-48 object-contain sm:w-64 md:w-80 lg:w-96"
                        />
                      </div>

                     
                      <h2 className="mb-1 line-clamp-1 text-lg font-bold sm:mb-2 sm:text-xl md:text-2xl">
                        {item.content_title}
                      </h2>

                      <p className="mb-2 text-xs font-medium tracking-wide sm:mb-4 sm:text-sm">
                        {item.content_subtext}
                      </p>

                      
                      <div
                        className={cn(
                          "mb-4 transition-opacity duration-300 ease-in-out",
                          isHovering || index === currentSlide
                            ? "opacity-100"
                            : "hidden opacity-0 sm:block sm:opacity-0",
                          "line-clamp-2 text-xs sm:line-clamp-3 sm:text-sm md:line-clamp-4 md:text-base",
                        )}
                      >
                        {item.content_description}
                      </div>

                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 rounded-full px-4 text-xs sm:h-10 sm:px-6 sm:text-sm md:h-12 md:px-8 md:text-base lg:h-14 lg:px-10"
                        >
                          <Play className="mr-1 size-4 fill-current sm:mr-2 sm:size-5 md:size-6" />
                          {item.content_watch_text}
                        </Button>

                        <Button
                          variant="default"
                          size="icon"
                          className="size-8 rounded-full sm:size-10 md:size-12 lg:size-14"
                          onClick={item.handelWatchlistCLick}
                        >
                          <Bookmark className="size-4 fill-current sm:size-5 md:size-6" />
                        </Button>

                        <Button
                          variant="default"
                          size="icon"
                          className="size-8 rounded-full sm:size-10 md:size-12 lg:size-14"
                        >
                          <Info className="size-4 sm:size-5 md:size-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        
        <CarouselPrevious
          className="left-2 -z-10 size-8 opacity-0 transition-all duration-300 group-hover:z-10 group-hover:opacity-100 disabled:hidden sm:left-4 sm:size-10 md:left-5 md:size-12"
          variant="secondary"
        />
        <CarouselNext
          className="right-2 -z-10 size-8 opacity-0 transition-all duration-300 group-hover:z-10 group-hover:opacity-100 disabled:hidden sm:right-4 sm:size-10 md:right-5 md:size-12"
          variant="secondary"
        />

        
        <div className="absolute right-0 bottom-2 left-0 flex items-center justify-center sm:bottom-4 md:bottom-5">
          <div className="flex w-32 items-center justify-center gap-1 sm:w-40 sm:gap-2 md:w-48">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "bg-foreground h-1 rounded-full transition-all sm:h-1.5",
                  currentSlide === index
                    ? "bg-primary w-8 sm:w-10 md:w-12"
                    : "w-2 sm:w-3",
                )}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div> */
}
