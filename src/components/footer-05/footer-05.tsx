"use client";

import {
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  TwitterIcon,
  HeartIcon,
  MountainIcon,
  CompassIcon,
  CalendarIcon,
  ShieldIcon,
  ChevronRightIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Main navigation links
const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Manaslu Trek",
    href: "/manaslu-trek",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

// Resources links
const resourceLinks = [
  {
    title: "FAQs",
    href: "/faqs",
  },
  {
    title: "Booking",
    href: "/booking",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms-conditions",
  },
];

// Travel guide links
const travelGuideLinks = [
  {
    title: "Best Trekking Season",
    href: "/best-season-for-manaslu-trek",
  },
  {
    title: "Gear Checklist",
    href: "/manaslu-trek-gear-checklist",
  },
  {
    title: "Permits & Visas",
    href: "/manaslu-trek-permits",
  },
  {
    title: "Safety Information",
    href: "/manaslu-trek-safety",
  },
];

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
  >
    <ChevronRightIcon className="h-4 w-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
    <span className="group-hover:translate-x-1 transition-transform duration-200">
      {children}
    </span>
  </Link>
);

// Social media link component
const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <Link
    href={href}
    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </Link>
);

const Footer05Page = () => {
  return (
    <footer className="relative w-full">
      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 py-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Join Our Newsletter
                </h3>
                <p className="text-gray-200 mb-6 max-w-2xl">
                  Subscribe to receive updates on new treks, seasonal offers,
                  and travel tips for your Manaslu adventure.
                </p>
              </div>
              <div className="lg:col-span-2">
                <form className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mountain Silhouette Header */}
      <div className="relative w-full bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/0 to-gray-950 z-10"></div>
        <Image
          src="/Untitled design.png"
          alt="Nepal Mountains Silhouette"
          width={1920}
          height={400}
          className="w-full h-[180px] md:h-[280px] object-contain relative z-0"
          style={{
            objectPosition: "bottom",
          }}
          priority
        />
      </div>

      {/* Main Footer Content */}
      <div className="w-full bg-gray-950 -mt-1 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <MountainIcon className="absolute top-20 right-[15%] h-24 w-24 text-white/5" />
          <CompassIcon className="absolute bottom-20 left-[10%] h-16 w-16 text-white/5" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-white/5 rounded-full opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-16">
            {/* Company Info */}
            <div>
              <div className="mb-6">
                <Image
                  src="/logo-white.png"
                  alt="Manaslu Trekking Guide"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-6">
                Your trusted partner for unforgettable trekking experiences in
                the Manaslu region of Nepal. We provide professional guides,
                customized itineraries, and ensure your safety throughout the
                journey.
              </p>
              <div className="flex gap-3">
                <SocialLink href="#" icon={FacebookIcon} label="Facebook" />
                <SocialLink href="#" icon={TwitterIcon} label="Twitter" />
                <SocialLink href="#" icon={InstagramIcon} label="Instagram" />
                <SocialLink href="#" icon={YoutubeIcon} label="YouTube" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white flex items-center">
                <span className="h-px w-6 bg-primary mr-3"></span>
                QUICK LINKS
              </h3>
              <ul className="space-y-3">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <FooterLink href={href}>{title}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white flex items-center">
                <span className="h-px w-6 bg-primary mr-3"></span>
                RESOURCES
              </h3>
              <ul className="space-y-3">
                {resourceLinks.map(({ title, href }) => (
                  <li key={title}>
                    <FooterLink href={href}>{title}</FooterLink>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mb-6 mt-8 text-white flex items-center">
                <span className="h-px w-6 bg-primary mr-3"></span>
                TRAVEL GUIDES
              </h3>
              <ul className="space-y-3">
                {travelGuideLinks.map(({ title, href }) => (
                  <li key={title}>
                    <FooterLink href={href}>{title}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white flex items-center">
                <span className="h-px w-6 bg-primary mr-3"></span>
                CONTACT US
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="flex-shrink-0 h-5 w-5 mt-1 text-primary" />
                  <p>Thamel, Kathmandu, Nepal</p>
                </div>
                <div className="flex items-center gap-3">
                  <MailIcon className="flex-shrink-0 h-5 w-5 text-primary" />
                  <a
                    href="mailto:info@manaslutrekking.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    info@manaslutrekking.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="flex-shrink-0 h-5 w-5 text-primary" />
                  <a
                    href="tel:+9779812345678"
                    className="hover:text-white transition-colors duration-200"
                  >
                    +977 9812345678
                  </a>
                </div>
                <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-sm text-white font-medium mb-1">
                    Emergency Contact
                  </p>
                  <p className="text-sm text-gray-300">
                    24/7 Support: +977 9801234567
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">License No: 1234/067</p>
                  <p className="text-sm text-gray-400">
                    Regd. No: 56789/066/067
                  </p>
                  <p className="text-sm text-gray-400">
                    (Manaslu Trekking Guide Pvt. Ltd)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="border-t border-white/10 pt-12 pb-8">
            <h3 className="text-xl font-bold text-white mb-8 text-center">
              Why Choose Manaslu Trekking Guide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center group">
                <div className="bg-white/5 p-4 rounded-full mb-4 border border-white/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <MountainIcon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-white font-medium mb-2">Local Expertise</h4>
                <p className="text-gray-300 text-sm">
                  Native guides with deep knowledge of Manaslu region
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-white/5 p-4 rounded-full mb-4 border border-white/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <CompassIcon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-white font-medium mb-2">
                  Personalized Service
                </h4>
                <p className="text-gray-300 text-sm">
                  Customized treks tailored to your preferences
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-white/5 p-4 rounded-full mb-4 border border-white/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-white font-medium mb-2">
                  Flexible Scheduling
                </h4>
                <p className="text-gray-300 text-sm">
                  Trek dates that work with your travel plans
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-white/5 p-4 rounded-full mb-4 border border-white/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <ShieldIcon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-white font-medium mb-2">Safety First</h4>
                <p className="text-gray-300 text-sm">
                  Comprehensive safety measures on all treks
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section with Copyright */}
          <div className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()}{" "}
                <Link
                  href="/"
                  className="text-white hover:text-primary transition-colors duration-200"
                >
                  Manaslu Trekking Guide
                </Link>
                . All rights reserved.
              </div>

              {/* Made with love */}
              <div className="text-gray-400 text-sm flex items-center">
                <span>Made with</span>
                <HeartIcon className="h-4 w-4 mx-1 text-red-400 animate-pulse" />
                <span>in Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer05Page;
