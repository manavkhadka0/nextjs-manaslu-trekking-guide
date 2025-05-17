import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import Contact from "@/components/contact/Contact";
import SocialCard from "@/components/contact/SocialCard";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Manaslu Trekking Guide",
  description:
    "Get in touch with our team for any inquiries about trekking in the Manaslu region of Nepal.",
  openGraph: {
    title: "Contact Us | Manaslu Trekking Guide",
    description:
      "Get in touch with our team for any inquiries about trekking in the Manaslu region of Nepal.",
    images: [
      {
        url: "/images/WhatsApp Image 2025-02-28 at 11.57.59 (2).jpeg",
        width: 1200,
        height: 630,
        alt: "Manaslu Trekking Guide - Contact Us",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/WhatsApp Image 2025-02-28 at 11.57.59 (2).jpeg"
            alt="Manaslu Mountains"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center text-white py-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <PhoneIcon className="h-4 w-4 mr-1.5" />
            <span>24/7 Customer Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Let&apos;s Plan Your{" "}
            <span className="text-primary">Himalayan Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Our expert team is ready to help you create the perfect Manaslu
            Circuit trek experience
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <a href="#contact-form">
                Send Message <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-black/30"
            >
              <Link href="/itinerary">View Trek Itinerary</Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contact Section */}
      <section id="" className="relative">
        <Contact
          email={CONTACT_INFO.email}
          phone={CONTACT_INFO.phone}
          address={CONTACT_INFO.address}
          className="pt-0" // Remove top padding since we have the hero section
        />
      </section>

      {/* Social Media Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        {/* <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow us on social media for stunning photos, trail updates, and
              special offers on upcoming treks
            </p>
          </div>

          <SocialCard />
        </div> */}
      </section>
    </main>
  );
}
