import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ChevronLeftIcon,
  ShareIcon,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

import { getPostBySlug, getRelatedPosts } from "@/lib/api/blog";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorCard } from "@/components/blog/author-card";
import PostCard from "@/components/sections/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define portable text components inline since we don't need all the advanced features
const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => {
      // Create an ID from the heading text for the table of contents
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h1
          id={id}
          className="scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h2
          id={id}
          className="scroll-mt-24 text-2xl font-bold tracking-tight md:text-3xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h3
          id={id}
          className="scroll-mt-24 text-xl font-bold tracking-tight md:text-2xl"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h4
          id={id}
          className="scroll-mt-24 text-lg font-bold tracking-tight md:text-xl"
        >
          {children}
        </h4>
      );
    },
  },
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = await params;
  const post = await getPostBySlug(slug.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: post.ogImage
      ? {
          images: [{ url: post.ogImage.url, width: 1200, height: 630 }],
        }
      : undefined,
    keywords: post.metaKeywords,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = await params;
  const post = await getPostBySlug(slug.slug);

  if (!post) {
    notFound();
  }

  // Format dates
  const publishedDate = new Date(post.publishedAt);
  const formattedDate = format(publishedDate, "MMMM d, yyyy");
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

  // Get related posts from the same category
  const relatedPosts = await getRelatedPosts(post._id, post.category._id, 4);

  return (
    <main className="bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-40">
          {post.mainImage && (
            <Image
              src={post.mainImage.url}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90" />
        </div>

        <div className="container relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white"
              >
                {post.category.name}
              </Link>
              <span className="flex items-center gap-1 text-sm text-white/80">
                <CalendarIcon className="h-4 w-4" />
                {timeAgo}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1 text-sm text-white/80">
                  <ClockIcon className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                {post.subtitle}
              </p>
            )}

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-3">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/20"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-medium text-white">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">By {post.author.name}</p>
                  <p className="text-xs text-white/70">{formattedDate}</p>
                </div>
              </div>

              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <Link
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(
                      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blog/${
                        post.slug
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShareIcon className="h-4 w-4" />
                    <span className="sr-only">Share post</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Image */}
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={post.mainImage.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
              {post.mainImage.caption && (
                <div className="absolute bottom-0 w-full bg-black/60 p-2 text-center text-sm text-white">
                  {post.mainImage.caption}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="rounded-xl bg-white p-6 shadow-sm md:p-10">
              <article className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg prose-img:shadow-sm">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </article>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 border-t border-gray-100 pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <TagIcon className="h-4 w-4 text-gray-500" />
                    {post.tags.map((tag) => (
                      <Link key={tag._id} href={`/blog/tag/${tag.slug}`}>
                        <Badge variant="outline" className="hover:bg-gray-100">
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author Bio */}
            <div className="mt-8">
              <AuthorCard author={post.author} />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {relatedPosts.slice(0, 2).map((relatedPost) => (
                    <PostCard
                      key={relatedPost._id}
                      post={relatedPost}
                      variant="default"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">
                  Table of Contents
                </h3>
                <TableOfContents content={post.body} />
              </div>

              {/* Category */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Category</h3>
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  {post.category.name}
                </Link>
              </div>

              {/* Latest Posts */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Latest Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.slice(0, 3).map((relatedPost) => (
                    <PostCard
                      key={relatedPost._id}
                      post={relatedPost}
                      variant="compact"
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/blog">View All Posts</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
