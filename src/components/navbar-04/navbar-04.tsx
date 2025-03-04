"use client";

import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

const Navbar04Page = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="h-full flex items-center justify-between mx-auto px-4 max-w-screen-xl">
        {/* Left section - Desktop Menu */}
        <div className="hidden md:flex items-center">
          <NavMenu scrolled={scrolled} />
        </div>

        {/* Center section - Logo */}
        <div className="flex items-center justify-center flex-grow md:flex-grow-0">
          <Link href="/" className="mx-auto md:mx-0">
            <Logo scrolled={scrolled} />
          </Link>
        </div>

        {/* Right section - Call to action */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className={`rounded-full ${
              scrolled
                ? "border-primary text-primary hover:bg-primary/10 hover:text-primary"
                : "border-white text-white bg-black/30 hover:bg-black/50 hover:text-white"
            }`}
          >
            <Link href="#contact">Book Now</Link>
          </Button>

          <Link
            href="https://wa.me/9779861884374?text=Hello,%20I'm%20interested%20in%20learning%20more%20about%20Manaslu%20trekking."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:from-green-500 hover:to-green-600 transition-all shadow-md group"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="group-hover:animate-pulse"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-medium text-sm leading-tight">
                  Chat with Samrat
                </span>
                <span className="text-xs leading-tight">+977 9861884374</span>
              </div>
            </div>
          </Link>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              scrolled
                ? "text-primary hover:text-primary hover:bg-primary/10"
                : "text-white hover:text-white hover:bg-white/10"
            }`}
          >
            <Link href="tel:+9779861884374">
              <PhoneIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar04Page;
