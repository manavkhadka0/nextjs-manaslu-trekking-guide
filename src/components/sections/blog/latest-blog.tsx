import { PostList } from "@/lib/api/blog";
import Image from "next/image";
import Link from "next/link";
import PostCard from "./post-card";

interface LatestBlogProps {
  posts: PostList[];
}

export default function LatestBlog({ posts }: LatestBlogProps) {
  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-end justify-between">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Latest from our Blog
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">
              Discover expert trekking tips, latest trail updates, and inspiring
              stories from the Manaslu region.
            </p>
          </div>
        </div>

        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
