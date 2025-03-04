"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CameraIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { TrekHighlight } from "@/lib/sanity/queries/trekHighlightQueries";
import { urlFor } from "@/lib/sanity/client";

interface PhotoGalleryCardProps {
  highlight: TrekHighlight;
  className?: string;
}

const PhotoGalleryCard = ({
  highlight,
  className = "",
}: PhotoGalleryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Make sure photos exist and is an array
  const photos = highlight.photos || [];

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group ${className}`}
    >
      <div className="relative aspect-video">
        <Image
          src={urlFor(highlight.thumbnail).url()}
          alt={highlight.title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="h-16 w-16 rounded-full bg-primary/90 text-white flex items-center justify-center hover:bg-primary transition-colors">
                <CameraIcon className="h-8 w-8" />
              </button>
            </DialogTrigger>
            <DialogContent
              className="max-w-5xl p-0 bg-black border-none"
              onKeyDown={handleKeyDown}
              onInteractOutside={() => setIsOpen(false)}
            >
              {photos.length > 0 && (
                <div className="relative">
                  {/* Main image */}
                  <div className="relative h-[70vh] w-full">
                    <Image
                      src={urlFor(photos[currentPhotoIndex].asset).url()}
                      alt={photos[currentPhotoIndex].caption || highlight.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Caption */}
                  {photos[currentPhotoIndex].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                      <p className="text-sm md:text-base">
                        {photos[currentPhotoIndex].caption}
                        {photos[currentPhotoIndex].location && (
                          <span className="text-gray-300 ml-2">
                            - {photos[currentPhotoIndex].location}
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  {photos.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80"
                        onClick={handlePrevious}
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80"
                        onClick={handleNext}
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80"
                    onClick={() => setIsOpen(false)}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>

                  {/* Image counter */}
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                    {currentPhotoIndex + 1} / {photos.length}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{highlight.title}</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {photos.length} Photos
          </span>
        </div>
        <p className="text-muted-foreground">{highlight.description}</p>
        {highlight.location && (
          <div className="mt-3 text-sm text-muted-foreground flex items-center">
            <span className="font-medium">Location:</span>
            <span className="ml-1">{highlight.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGalleryCard;
