import { Metadata } from "next";
import {
  getAllVideos,
  getAllPhotoGalleries,
} from "@/lib/sanity/queries/trekHighlightQueries";
import TrekHighlightsGrid from "@/components/trek-highlights/TrekHighlightsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Media Gallery | Samrat Adhikari - Manaslu Trek Guide",
  description:
    "Explore videos and images from the Manaslu Circuit Trek. Get a glimpse of the breathtaking landscapes, cultural experiences, and adventures that await you.",
};

export default async function MediaPage() {
  // Fetch videos and photo galleries from Sanity
  const trekVideos = await getAllVideos();
  const photoGalleries = await getAllPhotoGalleries();

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/trek-highlights.jpeg"
            alt="Manaslu Trek Media Gallery"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center text-white py-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <CameraIcon className="h-4 w-4 mr-1.5" />
            <span>Trek Memories</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Manaslu Circuit <span className="text-primary">Media Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Explore the breathtaking landscapes and authentic cultural
            experiences of the Manaslu Circuit
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#videos">
                Watch Videos <VideoIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-black/30"
            >
              <Link href="#photos">
                View Photos <CameraIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Media Content */}
      <section id="media-content" className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="videos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger
                  id="videos"
                  value="videos"
                  className="flex items-center gap-2"
                >
                  <VideoIcon className="h-4 w-4" />
                  <span>Trek Videos</span>
                </TabsTrigger>
                <TabsTrigger
                  id="photos"
                  value="photos"
                  className="flex items-center gap-2"
                >
                  <CameraIcon className="h-4 w-4" />
                  <span>Trek Photos</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="videos" className="mt-6">
              <TrekHighlightsGrid
                highlights={trekVideos}
                title="Trek Highlight"
                subtitle="Watch these videos to experience the beauty and adventure of the Manaslu Circuit Trek"
                showType="videos"
              />
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <TrekHighlightsGrid
                highlights={photoGalleries}
                title="Photo"
                subtitle="A collection of stunning photographs from the Manaslu Circuit Trek, showcasing the breathtaking landscapes, vibrant culture, and unforgettable moments"
                showType="photos"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
