"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PortableText } from "next-sanity";
import { ActivityDetail as ActivityDetailType } from "@/lib/api/activity";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Clock,
  Star,
  Users,
  TrendingUp,
  Mountain,
  Map,
  CheckCircle,
  XCircle,
  Info,
  Flag,
  Compass,
  Sun,
  Activity,
} from "lucide-react";
import { portableTextComponents } from "@/lib/portabletextcomponents";

interface ActivityDetailProps {
  activity: ActivityDetailType;
}

export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("overview");
  const [scrolled, setScrolled] = useState(false);

  // Handle tab change from URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (
      hash &&
      ["overview", "itinerary", "gallery", "faqs", "reviews"].includes(hash)
    ) {
      setActiveTab(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.history.pushState(null, "", `${pathname}#${value}`);
    // Scroll to the top of the content with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const element = document.getElementById(value);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src={activity.coverImg.url}
          alt={activity.coverImg.alt || activity.activity_title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-lg">{activity.location}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  {activity.activity_title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">
                      {activity.ratings.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-gray-300" />
                    <span>{activity.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-right mb-2">
                  {activity.priceSale && activity.priceSale < activity.price ? (
                    <>
                      <span className="text-gray-300 line-through text-lg mr-2">
                        ${activity.price}
                      </span>
                      <span className="text-primary text-3xl font-bold">
                        ${activity.priceSale}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary text-3xl font-bold">
                      ${activity.price}
                    </span>
                  )}
                  <span className="text-gray-300 ml-1">per person</span>
                </div>
                <Button size="lg" className="px-8">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div
        className={`sticky top-24 z-40 bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ${
          scrolled ? "py-2 shadow-lg" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="w-full h-auto justify-start gap-2 bg-transparent p-0 overflow-x-auto flex-nowrap no-scrollbar">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-full px-6 py-2 transition-all hover:bg-gray-100"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="itinerary"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-full px-6 py-2 transition-all hover:bg-gray-100"
              >
                Itinerary
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-full px-6 py-2 transition-all hover:bg-gray-100"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-full px-6 py-2 transition-all hover:bg-gray-100"
              >
                FAQs
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-full px-6 py-2 transition-all hover:bg-gray-100"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6" id="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Tour Description */}
                <h2 className="text-2xl font-bold mb-4">Tour Description</h2>
                <div className="">
                  {activity.tour_description && (
                    <PortableText
                      value={activity.tour_description}
                      components={portableTextComponents}
                    />
                  )}
                </div>

                {/* Tour Highlights */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
                  <div className="space-y-2">
                    {activity.tour_highlights &&
                      activity.tour_highlights.map(
                        (highlight: any, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <Star className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                            <span className="text-gray-700">
                              {highlight.children[0].text}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>

                {/* Trek Map */}
                {activity.trek_map && activity.trek_map.url && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <Map className="h-6 w-6 mr-2 text-primary" />
                      Trek Map
                    </h2>
                    <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                      <Image
                        src={activity.trek_map.url}
                        alt={
                          activity.trek_map.alt ||
                          `${activity.activity_title} Map`
                        }
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div className=" mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Additional Information
                  </h2>
                  <div className="prose max-w-none">
                    {activity.additional_info && (
                      <PortableText
                        value={activity.additional_info}
                        components={portableTextComponents}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Trip Details */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Trip Details</h3>
                  <ul className="space-y-4">
                    {activity.difficulty_level && (
                      <li className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Difficulty Level
                          </span>
                          <span className="font-medium">
                            {activity.difficulty_level}
                          </span>
                        </div>
                      </li>
                    )}

                    {activity.max_altitude && (
                      <li className="flex items-start gap-3">
                        <Mountain className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Maximum Altitude
                          </span>
                          <span className="font-medium">
                            {activity.max_altitude}
                          </span>
                        </div>
                      </li>
                    )}

                    {activity.trip_start && (
                      <li className="flex items-start gap-3">
                        <Flag className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Trip Start
                          </span>
                          <span className="font-medium">
                            {activity.trip_start}
                          </span>
                        </div>
                      </li>
                    )}

                    {activity.trips_end && (
                      <li className="flex items-start gap-3">
                        <Compass className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Trip End
                          </span>
                          <span className="font-medium">
                            {activity.trips_end}
                          </span>
                        </div>
                      </li>
                    )}

                    {activity.group_style && (
                      <li className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Group Style
                          </span>
                          <span className="font-medium">
                            {activity.group_style}
                          </span>
                        </div>
                      </li>
                    )}

                    {activity.best_season && (
                      <li className="flex items-start gap-3">
                        <Sun className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Best Season
                          </span>
                          <span className="font-medium">
                            {activity.best_season}
                          </span>
                        </div>
                      </li>
                    )}

                    {activity.activity_type && (
                      <li className="flex items-start gap-3">
                        <Activity className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="block text-sm text-gray-500">
                            Activity Type
                          </span>
                          <span className="font-medium">
                            {activity.activity_type}
                          </span>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Includes & Excludes */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    What&apos;s Included
                  </h3>
                  {activity.tour_includes &&
                    activity.tour_includes.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {activity.tour_includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                  <h3 className="text-xl font-bold mb-4">
                    What&apos;s Excluded
                  </h3>
                  {activity.tour_excludes &&
                    activity.tour_excludes.length > 0 && (
                      <ul className="space-y-2">
                        {activity.tour_excludes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>

                {/* CTA */}
                <div className="sticky top-32 bg-primary/10 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
                  <p className="text-gray-600 mb-4">
                    Secure your spot on this amazing adventure today.
                  </p>
                  <Button
                    className="w-full mb-2"
                    onClick={() => {
                      const message = `Hi, I'm interested in booking the ${
                        activity.activity_title
                      } trek.\n\nDetails:\n- Duration: ${
                        activity.duration
                      }\n- Price: $${
                        activity.priceSale || activity.price
                      }\n\nCould you provide more information?`;
                      window.open(
                        `https://wa.me/+9779851042334?text=${encodeURIComponent(
                          message
                        )}`,
                        "_blank"
                      );
                    }}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const message = `Hi, I have some questions about the ${activity.activity_title} trek.`;
                      window.open(
                        `https://wa.me/+9779851042334?text=${encodeURIComponent(
                          message
                        )}`,
                        "_blank"
                      );
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="mt-6" id="itinerary">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-primary" />
                Detailed Itinerary
              </h2>

              {activity.itinerary && activity.itinerary.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {activity.itinerary.map((day) => (
                    <AccordionItem key={day._key} value={`day-${day.day}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                            {day.day}
                          </div>
                          <h3 className="text-lg font-semibold text-left">
                            {day.title}
                          </h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-14">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {day.trek_distance && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  Distance:
                                </span>
                                <span className="font-medium">
                                  {day.trek_distance}
                                </span>
                              </div>
                            )}

                            {day.trek_duration && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  Duration:
                                </span>
                                <span className="font-medium">
                                  {day.trek_duration}
                                </span>
                              </div>
                            )}

                            {day.highest_altitude && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  Altitude:
                                </span>
                                <span className="font-medium">
                                  {day.highest_altitude}
                                </span>
                              </div>
                            )}

                            {day.accomodation && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  Accommodation:
                                </span>
                                <span className="font-medium">
                                  {day.accomodation}
                                </span>
                              </div>
                            )}

                            {day.meals && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  Meals:
                                </span>
                                <span className="font-medium">{day.meals}</span>
                              </div>
                            )}
                          </div>

                          <div className="prose max-w-none">
                            {day.description && (
                              <PortableText
                                value={day.description}
                                components={portableTextComponents}
                              />
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-gray-500">
                  No itinerary information available.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-6" id="gallery">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>

              {activity.gallery && activity.gallery.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activity.gallery.map((image) => (
                    <div
                      key={image._key}
                      className="relative h-60 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || activity.activity_title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No gallery images available.</p>
              )}
            </div>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="mt-6" id="faqs">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2 text-primary" />
                Frequently Asked Questions
              </h2>

              {activity.faqs && activity.faqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {activity.faqs.map((faq) => (
                    <AccordionItem key={faq._id} value={faq._id}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="prose max-w-none">
                          <PortableText
                            value={faq.answer}
                            components={portableTextComponents}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-gray-500">
                  No FAQs available for this activity.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6" id="reviews">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="h-6 w-6 mr-2 text-primary" />
                Customer Reviews
              </h2>

              {activity.testimonials && activity.testimonials.length > 0 ? (
                <div className="space-y-6">
                  {activity.testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {(testimonial.designation || testimonial.location) && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          {testimonial.designation && (
                            <span>{testimonial.designation}</span>
                          )}
                          {testimonial.designation && testimonial.location && (
                            <span className="mx-1">•</span>
                          )}
                          {testimonial.location && (
                            <span>{testimonial.location}</span>
                          )}
                        </div>
                      )}

                      <p className="text-gray-700">{testimonial.quote}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No reviews available for this activity.
                </p>
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Have you experienced this trek? Share your thoughts!
                </p>
                <Button asChild>
                  <Link href="/share-testimonial">Write a Review</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
