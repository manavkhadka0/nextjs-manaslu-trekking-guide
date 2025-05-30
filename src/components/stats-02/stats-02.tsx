"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

interface Stats02Props {}

const Stats02Page = ({}: Stats02Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const statsElement = document.getElementById("stats-section");

      if (statsElement) {
        const statsPosition = statsElement.offsetTop;
        if (scrollPosition > statsPosition - window.innerHeight / 1.5) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to check if already in view
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stats = [
    {
      value: "25+",
      label: "Years of Experience",
      description:
        "Guiding trekkers through the majestic Himalayan trails since 1998.",
      color: "text-primary",
      delay: 0.1,
    },
    {
      value: "10,000+",
      label: "Happy Trekkers",
      description:
        "Adventurers from around the world who've experienced the magic of Manaslu with us.",
      color: "text-blue-500",
      delay: 0.3,
    },
    {
      value: "98%",
      label: "Success Rate",
      description:
        "Our trekkers successfully complete their journey with proper acclimatization and guidance.",
      color: "text-emerald-500",
      delay: 0.5,
    },
    {
      value: "100%",
      label: "Local Expertise",
      description:
        "All our guides are certified locals with intimate knowledge of the region and culture.",
      color: "text-amber-500",
      delay: 0.7,
    },
  ];

  return (
    <div id="stats-section" className="relative py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/WhatsApp Image 2025-02-28 at 11.57.58.jpeg"
          alt="Manaslu Trek Landscape"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            <span>Trusted by Thousands</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Experience the Manaslu Difference
          </h2>
          <p className="text-lg text-muted-foreground">
            Our commitment to safety, expertise, and authentic experiences has
            made us the premier choice for Manaslu Circuit trekking adventures.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg relative overflow-hidden group hover:scale-105 transition-all duration-300"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <span
                  className={cn(
                    "text-2xl md:text-4xl font-bold block bg-clip-text text-transparent bg-gradient-to-r",
                    stat.color === "text-primary" && "from-primary to-blue-500",
                    stat.color === "text-blue-500" &&
                      "from-blue-500 to-cyan-500",
                    stat.color === "text-emerald-500" &&
                      "from-emerald-500 to-green-500",
                    stat.color === "text-amber-500" &&
                      "from-amber-500 to-yellow-500"
                  )}
                >
                  {stat.value}
                </span>
                <p className="mt-6 font-semibold text-xl text-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-[17px] text-muted-foreground">
                  {stat.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full" />
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className={cn("mt-16 text-center")}>
          <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Ready to Experience the Manaslu Circuit?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary transition-all duration-300"
              >
                Book Your Trek
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/testimonials">
              <Button
                variant="outline"
                size="lg"
                className="px-8 border-primary/20 hover:bg-primary/10"
              >
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats02Page;
