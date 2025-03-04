import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MountainIcon,
  MapPinIcon,
  CalendarIcon,
  HeartIcon,
  UsersIcon,
  CompassIcon,
  StarIcon,
  ArrowRightIcon,
  QuoteIcon,
  CheckCircleIcon,
  GlobeIcon,
  CameraIcon,
} from "lucide-react";
import { getFeaturedPhotoGalleries } from "@/lib/sanity/queries/trekHighlightQueries";
import TrekHighlightCard from "@/components/trek-highlights/TrekHighlightCard";

export const metadata: Metadata = {
  title: "About Me | Samrat Adhikari - Manaslu Trekking Guide",
  description:
    "Learn about Samrat Adhikari's journey as a professional trekking guide in the Manaslu region of Nepal, his experience, philosophy, and passion for the mountains.",
  openGraph: {
    title: "About Me | Samrat Adhikari - Manaslu Trekking Guide",
    description:
      "Learn about Samrat Adhikari's journey as a professional trekking guide in the Manaslu region of Nepal, his experience, philosophy, and passion for the mountains.",
    images: [
      {
        url: "/images/WhatsApp Image 2025-02-28 at 11.57.59.jpeg",
        width: 1200,
        height: 630,
        alt: "Samrat Adhikari - Manaslu Trekking Guide",
      },
    ],
  },
};

export default async function AboutPage() {
  // Fetch featured photo galleries from Sanity
  const featuredGalleries = await getFeaturedPhotoGalleries(3);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/WhatsApp Image 2025-02-28 at 11.57.59.jpeg"
            alt="Manaslu Trek Landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center text-white py-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <MountainIcon className="h-4 w-4 mr-1.5" />
            <span>Professional Trek Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Namaste, I&apos;m Samrat Adhikari
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Your guide to the majestic Manaslu Circuit and beyond
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#my-story">
                My Story <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-black/30"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* My Story Section */}
      <section id="my-story" className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/WhatsApp Image 2025-02-28 at 11.57.58.jpeg"
                  alt="Samrat Adhikari - Manaslu Trek Guide"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-2xl z-0" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl z-0" />
            </div>

            <div>
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <HeartIcon className="h-4 w-4 mr-1.5" />
                <span>My Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From Himalayan Roots to Expert Guide
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Born and raised in the beautiful Himalayan region of Nepal, I
                  developed a deep connection with the mountains from an early
                  age. The majestic peaks, serene valleys, and rich cultural
                  tapestry of my homeland have shaped my identity and passion.
                </p>
                <p>
                  My journey as a trekking guide began over 10 years ago when I
                  decided to transform my love for the mountains into a
                  profession. Starting with local treks, I gradually expanded my
                  expertise to the challenging and breathtaking Manaslu Circuit,
                  which has become my specialization.
                </p>
                <p>
                  Throughout my career, I've dedicated myself to continuous
                  learning - studying the region's ecology, history, and
                  cultural heritage while perfecting my skills in navigation,
                  safety protocols, and emergency response. I'm certified by the
                  Nepal Academy of Tourism and Hotel Management (NATHM) and hold
                  advanced wilderness first aid certification.
                </p>
                <p className="font-medium text-foreground">
                  Today, I take pride in being one of the most knowledgeable
                  guides for the Manaslu Circuit, having successfully led over
                  120 treks and created lasting memories with trekkers from
                  around the world.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">10+ Years</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Professional Experience
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <UsersIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">120+</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Guided Treks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg"
            alt="Manaslu Mountains"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <QuoteIcon className="h-16 w-16 mx-auto text-primary/80 mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium italic mb-8">
              &quot;The Himalayas aren't just mountains; they're living entities
              that teach us humility, perseverance, and the true meaning of
              beauty. My greatest joy is sharing these lessons with trekkers and
              watching them transform through their journey.&quot;
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="h-px w-12 bg-primary/50 mr-4" />
              <p className="text-lg font-medium">Samrat Adhikari</p>
              <div className="h-px w-12 bg-primary/50 ml-4" />
            </div>
          </div>
        </div>
      </section>

      {/* My Expertise Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CompassIcon className="h-4 w-4 mr-1.5" />
              <span>My Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What I Bring to Your Trek
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              More than just guiding you along the trail, I'm committed to
              creating a safe, educational, and transformative experience in the
              Himalayas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm group hover:border-primary/20 transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <MapPinIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Local Knowledge</h3>
              <p className="text-gray-700 dark:text-gray-300">
                With deep roots in Nepal, I offer insights into hidden gems,
                local customs, and authentic experiences that most tourists
                miss. My connections with local communities ensure you
                experience the true heart of the Manaslu region.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm group hover:border-primary/20 transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <GlobeIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Cultural Immersion</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Fluent in multiple languages including English, Nepali, and
                local dialects, I help bridge cultural gaps and facilitate
                meaningful interactions. Through stories, traditions, and local
                connections, I help you connect with the soul of the Himalayas.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm group hover:border-primary/20 transition-colors duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <CheckCircleIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Safety & Support</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Certified in wilderness first aid and experienced in
                high-altitude trekking, I prioritize your safety above all. From
                proper acclimatization to weather assessment, I ensure your
                journey is as safe as it is memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CameraIcon className="h-4 w-4 mr-1.5" />
              <span>Trek Moments</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Glimpses from the <span className="text-primary">Trail</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Each photograph tells a story of adventure, connection, and the
              breathtaking beauty of the Manaslu region.
            </p>
          </div>

          {featuredGalleries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGalleries.map((gallery) => (
                <TrekHighlightCard key={gallery._id} highlight={gallery} />
              ))}
            </div>
          ) : (
            // Fallback content if no galleries are available from Sanity
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <Image
                  src="/images/WhatsApp Image 2025-02-28 at 11.57.59 (1).jpeg"
                  alt="Manaslu Trek Landscape"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">
                    Sunrise at Larkya La Pass (5,160m)
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <Image
                  src="/images/WhatsApp Image 2025-02-28 at 11.57.59 (2).jpeg"
                  alt="Local Village Life"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">
                    Traditional Tibetan village of Samagaon
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <Image
                  src="/images/WhatsApp Image 2025-02-28 at 11.57.57 (1).jpeg"
                  alt="Trekking Group"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">
                    Guiding trekkers through rhododendron forests
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/media">
                View Full Gallery <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <StarIcon className="h-4 w-4 mr-1.5" />
              <span>Trekker Experiences</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What My Clients Say
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              The relationships formed on the trail often last a lifetime. Here
              are some words from fellow trekkers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm relative">
              <QuoteIcon className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/images/WhatsApp Image 2025-02-28 at 11.57.58 (1).jpeg"
                    alt="Emily Thompson"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Emily Thompson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    United Kingdom, November 2023
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                &quot;Samrat was exceptional from start to finish. His knowledge
                of the Manaslu region is impressive, but what truly sets him
                apart is his genuine care for both the trekkers and the
                environment. He adapted the pace perfectly for our group and
                shared fascinating insights about local culture that made the
                trek so much more meaningful.&quot;
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="h-5 w-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm relative">
              <QuoteIcon className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/images/WhatsApp Image 2025-02-28 at 11.57.58 (1).jpeg"
                    alt="David Müller"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">David Müller</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Germany, May 2023
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                &quot;As an experienced trekker, I've had many guides, but
                Samrat stands out for his professionalism and attention to
                detail. His safety protocols were impeccable, especially during
                our crossing of Larkya La Pass. Beyond technical skills, his
                warm personality and cultural insights transformed a challenging
                trek into an unforgettable journey of discovery.&quot;
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="h-5 w-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/testimonials">
                Read More Testimonials{" "}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-blue-500/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <MountainIcon className="h-16 w-16 mx-auto text-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore the Manaslu Circuit?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s create an unforgettable journey together. Whether
              you&apos;re planning your first trek or returning to the
              Himalayas, I&apos;m here to make your adventure safe, meaningful,
              and extraordinary.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">
                  Contact Me <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <Link href="/itinerary">View Trek Itinerary</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
