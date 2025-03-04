"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  StarIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  QuoteIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Testimonial } from "@/lib/sanity/queries/testimonialQueries";
import { urlFor, getVideoEmbedUrl } from "@/lib/sanity/client";

interface TestimonialProps {
  testimonials: Testimonial[];
  videoTestimonials?: Testimonial[];
}

const Testimonial06 = ({
  testimonials = [],
  videoTestimonials = [],
}: TestimonialProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [videoApi, setVideoApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [videoCurrent, setVideoCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter testimonials by type
  const textTestimonials = testimonials.filter(
    (testimonial) => testimonial.testimonialType === "text"
  );

  // Use provided videoTestimonials or filter from testimonials
  const videoTestimonialsToShow =
    videoTestimonials.length > 0
      ? videoTestimonials
      : testimonials.filter(
          (testimonial) => testimonial.testimonialType === "video"
        );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (sectionRef.current) {
        const sectionPosition = sectionRef.current.offsetTop;
        if (scrollPosition > sectionPosition - window.innerHeight / 1.5) {
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

  useEffect(() => {
    if (!videoApi) return;

    setVideoCount(videoApi.scrollSnapList().length);
    setVideoCurrent(videoApi.selectedScrollSnap() + 1);

    videoApi.on("select", () => {
      setVideoCurrent(videoApi.selectedScrollSnap() + 1);
    });
  }, [videoApi]);

  // If no testimonials are provided, use fallback data
  if (testimonials.length === 0) {
    return (
      <div
        ref={sectionRef}
        className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-background/95"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/manaslu-testimonials-bg.jpg"
            alt="Manaslu Trek Landscape"
            fill
            priority
            className="object-cover object-center opacity-20"
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
          <div
            className={cn(
              "text-center mb-16 max-w-3xl mx-auto",
              isVisible ? "animate-fadeIn" : "opacity-0"
            )}
            style={{
              animationDelay: "0.1s",
              animationFillMode: "forwards",
            }}
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <QuoteIcon className="h-4 w-4 mr-1.5" />
              <span>Trekker Experiences</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What Our <span className="text-primary">Trekkers Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from adventurers who have experienced the magic of Manaslu
              with our expert guides. Their stories inspire us to continue
              providing exceptional trekking experiences.
            </p>
          </div>

          {/* Testimonial Tabs */}
          <div
            className={cn("mb-16", isVisible ? "animate-fadeIn" : "opacity-0")}
            style={{
              animationDelay: "0.3s",
              animationFillMode: "forwards",
            }}
          >
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="text">Written Reviews</TabsTrigger>
                <TabsTrigger value="video">Video Testimonials</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {fallbackTestimonials
                      .filter((t) => t.testimonialType === "text")
                      .map((testimonial) => (
                        <CarouselItem
                          key={testimonial._id}
                          className="md:basis-1/1 lg:basis-1/2"
                        >
                          <TestimonialCard testimonial={testimonial} />
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
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition-all",
                            {
                              "bg-primary w-6": current === index + 1,
                              "bg-primary/30": current !== index + 1,
                            }
                          )}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <CarouselNext className="static transform-none mx-2" />
                  </div>
                </Carousel>
              </TabsContent>

              <TabsContent value="video">
                {videoTestimonialsToShow &&
                videoTestimonialsToShow.length > 0 ? (
                  <Carousel
                    setApi={setVideoApi}
                    className="w-full"
                    opts={{
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {videoTestimonialsToShow.map((testimonial) => (
                        <CarouselItem
                          key={testimonial._id}
                          className="md:basis-1/1 lg:basis-1/2"
                        >
                          <VideoTestimonialCard testimonial={testimonial} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <CarouselPrevious className="static transform-none mx-2" />
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: videoCount }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => videoApi?.scrollTo(index)}
                            className={cn(
                              "h-2.5 w-2.5 rounded-full transition-all",
                              {
                                "bg-primary w-6": videoCurrent === index + 1,
                                "bg-primary/30": videoCurrent !== index + 1,
                              }
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                      <CarouselNext className="static transform-none mx-2" />
                    </div>
                  </Carousel>
                ) : (
                  <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <PlayCircleIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Video Testimonials Yet
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      We&apos;re collecting video reviews from our trekkers.
                      Check back soon or be the first to share your experience!
                    </p>
                    <Button asChild>
                      <Link href="#share-testimonial">
                        Share Your Story
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Featured Testimonial */}
          {testimonials.length > 0 && (
            <div
              className={cn(
                "mt-16 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-10 border border-primary/10 relative overflow-hidden",
                isVisible ? "animate-fadeIn" : "opacity-0"
              )}
              style={{
                animationDelay: "0.5s",
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="relative h-64 w-64 mx-auto rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/10">
                    {testimonials[0].image ? (
                      <Image
                        src={urlFor(testimonials[0].image).url()}
                        alt={testimonials[0].name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                        <span className="text-6xl font-medium text-primary/60">
                          {testimonials[0].name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="text-4xl font-serif text-primary/80">
                    &quot;
                  </div>
                  <p className="text-xl italic mb-6">{testimonials[0].quote}</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">{testimonials[0].name}</p>
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        {testimonials[0].trekRoute && (
                          <span className="flex items-center">
                            <CheckCircleIcon className="h-3.5 w-3.5 mr-1 text-primary" />
                            {testimonials[0].trekRoute}
                          </span>
                        )}
                        {testimonials[0].trekDate && (
                          <span className="flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            {new Date(
                              testimonials[0].trekDate
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            i < (testimonials[0].rating || 5)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share Your Story Section */}
          <div
            id="share-testimonial"
            className={cn(
              "mt-16 text-center",
              isVisible ? "animate-fadeIn" : "opacity-0"
            )}
            style={{
              animationDelay: "0.7s",
              animationFillMode: "forwards",
            }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Share Your Manaslu Experience
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Your feedback helps future trekkers and allows us to continuously
              improve our services. We&apos;d love to hear about your adventure
              with us!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/share-testimonial">
                <Button size="lg" className="px-8">
                  Share Your Story
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/testimonials">
                <Button variant="outline" size="lg" className="px-8">
                  View All Testimonials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-background/95"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/manaslu-testimonials-bg.jpg"
          alt="Manaslu Trek Landscape"
          fill
          priority
          className="object-cover object-center opacity-20"
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
        <div
          className={cn(
            "text-center mb-16 max-w-3xl mx-auto",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}
          style={{
            animationDelay: "0.1s",
            animationFillMode: "forwards",
          }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <QuoteIcon className="h-4 w-4 mr-1.5" />
            <span>Trekker Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            What Our <span className="text-primary">Trekkers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from adventurers who have experienced the magic of Manaslu with
            our expert guides. Their stories inspire us to continue providing
            exceptional trekking experiences.
          </p>
        </div>

        {/* Testimonial Tabs */}
        <div
          className={cn("mb-16", isVisible ? "animate-fadeIn" : "opacity-0")}
          style={{
            animationDelay: "0.3s",
            animationFillMode: "forwards",
          }}
        >
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="text">Written Reviews</TabsTrigger>
              <TabsTrigger value="video">Video Testimonials</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-6">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {textTestimonials.length > 0 ? (
                    textTestimonials.map((testimonial) => (
                      <CarouselItem
                        key={testimonial._id}
                        className="md:basis-1/1 lg:basis-1/2"
                      >
                        <TestimonialCard testimonial={testimonial} />
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem className="md:basis-1/1 lg:basis-1/1">
                      <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        <QuoteIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          No Written Testimonials Yet
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                          We&apos;re collecting written reviews from our
                          trekkers. Check back soon or be the first to share
                          your experience!
                        </p>
                        <Button asChild>
                          <Link href="/share-testimonial">
                            Share Your Experience{" "}
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <div className="flex items-center justify-center gap-2 mt-8">
                  <CarouselPrevious className="static transform-none mx-2" />
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                          "h-2.5 w-2.5 rounded-full transition-all",
                          {
                            "bg-primary w-6": current === index + 1,
                            "bg-primary/30": current !== index + 1,
                          }
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <CarouselNext className="static transform-none mx-2" />
                </div>
              </Carousel>
            </TabsContent>

            <TabsContent value="video">
              {videoTestimonialsToShow && videoTestimonialsToShow.length > 0 ? (
                <Carousel
                  setApi={setVideoApi}
                  className="w-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {videoTestimonialsToShow.map((testimonial) => (
                      <CarouselItem
                        key={testimonial._id}
                        className="md:basis-1/1 lg:basis-1/2"
                      >
                        <VideoTestimonialCard testimonial={testimonial} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <CarouselPrevious className="static transform-none mx-2" />
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: videoCount }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => videoApi?.scrollTo(index)}
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition-all",
                            {
                              "bg-primary w-6": videoCurrent === index + 1,
                              "bg-primary/30": videoCurrent !== index + 1,
                            }
                          )}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <CarouselNext className="static transform-none mx-2" />
                  </div>
                </Carousel>
              ) : (
                <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <PlayCircleIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Video Testimonials Yet
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We&apos;re collecting video reviews from our trekkers. Check
                    back soon or be the first to share your experience!
                  </p>
                  <Button asChild>
                    <Link href="#share-testimonial">
                      Share Your Story
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Share Your Story Section */}
        <div
          id="share-testimonial"
          className={cn(
            "mt-16 text-center",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}
          style={{
            animationDelay: "0.7s",
            animationFillMode: "forwards",
          }}
        >
          <h3 className="text-2xl font-bold mb-6">
            Share Your Manaslu Experience
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Your feedback helps future trekkers and allows us to continuously
            improve our services. We&apos;d love to hear about your adventure
            with us!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/share-testimonial">
              <Button size="lg" className="px-8">
                Share Your Story
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/testimonials">
              <Button variant="outline" size="lg" className="px-8">
                View All Testimonials
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  // Get the appropriate image source - use image if available, otherwise use src
  const profileImage = testimonial.image || testimonial.src;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg h-full flex flex-col relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
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
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                {testimonial.location && (
                  <span className="flex items-center">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {testimonial.location}
                  </span>
                )}
                {testimonial.verified && (
                  <span className="flex items-center text-emerald-500">
                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
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
        </div>

        <div className="relative">
          <QuoteIcon className="absolute -top-2 -left-1 h-6 w-6 text-primary/20" />
          <p className="pt-2 text-base leading-relaxed line-clamp-4">
            {testimonial.quote}
          </p>
        </div>

        {testimonial.trekRoute && (
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {testimonial.trekRoute}
            </span>
            {testimonial.trekDate && (
              <span className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                {new Date(testimonial.trekDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const VideoTestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoUrl = testimonial.videoUrl
    ? getVideoEmbedUrl(testimonial.videoUrl)
    : "";

  // Get the appropriate image source - use image if available, otherwise use src
  const profileImage = testimonial.image || testimonial.src;

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
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
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                {testimonial.location && (
                  <span className="flex items-center">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {testimonial.location}
                  </span>
                )}
                {testimonial.verified && (
                  <span className="flex items-center text-emerald-500">
                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
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
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="relative rounded-xl overflow-hidden cursor-pointer group/video">
              <div className="aspect-video bg-black/20 flex items-center justify-center">
                {testimonial.videoThumbnail ? (
                  <Image
                    src={urlFor(testimonial.videoThumbnail).url()}
                    alt={`${testimonial.name}'s video testimonial`}
                    fill
                    className="object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/90 text-white flex items-center justify-center group-hover/video:scale-110 transition-transform">
                    <PlayCircleIcon className="h-10 w-10" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                <p className="text-sm font-medium truncate">
                  {testimonial.trekRoute || "Manaslu Trek Experience"}
                </p>
              </div>
            </div>
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

        <div className="mt-4">
          <p className="text-base line-clamp-2 font-medium">
            {testimonial.quote}
          </p>
        </div>

        {testimonial.trekRoute && (
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {testimonial.trekRoute}
            </span>
            {testimonial.trekDate && (
              <span className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                {new Date(testimonial.trekDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
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
  {
    _id: "4",
    name: "David Müller",
    quote:
      "The Tsum Valley extension was the highlight of our trek. The ancient monasteries and the warm hospitality of the local people made this a cultural experience as much as a trekking adventure. Highly recommended!",
    rating: 5,
    designation: "Engineer",
    location: "Germany",
    trekRoute: "Manaslu Circuit with Tsum Valley",
    trekDate: "2022-11-10",
    featured: false,
    testimonialType: "text",
    verified: true,
    status: "published",
    submissionDate: "2022-12-05T00:00:00Z",
  },
];

export default Testimonial06;
