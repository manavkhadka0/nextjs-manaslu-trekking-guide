import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CirclePlay,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero03 = () => {
  return (
    <div className="relative min-h-[100vh] w-full flex flex-col gap-6 sm:gap-10 items-center justify-center px-4 sm:px-6 py-20 sm:py-16 pt-28 sm:pt-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/WhatsApp Image 2025-02-28 at 11.57.59 (2).jpeg"
          alt="Manaslu Trek Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl text-white">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none text-xs sm:text-sm">
          Your Personal Himalayan Guide
        </Badge>
        <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold !leading-[1.2] tracking-tight">
          Discover Manaslu Circuit With{" "}
          <span className="text-primary">Samrat Adhikari</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
          Experience the majestic Manaslu Circuit with a local expert who knows
          every trail, village, and story. I&apos;ll guide you through
          breathtaking landscapes, authentic cultural experiences, and create
          memories that last a lifetime.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary">10+</div>
            <div className="text-sm">Years of Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm">Happy Trekkers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm">Local Expertise</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            className="rounded-full text-sm sm:text-base w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg"
            asChild
          >
            <Link href="#contact">
              Book Your Trek{" "}
              <ArrowUpRight className="ml-1 !h-4 !w-4 sm:!h-5 sm:!w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-sm sm:text-base shadow-md border-white text-white hover:bg-white/20 hover:text-white w-full sm:w-auto mt-2 sm:mt-0 backdrop-blur-sm bg-black/30"
            asChild
          >
            <Link href="https://wa.me/9779861884374" target="_blank">
              <MessageCircleIcon className="mr-1 !h-4 !w-4 sm:!h-5 sm:!w-5" />{" "}
              Chat With Me
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-sm sm:text-base shadow-md border-white text-white hover:bg-white/20 hover:text-white w-full sm:w-auto mt-2 sm:mt-0 backdrop-blur-sm bg-black/30"
            asChild
          >
            <Link href="tel:+9779861884374">
              <PhoneIcon className="mr-1 !h-4 !w-4 sm:!h-5 sm:!w-5" /> Call Now
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-white/10 rounded-full font-medium bg-black/30"
            asChild
          >
            <Link href="#videos">
              <CirclePlay className="mr-1 !h-4 !w-4 sm:!h-5 sm:!w-5" /> Watch my
              trek highlights
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero03;
