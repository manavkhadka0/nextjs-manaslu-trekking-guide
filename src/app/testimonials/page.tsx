import { Metadata } from "next";
import Testimonial06 from "@/components/testimonial-06/testimonial-06";
import {
  getAllTestimonials,
  getVideoTestimonials,
} from "@/lib/sanity/queries/testimonialQueries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CameraIcon, VideoIcon } from "lucide-react";
import Image from "next/image";

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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/trek-highlights.jpeg"
            alt="Manaslu Trek Testimonials Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center text-white py-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary text-white text-sm font-medium backdrop-blur-sm">
            <CameraIcon className="h-4 w-4 mr-1.5" />
            <span>Testimonials</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            What Trekkers Say <span className="text-primary">About Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Discover authentic stories and feedback from adventurers who have
            trekked the Manaslu Circuit with us. Your journey, in their words.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>
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
