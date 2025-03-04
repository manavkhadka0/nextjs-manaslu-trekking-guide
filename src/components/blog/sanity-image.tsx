"use client";

import Image from "next/image";
import { useState } from "react";

interface SanityImageProps {
  value: {
    asset?: {
      _ref?: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
        };
      };
    };
    alt?: string;
    caption?: string;
    url?: string;
    src?: string;
    width?: number;
    height?: number;
    hotspot?: {
      x?: number;
      y?: number;
    };
  };
  isInline?: boolean;
}

export function SanityImage({ value, isInline = false }: SanityImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle case where image is missing
  if (!value) return null;

  // Get the image URL - handle different Sanity image object structures
  const imageUrl = value.asset?.url || value.url || value.src;
  if (!imageUrl) return null;

  // Get image dimensions if available
  const width = value.width || value.asset?.metadata?.dimensions?.width || 1200;
  const height =
    value.height || value.asset?.metadata?.dimensions?.height || 800;

  // Get alt text
  const alt = value.alt || value.caption || "Blog post image";

  // Calculate aspect ratio for responsive display
  const aspectRatio = width / height;

  // Handle hotspot positioning if available
  const objectPosition = value.hotspot
    ? `${value.hotspot.x ? value.hotspot.x * 100 : 50}% ${
        value.hotspot.y ? value.hotspot.y * 100 : 50
      }%`
    : "center";

  return (
    <figure className={isInline ? "inline-block mx-2" : "my-8"}>
      <div
        className={
          isInline
            ? "inline-block overflow-hidden rounded-md"
            : "relative overflow-hidden rounded-lg shadow-md"
        }
        style={
          isInline
            ? { maxWidth: "300px" }
            : { aspectRatio: aspectRatio || 16 / 9 }
        }
      >
        {isInline ? (
          <Image
            src={imageUrl}
            alt={alt}
            width={300}
            height={300 / (aspectRatio || 1.5)}
            className={`object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            style={{ objectPosition }}
          />
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className={`object-cover transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(min-width: 1280px) 800px, (min-width: 1024px) 66vw, (min-width: 768px) 90vw, 100vw"
              onLoad={() => setIsLoaded(true)}
              style={{ objectPosition }}
            />
            <div
              className={`absolute inset-0 bg-gray-100 transition-opacity duration-500 ${
                isLoaded ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        )}
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
