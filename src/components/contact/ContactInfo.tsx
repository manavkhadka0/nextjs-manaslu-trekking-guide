import React from "react";
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  email?: string;
  phone?: string;
  address?: string;
  className?: string;
}

const ContactInfo = ({
  email = "info@manaslu-trekking.com",
  phone = "+977 9841234567",
  address = "Thamel, Kathmandu, Nepal",
  className = "",
}: ContactInfoProps) => {
  // Create a map of contact info with the props (which might be overridden)
  const contactInfo = {
    Email: {
      value: email,
      url: `mailto:${email}`,
      icon: MailIcon,
      description: "Our friendly team is here to help with any questions.",
    },
    Phone: {
      value: phone,
      url: `tel:${phone}`,
      icon: PhoneIcon,
      description: "Available 24/7 for urgent trekking inquiries.",
    },
    Office: {
      value: address,
      url: "https://maps.google.com/?q=Thamel,Kathmandu,Nepal",
      icon: MapPinIcon,
      description: "Visit our office in the heart of Thamel.",
    },
    "Office Hours": {
      value: "9:00 AM - 6:00 PM NPT",
      url: "",
      icon: ClockIcon,
      description: "Open 7 days a week to serve your needs.",
    },
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8",
        className
      )}
    >
      {Object.entries(contactInfo).map(([title, info]) => (
        <div key={title} className="group">
          <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full group-hover:bg-primary/20 transition-colors duration-300">
            {React.createElement(info.icon, { className: "h-5 w-5" })}
          </div>
          <h3 className="mt-4 font-semibold text-xl">{title}</h3>
          <p className="my-2 text-muted-foreground">{info.description}</p>
          {info.url ? (
            <Link
              className="font-medium text-primary hover:underline inline-flex items-center"
              href={info.url}
              target={info.url.startsWith("http") ? "_blank" : undefined}
            >
              {info.value}
            </Link>
          ) : (
            <p className="font-medium">{info.value}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
