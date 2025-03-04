import { Metadata } from "next";
import Testimonial06 from "@/components/testimonial-06/testimonial-06";
import {
  getAllTestimonials,
  getVideoTestimonials,
} from "@/lib/sanity/queries/testimonialQueries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials | Manaslu Trekking Guide",
  description:
    "Read what our trekkers say about their experiences with Manaslu Trekking Guide. Authentic reviews and testimonials from adventurers who have explored the Manaslu region with us.",
  openGraph: {
    title: "Testimonials | Manaslu Trekking Guide",
    description:
      "Read what our trekkers say about their experiences with Manaslu Trekking Guide. Authentic reviews and testimonials from adventurers who have explored the Manaslu region with us.",
    images: [
      {
        url: "/images/manaslu-testimonials-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Manaslu Trekking Guide - Testimonials",
      },
    ],
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function TestimonialsPage() {
  // Fetch testimonials from Sanity
  const testimonials = await getAllTestimonials();
  const videoTestimonials = await getVideoTestimonials();

  return (
    <main>
      <Testimonial06
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
      />

      <div className="container mx-auto px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Ready to Share Your Own Experience?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We&apos;d love to hear about your adventure with us. Your feedback
          helps future trekkers and allows us to continuously improve our
          services.
        </p>
        <Button asChild size="lg" className="px-8">
          <Link href="/share-testimonial">
            Share Your Story
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
