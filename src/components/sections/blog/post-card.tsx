"use client";

import { PostList } from "@/lib/api/blog";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: PostList;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export default function PostCard({
  post,
  variant = "default",
  className,
}: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), {
    addSuffix: true,
  });

  // Featured post layout
  if (variant === "featured") {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl",
          className
        )}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-primary/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {post.category.name}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/80">
                <CalendarIcon className="h-3 w-3" />
                {formattedDate}
              </span>
            </div>

            <h3 className="mb-2 text-xl font-bold leading-tight transition-colors md:text-2xl">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h3>

            {post.subtitle && (
              <p className="mb-4 text-sm text-white/80 line-clamp-2">
                {post.subtitle}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-white/20"
                  />
                )}
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>

              {post.readingTime && (
                <span className="flex items-center gap-1 text-xs text-white/80">
                  <ClockIcon className="h-3 w-3" />
                  {post.readingTime} min read
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact post layout
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "group flex gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50",
          className
        )}
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="font-medium line-clamp-2 group-hover:text-primary">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
            <span>{formattedDate}</span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {post.readingTime} min
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default post layout
  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.mainImage.url}
          alt={post.mainImage.alt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        />

        <div className="absolute top-4 left-4">
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
          >
            {post.category.name}
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {formattedDate}
          </span>

          {post.readingTime && (
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          )}
        </div>

        <h3 className="mb-3 text-xl font-semibold group-hover:text-primary">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="mb-4 text-gray-600 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {post.author.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary"
          >
            Read more
            <svg
              className="ml-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
