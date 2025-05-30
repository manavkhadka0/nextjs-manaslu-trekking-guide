import { Metadata } from "next";
import LatestBlog from "@/components/sections/blog/latest-blog";
import { getLatestPosts } from "@/lib/api/blog";
import Hero03 from "@/components/hero-03/hero-03";
import Testimonial06 from "@/components/testimonial-06/testimonial-06";
import FAQ07 from "@/components/faq-07/faq-07";
import Stats02Page from "@/components/stats-02/stats-02";
import Contact from "@/components/contact/Contact";
import { getFeaturedFAQs } from "@/lib/api/faq";
import { getFeaturedTestimonials } from "@/lib/sanity/queries/testimonialQueries";
import {
  getAllVideos,
  getAllPhotoGalleries,
} from "@/lib/sanity/queries/trekHighlightQueries";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  CompassIcon,
  MapPinIcon,
  MountainSnowIcon,
  PlayCircleIcon,
  ShieldIcon,
  VideoIcon,
  XIcon,
  CameraIcon,
} from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TrekHighlightCard from "@/components/trek-highlights/TrekHighlightCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TrekHighlightsGrid from "@/components/trek-highlights/TrekHighlightsGrid";

export const metadata: Metadata = {
  title:
    "Samrat Adhikari - Expert Manaslu Trek Guide | Authentic Himalayan Experience",
  description:
    "Meet Samrat Adhikari, your dedicated Manaslu Circuit Trek guide with over 10 years of experience. Discover breathtaking landscapes, authentic cultural experiences, and personalized trekking adventures with a local expert.",
};

export default async function HomePage() {
  // Fetch data for the homepage components
  const posts = await getLatestPosts(4);
  const featuredFaqs = await getFeaturedFAQs(6);
  const featuredTestimonials = await getFeaturedTestimonials();
  const trekVideos = await getAllVideos();
  const photoGalleries = await getAllPhotoGalleries(6);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <Hero03 />

      {/* Guide Introduction Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/95" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                <span>Your Personal Guide</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Meet <span className="text-primary">Samrat Adhikari</span>, Your
                Manaslu Expert
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Born and raised in the foothills of the Himalayas, I&apos;ve
                spent the last 10 years guiding trekkers through the majestic
                Manaslu Circuit. My journey began as a porter, and through
                dedication and passion, I&apos;ve become one of the most
                sought-after guides in the region.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Certified Mountain Guide</h3>
                    <p className="text-muted-foreground">
                      Licensed by Nepal Tourism Board with advanced wilderness
                      first aid training
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Local Knowledge</h3>
                    <p className="text-muted-foreground">
                      Intimate understanding of local culture, hidden trails,
                      and authentic experiences
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Experience</h3>
                    <p className="text-muted-foreground">
                      Customized itineraries based on your fitness level,
                      interests, and preferences
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full">
                  <Link href="/about" className="flex items-center">
                    My Story <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  <Link
                    href="https://wa.me/9779848740081?text=Hello%20Samrat,%20I%20want%20to%20book%20a%20trek%20with%20you."
                    target="_blank"
                    className="flex items-center"
                  >
                    Contact Me
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about.jpeg"
                  alt="Samrat Adhikari - Manaslu Trek Guide"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">10+ Years</h3>
                    <p className="text-sm text-muted-foreground">
                      Of Guiding Experience
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-background p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MountainSnowIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">50+ Treks</h3>
                    <p className="text-sm text-muted-foreground">
                      Completed Successfully
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trek Experience Section */}
      <section className="py-24 relative bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CompassIcon className="h-4 w-4 mr-1.5" />
              <span>The Manaslu Experience</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              What Makes Trekking With Me{" "}
              <span className="text-primary">Special</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              I don&apos;t just guide you through the mountains - I share my
              homeland, culture, and passion for the Himalayas to create an
              unforgettable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MapPinIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hidden Gems</h3>
              <p className="text-muted-foreground mb-4">
                Access secret viewpoints, lesser-known villages, and authentic
                cultural experiences that most tourists miss.
              </p>
              <Image
                src="/images/hidden-gems.jpeg"
                alt="Hidden viewpoints on Manaslu Trek"
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>

            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety First</h3>
              <p className="text-muted-foreground mb-4">
                Advanced wilderness first aid certified, with satellite
                communication devices and comprehensive emergency protocols.
              </p>
              <Image
                src="/images/safety-first.jpeg"
                alt="Safety equipment for Manaslu Trek"
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>

            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MountainSnowIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cultural Immersion</h3>
              <p className="text-muted-foreground mb-4">
                Connect with local communities, participate in traditional
                ceremonies, and experience authentic Himalayan hospitality.
              </p>
              <Image
                src="/images/cultural-immersion.jpeg"
                alt="Cultural experiences on Manaslu Trek"
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section (Tabbed) */}
      <section id="media-content" className="py-10 relative scroll-mt-10">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="videos" className="w-full">
            <div className="flex justify-center mb-4">
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
            <TabsContent value="videos" className="mt-2">
              <TrekHighlightsGrid
                highlights={trekVideos}
                title="Trek Highlight"
                subtitle="Watch these videos to experience the beauty and adventure of the Manaslu Circuit Trek"
                showType="videos"
              />
            </TabsContent>
            <TabsContent value="photos" className="mt-2">
              <TrekHighlightsGrid
                highlights={photoGalleries}
                title="Photo"
                subtitle="A collection of stunning photographs from the Manaslu Circuit Trek, showcasing the breathtaking landscapes, vibrant culture, and unforgettable moments"
                showType="photos"
              />
              <Link href="/media" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-primary text-white block mx-auto"
                >
                  View All
                </Button>
              </Link>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <Stats02Page />

      {/* Testimonials Section */}
      <Testimonial06 testimonials={featuredTestimonials} />

      {/* Latest Blog Section */}
      <LatestBlog posts={posts} className="bg-muted/30" />

      {/* FAQ Section */}
      <FAQ07 faqs={featuredFaqs} />

      {/* Contact Section */}
      <Contact
        email="adhikarisamrat4545@gmail.com"
        phone="+977 ‪9848740081‬"
        address="Thamel, Kathmandu, Nepal"
      />
    </main>
  );
}
