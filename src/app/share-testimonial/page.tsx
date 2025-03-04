import { Metadata } from "next";
import TestimonialForm from "@/components/testimonial-06/testimonial-form";
import Image from "next/image";
import { MountainIcon, QuoteIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Share Your Testimonial | Manaslu Trekking Guide",
  description:
    "Share your experience with Manaslu Trekking Guide. Your feedback helps future trekkers and allows us to continuously improve our services.",
  openGraph: {
    title: "Share Your Testimonial | Manaslu Trekking Guide",
    description:
      "Share your experience with Manaslu Trekking Guide. Your feedback helps future trekkers and allows us to continuously improve our services.",
    images: [
      {
        url: "/images/manaslu-testimonials-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Manaslu Trekking Guide - Share Your Testimonial",
      },
    ],
  },
};

export default function ShareTestimonialPage() {
  return (
    <main className="relative min-h-screen py-24 overflow-hidden">
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
        {/* Page header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <QuoteIcon className="h-4 w-4 mr-1.5" />
            <span>Share Your Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Tell Us About Your{" "}
            <span className="text-primary">Manaslu Experience</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your feedback is invaluable to us and helps future trekkers make
            informed decisions. Share your experience and become part of our
            growing community of Manaslu adventurers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <TestimonialForm />
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MountainIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-4">
                Why Share Your Experience?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Help future trekkers make informed decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Contribute to improving our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Share your unique perspective and insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Become part of our community of adventurers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Relive and preserve your memories</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Submission Guidelines</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Be honest and authentic in your feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    Include specific details about your trek experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>For video testimonials, ensure good audio quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>All submissions are reviewed before publishing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">5.</span>
                  <span>We may edit testimonials for clarity or length</span>
                </li>
              </ul>
              <p className="mt-4 text-sm">
                By submitting your testimonial, you grant us permission to share
                it on our website and social media channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
