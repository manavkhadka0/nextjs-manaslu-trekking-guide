"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogList from "@/components/blog/blog-list";
import { PostList, Category } from "@/lib/api/blog";
import {
  Search as SearchIcon,
  X as XIcon,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

interface BlogPageClientProps {
  initialPosts: PostList[];
  categories: Category[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  initialSearchParams: {
    page?: string;
    search?: string;
    category?: string;
    tag?: string;
  };
}

export default function BlogPageClient({
  initialPosts,
  categories,
  currentPage,
  totalPages,
  totalPosts,
  initialSearchParams,
}: BlogPageClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    initialSearchParams.search || ""
  );
  const [isSearching, setIsSearching] = useState(false);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Build the new URL with search parameters
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    // Keep other params except page (reset to 1 when searching)
    if (initialSearchParams.category) {
      params.set("category", initialSearchParams.category);
    }

    if (initialSearchParams.tag) {
      params.set("tag", initialSearchParams.tag);
    }

    // Navigate to the new URL
    router.push(`/blog?${params.toString()}`);

    // Reset searching state after navigation
    setTimeout(() => setIsSearching(false), 300);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image
            src="/images/WhatsApp Image 2025-02-28 at 11.57.58.jpeg"
            alt="Manaslu Circuit Trek"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/20 backdrop-blur-sm">
            Trek Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Manaslu Circuit Trek Blog
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Discover expert tips, trail updates, and inspiring stories from the
            Himalayas. Your guide to an unforgettable Manaslu adventure.
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="max-w-md mx-auto flex items-center gap-2 mb-8"
          >
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-primary"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit" disabled={isSearching} className="shrink-0">
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-black hover:bg-white/10 hover:text-white"
            >
              <Link href="#latest" className="group">
                Explore Articles{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-black hover:bg-white/10 hover:text-white"
            >
              <Link href="#categories" className="group">
                Browse Categories{" "}
                <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog content section */}
      <section id="latest" className="py-12">
        <div className="container mx-auto px-4">
          <BlogList
            posts={initialPosts}
            categories={categories}
            currentPage={currentPage}
            totalPages={totalPages}
            totalPosts={totalPosts}
            searchParams={initialSearchParams}
          />
        </div>
      </section>
    </main>
  );
}
