"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Image from "next/image";
import { ArrowRightIcon, CheckCircleIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SocialIcons } from "@/components/ui/social-icons";

interface ContactProps {
  email?: string;
  phone?: string;
  address?: string;
  className?: string;
}

const Contact = ({
  email = "info@manaslu-trekking.com",
  phone = "+977 9841234567",
  address = "Thamel, Kathmandu, Nepal",
  className = "",
}: ContactProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to check if already in view
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden py-24 ${className}`}>
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

      <div className="container mx-auto px-6 relative">
        {/* Header section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            <span>24/7 Customer Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl !leading-[1.15] font-bold tracking-tight mb-6">
            Let&apos;s Plan Your{" "}
            <span className="text-primary">Himalayan Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Our expert team is ready to help you create the perfect Manaslu
            Circuit trek experience. Reach out to us with any questions or to
            start planning your journey.
          </p>
        </div>

        {/* Location highlight */}
        <div
          className={cn(
            "relative mb-16 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg"
              alt="Kathmandu Office"
              fill
              className="object-cover object-center opacity-20"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-10">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 w-fit">
                <MapPinIcon className="h-4 w-4" />
                <span>Our Base Camp</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Visit Our Kathmandu Office
              </h2>
              <p className="text-muted-foreground mb-6">
                Located in the heart of Thamel, our office is the perfect
                starting point for your Himalayan adventure. Stop by to meet our
                team and discuss your trekking plans in person.
              </p>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="inline-flex items-center gap-2 text-primary hover:underline w-fit"
              >
                <span>Get directions</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/WhatsApp Image 2025-02-28 at 11.57.57 (1).jpeg"
                alt="Kathmandu Office"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <div
            className={cn(
              "order-2 lg:order-1",
              isVisible ? "animate-fadeIn" : "opacity-0"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 shadow-lg h-full">
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              <ContactInfo
                email={email}
                phone={phone}
                address={address}
                className="gap-y-10"
              />

              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <SocialIcons variant="default" size="md" />
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
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
                    <h3 className="text-lg font-semibold">
                      Need Immediate Assistance?
                    </h3>
                    <p className="text-muted-foreground mt-1 mb-3">
                      Our team is available 24/7 to answer your urgent
                      questions.
                    </p>
                    <Link href={`tel:${phone}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 border-white/20"
                      >
                        Call Now
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "order-1 lg:order-2",
              isVisible ? "animate-fadeIn" : "opacity-0"
            )}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10 shadow-lg">
              <ContactForm className="bg-transparent" />
            </div>
          </div>
        </div>

        {/* Map section */}
        <div
          className={cn(
            "mt-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg h-[400px] relative",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}
          style={{ animationDelay: "0.8s" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2585023708073!2d85.30742561506156!3d27.71524798279364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4f7%3A0x58099b8d37d04a6c!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1625123456789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
            className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          ></iframe>
          <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-semibold">Manaslu Trekking Guide</h3>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
