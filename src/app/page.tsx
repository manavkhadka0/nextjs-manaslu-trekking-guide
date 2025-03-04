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

export const metadata: Metadata = {
  title: "Manaslu Circuit Trek - Expert Guides & Authentic Experience",
  description:
    "Experience the majestic Manaslu Circuit Trek with our expert local guides. Discover breathtaking landscapes, authentic cultural experiences, and personalized trekking packages.",
};

export default async function HomePage() {
  // Fetch data for the homepage components
  const posts = await getLatestPosts(4);
  const featuredFaqs = await getFeaturedFAQs(6);
  const featuredTestimonials = await getFeaturedTestimonials();

  return (
    <>
      <Hero03 />
      <LatestBlog posts={posts} />
      <Testimonial06 testimonials={featuredTestimonials} />
      <FAQ07 faqs={featuredFaqs} />
      <Stats02Page testimonials={featuredTestimonials} />
      <Contact
        email="info@manaslu-trekking.com"
        phone="+977 9841234567"
        address="Thamel, Kathmandu, Nepal"
      />
    </>
  );
}
