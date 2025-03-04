import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import Image from "next/image";

const Hero03 = () => {
  return (
    <div className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col gap-6 sm:gap-10 items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-photo-2403502-1.jpeg"
          alt="Manaslu Trek"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-2xl text-white">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none text-xs sm:text-sm">
          Manaslu Circuit Trek
        </Badge>
        <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold !leading-[1.2] tracking-tight">
          Experience the Majestic Manaslu Circuit Trek
        </h1>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
          Discover one of Nepal&apos;s most spectacular treks, offering pristine
          mountain views, rich cultural experiences, and breathtaking landscapes
          away from the crowds.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            className="rounded-full text-sm sm:text-base w-full sm:w-auto"
          >
            Explore Packages{" "}
            <ArrowUpRight className="ml-1 !h-4 !w-4 sm:!h-5 sm:!w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-sm sm:text-base shadow-none border-white text-white hover:bg-white/20 hover:text-white w-full sm:w-auto mt-2 sm:mt-0"
          >
            <CirclePlay className="mr-1 !h-4 !w-4 sm:!h-5 sm:!w-5" /> Watch Trek
            Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero03;
