import { client } from "@/sanity/client";
import LatestBlog from "@/components/sections/blog/latest-blog";
import { getLatestPosts } from "@/lib/api/blog";
import Hero03 from "@/components/hero-03/hero-03";
import Testimonial06 from "@/components/testimonial-06/testimonial-06";
import FAQ07 from "@/components/faq-07/faq-07";

const TESTIMONIALS_QUERY = `*[_type == "testimonial"]{quote, name, designation, "src": src.asset->url}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await getLatestPosts();
  const testimonials = await client.fetch(TESTIMONIALS_QUERY, {}, options);

  return (
    <>
      <Hero03 />
      <LatestBlog posts={posts} />
      <Testimonial06 />
      <FAQ07 />
    </>
  );
}
