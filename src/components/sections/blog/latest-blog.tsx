"use client";

import { PostList } from "@/lib/api/blog";
import Link from "next/link";
import PostCard from "./post-card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LatestBlogProps {
  posts: PostList[];
  className?: string;
}

export default function LatestBlog({ posts, className }: LatestBlogProps) {
  // Ensure we have at least one post for the featured slot
  if (!posts || posts.length === 0) {
    return null;
  }

  // Use the first post as featured and the rest as regular posts
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 4);

  return (
    <section className={cn("py-16 md:py-24 bg-gray-50", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ArrowRightIcon className="h-4 w-4 mr-1.5" />
            <span>Latest Updates</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Latest from our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover expert trekking tips, latest trail updates, and inspiring
            stories from the Manaslu region.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Featured post */}
          <div className="mb-8">
            <PostCard post={featuredPost} variant="featured" />
          </div>

          {/* Regular posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {/* View all button */}
          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/blog">
                View All Articles <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
