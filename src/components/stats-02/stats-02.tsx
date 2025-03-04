"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  PlayCircleIcon,
  XIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/lib/sanity/queries/testimonialQueries";
import { urlFor, getVideoEmbedUrl } from "@/lib/sanity/client";

interface Stats02Props {
  testimonials?: Testimonial[];
}

const Stats02Page = ({ testimonials = [] }: Stats02Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // If no testimonials are provided, use fallback data
  if (testimonials.length === 0) {
    testimonials = fallbackTestimonials;
  }

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
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            <span>Trusted by Thousands</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Experience the{" "}
            <span className="text-primary">Manaslu Difference</span>
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
                "bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg relative overflow-hidden group",
                isVisible ? "animate-fadeIn" : "opacity-0"
              )}
              style={{
                animationDelay: `${stat.delay}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <span
                  className={cn(
                    "text-5xl md:text-6xl font-bold block",
                    stat.color
                  )}
                >
                  {stat.value}
                </span>
                <p className="mt-6 font-semibold text-xl">{stat.label}</p>
                <p className="mt-2 text-[17px] text-muted-foreground">
                  {stat.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full" />
            </div>
          ))}
        </div>

        {/* Testimonial carousel section */}
        <div
          className={cn(
            "mt-16 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-10 border border-primary/10 relative overflow-hidden",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}
          style={{
            animationDelay: "0.9s",
            animationFillMode: "forwards",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <h3 className="text-2xl font-bold mb-8 text-center">
            What Our <span className="text-primary">Trekkers Say</span>
          </h3>

          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial._id}>
                  <TestimonialSlide testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-8">
              <CarouselPrevious className="static transform-none mx-2" />
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn("h-2.5 w-2.5 rounded-full transition-all", {
                      "bg-primary w-6": current === index + 1,
                      "bg-primary/30": current !== index + 1,
                    })}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
        </div>

        {/* CTA section */}
        <div
          className={cn(
            "mt-16 text-center",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}
          style={{
            animationDelay: "1.1s",
            animationFillMode: "forwards",
          }}
        >
          <h3 className="text-2xl font-bold mb-6">
            Ready to Experience the Manaslu Circuit?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Book Your Trek
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/testimonials">
              <Button variant="outline" size="lg" className="px-8">
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSlide = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoUrl = testimonial.videoUrl
    ? getVideoEmbedUrl(testimonial.videoUrl)
    : "";

  // Get the appropriate image source - use image if available, otherwise use src
  const profileImage = testimonial.image || testimonial.src;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start p-2">
      <div className="flex-shrink-0">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          {profileImage ? (
            <AvatarImage
              src={urlFor(profileImage).width(200).height(200).url()}
              alt={testimonial.name}
            />
          ) : (
            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .substring(0, 2)}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                "w-4 h-4",
                i < (testimonial.rating || 5)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>

        <p className="italic mb-4">{testimonial.quote}</p>

        <div>
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2">
                {testimonial.designation && (
                  <span>{testimonial.designation}</span>
                )}
                {testimonial.location && (
                  <span className="flex items-center">
                    <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                    {testimonial.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {testimonial.testimonialType === "video" && testimonial.videoUrl && (
          <div className="mt-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-primary/10 border-primary/20 hover:bg-primary/20"
                >
                  <PlayCircleIcon className="h-4 w-4 mr-2" />
                  Watch Video
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0 bg-black border-none">
                <div className="relative pt-[56.25%]">
                  {videoUrl ? (
                    <iframe
                      src={`${videoUrl}?autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black">
                      <p className="text-white">Video unavailable</p>
                    </div>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

// Fallback testimonials in case no data is provided
const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Sarah Johnson",
    quote:
      "The Manaslu Circuit was the adventure of a lifetime. Our guide's knowledge of the region, culture, and wildlife made this trek truly special. The team's attention to safety and comfort exceeded all expectations.",
    rating: 5,
    designation: "Adventure Enthusiast",
    location: "United States",
    trekRoute: "Manaslu Circuit",
    trekDate: "2022-10-15",
    featured: true,
    testimonialType: "text",
    verified: true,
    src: {
      asset: {
        _ref: "image-47af23fa6028b3ba011fe07c80de23ed44d8519c-1280x960-jpg",
      },
    },
    status: "published",
    submissionDate: "2022-11-10T00:00:00Z",
  },
  {
    _id: "2",
    name: "Michael Chen",
    quote:
      "As an experienced trekker, I was impressed by the professionalism of the guides and the well-planned itinerary. The views of Manaslu were breathtaking, and the cultural experiences in the villages along the way were authentic and memorable.",
    rating: 5,
    designation: "Photographer",
    location: "Canada",
    trekRoute: "Manaslu Circuit with Tsum Valley",
    trekDate: "2023-04-20",
    featured: false,
    testimonialType: "text",
    verified: true,
    status: "published",
    submissionDate: "2023-05-15T00:00:00Z",
  },
  {
    _id: "3",
    name: "Emma Rodriguez",
    quote:
      "I can't recommend this trek enough! The Manaslu Circuit offered stunning views, cultural immersion, and the perfect balance of challenge and comfort. Our guide was knowledgeable, patient, and made the experience unforgettable.",
    rating: 5,
    designation: "Travel Blogger",
    location: "Spain",
    trekRoute: "Manaslu Circuit",
    trekDate: "2023-09-05",
    featured: true,
    testimonialType: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    verified: true,
    status: "published",
    submissionDate: "2023-10-12T00:00:00Z",
  },
];

export default Stats02Page;
