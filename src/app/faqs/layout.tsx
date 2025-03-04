"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  CompassIcon,
  MapIcon,
  MountainSnowIcon,
  TentIcon,
  SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const categories = [
  {
    name: "All FAQs",
    path: "/faqs",
    icon: <CompassIcon className="h-5 w-5" />,
  },
  {
    name: "General",
    path: "/faqs/General",
    icon: <CompassIcon className="h-5 w-5" />,
  },
  {
    name: "Trekking",
    path: "/faqs/Trekking",
    icon: <MountainSnowIcon className="h-5 w-5" />,
  },
  {
    name: "Accommodation",
    path: "/faqs/Accommodation",
    icon: <TentIcon className="h-5 w-5" />,
  },
  {
    name: "Travel",
    path: "/faqs/Travel",
    icon: <MapIcon className="h-5 w-5" />,
  },
  {
    name: "Permits",
    path: "/faqs/Permits",
    icon: <CalendarIcon className="h-5 w-5" />,
  },
];

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Hero section with parallax effect */}
      <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-r from-primary/90 to-primary flex items-center justify-center overflow-hidden">
        {/* Background image with parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg')",
            backgroundAttachment: "fixed",
            opacity: 0.3,
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-md">
              Frequently Asked Questions
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Find answers to common questions about trekking in the Manaslu
              region of Nepal
            </p>

            {/* Search shortcut button */}
            <Link
              href="/faqs?focus=search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors"
            >
              <SearchIcon className="h-5 w-5" />
              <span>Search FAQs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category navigation - sticky on scroll */}
      <div
        className={`bg-background border-b sticky top-0 z-30 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        data-scrolled={scrolled ? "true" : "false"}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center overflow-x-auto py-3 gap-2 md:gap-4 no-scrollbar">
            {categories.map((category) => {
              const isActive =
                (category.path === "/faqs" && pathname === "/faqs") ||
                (category.path !== "/faqs" && pathname.includes(category.path));

              return (
                <Link
                  key={category.path}
                  href={category.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main>{children}</main>

      {/* FAQ footer with CTA */}
      <div className="bg-accent mt-16">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Still have questions?
              </h2>
              <p className="text-muted-foreground">
                Can&apos;t find the answer you&apos;re looking for? Please
                contact our friendly team.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="mailto:info@manaslu-trekking.com"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent-foreground/10 rounded-md hover:bg-accent-foreground/20 transition-colors"
                >
                  Email Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/WhatsApp Image 2025-02-28 at 11.57.58 (1).jpeg"
                  alt="Contact our team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <p className="font-medium">Our expert guides</p>
                  <p className="text-sm text-white/80">Ready to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
