"use client";

import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
  variant?: "default" | "outline" | "ghost" | "minimal";
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

export function SocialIcons({
  className,
  iconClassName,
  variant = "default",
  size = "md",
  showLabels = false,
}: SocialIconsProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const variants = {
    default: "bg-white/10 hover:bg-primary/20 text-primary",
    outline:
      "bg-transparent border border-white/20 hover:border-primary/50 text-primary",
    ghost: "bg-transparent hover:bg-white/10 text-white hover:text-primary",
    minimal: "bg-transparent text-muted-foreground hover:text-primary",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            aria-label={social.name}
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-300",
              variants[variant],
              sizeClasses[size],
              showLabels && "gap-2 px-4 rounded-full"
            )}
          >
            <Icon className={cn(iconSizes[size], iconClassName)} />
            {showLabels && (
              <span className="text-sm font-medium">{social.name}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
