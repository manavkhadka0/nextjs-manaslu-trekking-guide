"use client";

import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  TwitterIcon,
  LinkedinIcon,
  GlobeIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Using the same navigation links as in nav-menu.tsx
const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "About",
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

// Additional useful links for a trekking guide website
const additionalLinks = [
  {
    title: "Trekking Routes",
    href: "/routes",
  },
  {
    title: "Booking",
    href: "/booking",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
  },
];

// Travel guide links
const travelGuideLinks = [
  {
    title: "Best Trekking Season",
    href: "/best-season",
  },
  {
    title: "Gear Checklist",
    href: "/gear-checklist",
  },
  {
    title: "Visa Information",
    href: "/visa-info",
  },
  {
    title: "Travel Insurance",
    href: "/insurance",
  },
  {
    title: "Nepal at a Glance",
    href: "/nepal-glance",
  },
];

const Footer05Page = () => {
  return (
    <footer className="relative w-full">
      {/* Mountain Silhouette Header */}
      <div className="relative w-full">
        <Image
          src="/Untitled design.png"
          alt="Nepal Mountains Silhouette"
          width={1920}
          height={400}
          className="w-full h-[280px] md:h-[380px] object-contain"
          style={{
            objectPosition: "bottom",
          }}
          priority
        />
      </div>

      {/* Main Footer Content */}
      <div className="w-full bg-primary -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-16">
            {/* Address and Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">ADDRESS</h3>
              <div className="space-y-4 text-gray-200">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="flex-shrink-0 h-5 w-5 mt-1" />
                  <p>Thamel, Kathmandu, Nepal</p>
                </div>
                <h3 className="text-xl font-bold text-white pt-4">CONTACT</h3>
                <div className="flex items-center gap-3">
                  <MailIcon className="flex-shrink-0 h-5 w-5" />
                  <a
                    href="mailto:info@manaslutrekking.com"
                    className="hover:text-white"
                  >
                    info@manaslutrekking.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="flex-shrink-0 h-5 w-5" />
                  <a href="tel:+9779812345678" className="hover:text-white">
                    +977 9812345678
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <GlobeIcon className="flex-shrink-0 h-5 w-5" />
                  <a
                    href="https://www.manaslutrekking.com/"
                    className="hover:text-white"
                  >
                    www.manaslutrekking.com
                  </a>
                </div>
                <p>License No: 1234/067</p>
                <p>Regd. No: 56789/066/067</p>
                <p>(Manaslu Trekking Guide Pvt. Ltd)</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">QUICK LINKS</h3>
              <ul className="space-y-3 text-gray-200">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link href={href} className="hover:text-white">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">RESOURCES</h3>
              <ul className="space-y-3 text-gray-200">
                {additionalLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link href={href} className="hover:text-white">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Guide */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                TRAVEL GUIDE
              </h3>
              <ul className="space-y-3 text-gray-200">
                {travelGuideLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link href={href} className="hover:text-white">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company Info Section */}
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">
              Manaslu Trekking Guide
            </h2>
            <p className="text-gray-200 text-center max-w-2xl">
              Your trusted partner for unforgettable trekking experiences in the
              Manaslu region of Nepal. We provide professional guides,
              customized itineraries, and ensure your safety throughout the
              journey.
            </p>
          </div>

          {/* Bottom Section with Social and Copyright */}
          <div className="border-t border-gray-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Media */}
              <div>
                <h4 className="text-white font-bold mb-4 text-center md:text-left">
                  FOLLOW US
                </h4>
                <div className="flex gap-4">
                  <Link href="#" className="text-white hover:text-gray-300">
                    <FacebookIcon className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-white hover:text-gray-300">
                    <TwitterIcon className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-white hover:text-gray-300">
                    <LinkedinIcon className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-white hover:text-gray-300">
                    <InstagramIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-gray-300 text-center md:text-right">
                &copy; {new Date().getFullYear()}{" "}
                <Link href="/" className="hover:text-white">
                  Manaslu Trekking Guide
                </Link>
                . All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer05Page;
