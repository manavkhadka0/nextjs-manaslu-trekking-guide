"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
  CompassIcon,
  MapIcon,
  MountainSnowIcon,
  TentIcon,
  CalendarIcon,
  ChevronRightIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { FAQ } from "@/lib/api/faq";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FAQ07Props {
  faqs: FAQ[];
}

// Define the categories we want to use
const CATEGORIES = [
  "General",
  "Trekking",
  "Accommodation",
  "Travel",
  "Permits",
];

// Category information with icons and descriptions
const CATEGORY_INFO = {
  General: {
    icon: <CompassIcon className="h-6 w-6" />,
    description: "Essential information about our Manaslu trekking services",
    color: "bg-blue-500/10 text-blue-500",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.59.jpeg",
    keywords: [
      "Manaslu trek",
      "Nepal trekking",
      "trekking guide",
      "Himalayan adventure",
    ],
  },
  Trekking: {
    icon: <MountainSnowIcon className="h-6 w-6" />,
    description:
      "Expert guidance on Manaslu Circuit routes and difficulty levels",
    color: "bg-emerald-500/10 text-emerald-500",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.59 (1).jpeg",
    keywords: [
      "Manaslu Circuit",
      "trekking routes",
      "trail difficulty",
      "hiking preparation",
    ],
  },
  Accommodation: {
    icon: <TentIcon className="h-6 w-6" />,
    description: "Comfortable lodging options during your Manaslu adventure",
    color: "bg-amber-500/10 text-amber-500",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.58.jpeg",
    keywords: [
      "tea houses",
      "mountain lodges",
      "trekking accommodation",
      "Manaslu lodging",
    ],
  },
  Travel: {
    icon: <MapIcon className="h-6 w-6" />,
    description:
      "Transportation and travel logistics for your Himalayan journey",
    color: "bg-purple-500/10 text-purple-500",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.57 (1).jpeg",
    keywords: [
      "Nepal travel",
      "Kathmandu to Manaslu",
      "mountain transportation",
      "travel logistics",
    ],
  },
  Permits: {
    icon: <CalendarIcon className="h-6 w-6" />,
    description: "Essential permits and documentation for your Manaslu trek",
    color: "bg-rose-500/10 text-rose-500",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg",
    keywords: [
      "trekking permits",
      "MCAP permit",
      "restricted area permit",
      "Nepal visa",
    ],
  },
};

const FAQ07 = ({ faqs }: FAQ07Props) => {
  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    // Default to "General" if no category or not in our predefined list
    const category =
      faq.category && CATEGORIES.includes(faq.category)
        ? faq.category
        : "General";

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  // Ensure all categories exist in the order we want, even if empty
  const orderedCategories = CATEGORIES.filter(
    (category) =>
      // Only include categories that have FAQs
      groupedFaqs[category] && groupedFaqs[category].length > 0
  );

  // State for active category
  const [activeCategory, setActiveCategory] = useState(
    orderedCategories[0] || ""
  );
  const [scrolled, setScrolled] = useState(false);

  // Check if mobile on mount and handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get total FAQ count
  const totalFaqCount = Object.values(groupedFaqs).reduce(
    (total, categoryFaqs) => total + categoryFaqs.length,
    0
  );

  // Get keywords for SEO
  const activeKeywords =
    CATEGORY_INFO[activeCategory as keyof typeof CATEGORY_INFO]?.keywords || [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/WhatsApp Image 2025-02-28 at 11.57.59 (2).jpeg"
          alt="Manaslu Mountains"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative pt-16 pb-24">
        {/* SEO-friendly hidden keywords */}
        <div className="sr-only">
          <h2>Manaslu Circuit Trek Frequently Asked Questions</h2>
          <p>
            Find answers about trekking in Nepal, Manaslu Circuit permits,
            accommodation, guides, and preparation
          </p>
          <ul>
            {activeKeywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>

        {/* Header with title and description */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            <span>{totalFaqCount}+ Questions Answered</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl !leading-[1.15] font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Your <span className="text-primary">Manaslu Trek</span> Questions,
            Expertly Answered
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover everything you need to know about the breathtaking Manaslu
            Circuit Trek, from preparation and permits to accommodation and
            cultural insights.
          </p>

          {/* Search shortcut */}
          <div className="mt-8">
            <Link
              href="/faqs/search?focus=search"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              <SearchIcon className="h-4 w-4" />
              <span>Search all FAQs</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Category navigation - Desktop */}
        <div
          className={cn(
            "hidden lg:flex justify-center mb-12 sticky transition-all duration-300",
            scrolled
              ? "top-4 z-50 bg-background/80 backdrop-blur-md rounded-full shadow-lg py-2 px-4"
              : "top-8"
          )}
          data-scrolled={scrolled ? "true" : "false"}
        >
          <div className="flex gap-3 p-1.5 bg-accent/50 rounded-full">
            {orderedCategories.map((category) => {
              const categoryInfo =
                CATEGORY_INFO[category as keyof typeof CATEGORY_INFO];
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200",
                    isActive
                      ? `${categoryInfo.color} shadow-sm`
                      : "hover:bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-6 flex items-center justify-center",
                      isActive ? "" : "text-muted-foreground"
                    )}
                  >
                    {categoryInfo.icon}
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      isActive ? "" : "text-muted-foreground"
                    )}
                  >
                    {category}
                  </span>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isActive ? "bg-white/20" : "bg-muted"
                    )}
                  >
                    {groupedFaqs[category].length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile category tabs */}
        <div
          className={cn(
            "lg:hidden mb-8 overflow-x-auto no-scrollbar sticky transition-all duration-300",
            scrolled
              ? "top-2 z-50 bg-background/80 backdrop-blur-md rounded-full shadow-lg py-2"
              : "top-4"
          )}
          data-scrolled={scrolled ? "true" : "false"}
        >
          <div className="flex space-x-2 pb-2 px-1">
            {orderedCategories.map((category) => {
              const categoryInfo =
                CATEGORY_INFO[category as keyof typeof CATEGORY_INFO];
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                    isActive
                      ? categoryInfo.color
                      : "bg-accent hover:bg-accent/80"
                  )}
                >
                  <div className="h-5 w-5">{categoryInfo.icon}</div>
                  <span>{category}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {groupedFaqs[category].length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left side - Featured image and description */}
          <div className="lg:w-2/5 space-y-6 lg:sticky lg:top-32 self-start">
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40 z-10" />
              <Image
                src={
                  CATEGORY_INFO[activeCategory as keyof typeof CATEGORY_INFO]
                    .image
                }
                alt={`Manaslu ${activeCategory} - Nepal Trekking Guide`}
                width={600}
                height={400}
                className="object-cover w-full h-[350px] transition-all duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-full",
                        CATEGORY_INFO[
                          activeCategory as keyof typeof CATEGORY_INFO
                        ].color
                          .replace("text-", "bg-")
                          .replace("/10", "/80")
                      )}
                    >
                      {
                        CATEGORY_INFO[
                          activeCategory as keyof typeof CATEGORY_INFO
                        ].icon
                      }
                    </div>
                    <h2 className="text-2xl font-bold">{activeCategory}</h2>
                  </div>
                  <p className="text-white/90 text-lg">
                    {
                      CATEGORY_INFO[
                        activeCategory as keyof typeof CATEGORY_INFO
                      ].description
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Category stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                About {activeCategory} FAQs
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-muted-foreground">
                    Questions answered
                  </span>
                  <span className="font-medium text-lg">
                    {groupedFaqs[activeCategory].length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-muted-foreground">Expert-verified</span>
                  <span className="font-medium text-emerald-500 flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    100%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last updated</span>
                  <span className="font-medium">June 2023</span>
                </div>
                <div className="mt-6">
                  <Link href={`/faqs/${activeCategory}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-white/10 hover:bg-white/20 border-white/20"
                    >
                      View all {activeCategory} FAQs
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Expert advice */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary">
                  <Image
                    src="/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg"
                    alt="Trekking Expert"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Expert Advice</h3>
                  <p className="text-muted-foreground mt-1">
                    Our Manaslu specialists recommend proper acclimatization and
                    preparation for this breathtaking trek.
                  </p>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline inline-flex items-center mt-3"
                  >
                    Ask our experts
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Selected category FAQs */}
          <div className="lg:w-3/5">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={cn(
                  "h-12 w-12 flex items-center justify-center rounded-full",
                  CATEGORY_INFO[activeCategory as keyof typeof CATEGORY_INFO]
                    .color
                )}
              >
                {
                  CATEGORY_INFO[activeCategory as keyof typeof CATEGORY_INFO]
                    .icon
                }
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {activeCategory} Questions
                </h2>
                <p className="text-muted-foreground">
                  {
                    CATEGORY_INFO[activeCategory as keyof typeof CATEGORY_INFO]
                      .description
                  }
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {groupedFaqs[activeCategory]?.map((faq) => (
                <AccordionItem
                  key={faq._id}
                  value={faq._id}
                  className="bg-white/5 backdrop-blur-sm py-1 px-5 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-all"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex flex-1 items-center justify-between py-5 font-medium tracking-tight transition-all hover:text-primary",
                        "text-start text-lg"
                      )}
                    >
                      {faq.question}
                      <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none pb-6">
                    {Array.isArray(faq.answer) ? (
                      <div className="rich-text">
                        {faq.answer.map((block, index) => (
                          <p key={index}>{block.children?.[0]?.text || ""}</p>
                        ))}
                      </div>
                    ) : (
                      <p>{faq.answer}</p>
                    )}

                    {/* Related FAQs if available */}
                    {faq.relatedFaqs && faq.relatedFaqs.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="font-medium text-foreground text-sm">
                          Related questions:
                        </p>
                        <ul className="mt-2 space-y-2">
                          {faq.relatedFaqs.map((related) => (
                            <li key={related._id}>
                              <Link
                                href={`/faqs?faq=${related._id}`}
                                className="text-primary hover:underline flex items-center gap-1 text-sm"
                              >
                                <ChevronRightIcon className="h-3 w-3" />
                                {related.question}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still have questions section */}
            <div className="mt-12 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-8 border border-primary/10 text-center">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our Manaslu trekking experts are ready to help you plan your
                perfect Himalayan adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Contact Us
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/faqs/search?focus=search">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Search All FAQs
                    <SearchIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ07;
