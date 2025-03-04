"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SocialCardProps {
  className?: string;
}

const SocialCard = ({ className }: SocialCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden backdrop-blur-sm bg-white/5 border-white/10 shadow-lg",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Connect With Us</CardTitle>
        <CardDescription>
          Follow our journey through the Himalayas and stay updated on our
          latest treks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SOCIAL_LINKS.map((social, index) => (
            <SocialItem key={social.name} social={social} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface SocialItemProps {
  social: SocialLink;
  index: number;
}

const SocialItem = ({ social, index }: SocialItemProps) => {
  const Icon = social.icon;

  return (
    <div
      className="animate-fadeIn opacity-0"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <Link
        href={social.url}
        target="_blank"
        className="group flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/20 transition-all duration-300 h-full"
      >
        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 mb-3">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-medium text-base mb-1 group-hover:text-primary transition-colors">
          {social.name}
        </h3>
        {social.username && (
          <p className="text-sm text-muted-foreground text-center">
            {social.username}
          </p>
        )}
      </Link>
    </div>
  );
};

export default SocialCard;
