"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PostList, Category, Tag } from "@/lib/api/blog";
import PostCard from "@/components/sections/blog/post-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Search as SearchIcon,
  X as XIcon,
  BookOpenIcon,
  TagIcon,
  FolderIcon,
  ChevronRightIcon,
  HomeIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: PostList[];
  categories?: Category[];
  tags?: Tag[];
  currentCategory?: Category;
  currentTag?: Tag;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    tag?: string;
  };
  showCategoryFilter?: boolean;
  showTagFilter?: boolean;
  pageType?: "main" | "category" | "tag";
}

export default function BlogList({
  posts,
  categories = [],
  tags = [],
  currentCategory,
  currentTag,
  currentPage,
  totalPages,
  totalPosts,
  searchParams,
  showCategoryFilter = true,
  showTagFilter = true,
  pageType = "main",
}: BlogListProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.search || "");
  const [isSearching, setIsSearching] = useState(false);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Build the new URL with search parameters
    const params = new URLSearchParams(urlSearchParams.toString());

    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    // Reset to page 1 when searching
    params.delete("page");

    // Determine the base URL based on page type
    let baseUrl = "/blog";
    if (pageType === "category" && currentCategory) {
      baseUrl = `/blog/category/${currentCategory.slug}`;
    } else if (pageType === "tag" && currentTag) {
      baseUrl = `/blog/tag/${currentTag.slug}`;
    }

    // Navigate to the new URL
    router.push(`${baseUrl}?${params.toString()}`);

    // Reset searching state after navigation
    setTimeout(() => setIsSearching(false), 300);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");

    const params = new URLSearchParams(urlSearchParams.toString());
    params.delete("search");
    params.delete("page");

    // Determine the base URL based on page type
    let baseUrl = "/blog";
    if (pageType === "category" && currentCategory) {
      baseUrl = `/blog/category/${currentCategory.slug}`;
    } else if (pageType === "tag" && currentTag) {
      baseUrl = `/blog/tag/${currentTag.slug}`;
    }

    router.push(`${baseUrl}?${params.toString()}`);
  };

  // Get page title and description based on page type
  const getPageTitle = () => {
    if (pageType === "category" && currentCategory) {
      return `Category: ${currentCategory.name}`;
    } else if (pageType === "tag" && currentTag) {
      return `Tag: ${currentTag.name}`;
    }
    return "Our Blog";
  };

  const getPageDescription = () => {
    if (pageType === "category" && currentCategory) {
      return (
        currentCategory.description ||
        `Explore our articles about ${currentCategory.name} in the Manaslu region.`
      );
    } else if (pageType === "tag" && currentTag) {
      return `Explore our articles tagged with ${currentTag.name} in the Manaslu region.`;
    }
    return "Discover expert trekking tips, latest trail updates, and inspiring stories from the Manaslu region.";
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image
            src="/images/WhatsApp Image 2025-02-28 at 11.57.59.jpeg"
            alt="Mountains"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center text-sm mb-6 text-gray-300">
            <Link
              href="/"
              className="flex items-center hover:text-white transition-colors"
            >
              <HomeIcon className="h-3.5 w-3.5 mr-1" />
              Home
            </Link>
            <ChevronRightIcon className="h-3.5 w-3.5 mx-1" />
            <Link
              href="/blog"
              className={cn(
                "hover:text-white transition-colors",
                pageType !== "main"
                  ? "flex items-center"
                  : "font-medium text-white"
              )}
            >
              Blog
            </Link>

            {pageType === "category" && currentCategory && (
              <>
                <ChevronRightIcon className="h-3.5 w-3.5 mx-1" />
                <span className="font-medium text-white flex items-center">
                  <FolderIcon className="h-3.5 w-3.5 mr-1" />
                  {currentCategory.name}
                </span>
              </>
            )}

            {pageType === "tag" && currentTag && (
              <>
                <ChevronRightIcon className="h-3.5 w-3.5 mx-1" />
                <span className="font-medium text-white flex items-center">
                  <TagIcon className="h-3.5 w-3.5 mr-1" />
                  {currentTag.name}
                </span>
              </>
            )}
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {getPageTitle()}
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            {getPageDescription()}
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="max-w-md mx-auto flex items-center gap-2"
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
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results summary and active filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  <BookOpenIcon className="mr-2 h-5 w-5 text-primary" />
                  {totalPosts} {totalPosts === 1 ? "Article" : "Articles"}
                  {searchParams.search && (
                    <span className="ml-2 text-lg font-normal">
                      for &quot;{searchParams.search}&quot;
                    </span>
                  )}
                </h2>
              </div>

              {/* Category and Tag dropdowns for mobile */}
              <div className="flex flex-wrap gap-2 md:hidden">
                {showCategoryFilter && categories.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <FolderIcon className="h-4 w-4" />
                        Categories
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {categories.map((category) => (
                        <DropdownMenuItem key={category._id} asChild>
                          <Link href={`/blog/category/${category.slug}`}>
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {showTagFilter && tags.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <TagIcon className="h-4 w-4" />
                        Tags
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {tags.map((tag) => (
                        <DropdownMenuItem key={tag._id} asChild>
                          <Link href={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {/* Active search filter */}
            {searchParams.search && (
              <div className="mt-4 flex items-center">
                <span className="text-sm text-gray-500 mr-2">Search:</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SearchIcon className="h-3 w-3" />
                  {searchParams.search}
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="ml-1"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>

          {/* Desktop category and tag navigation */}
          <div className="hidden md:flex mb-8 gap-8">
            {/* Categories */}
            {showCategoryFilter && categories.length > 0 && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3 flex items-center border-b pb-2">
                  <FolderIcon className="h-4 w-4 mr-2 text-primary" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/blog/category/${category.slug}`}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors",
                        currentCategory?.slug === category.slug
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {showTagFilter && tags.length > 0 && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3 flex items-center border-b pb-2">
                  <TagIcon className="h-4 w-4 mr-2 text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag._id}
                      href={`/blog/tag/${tag.slug}`}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors",
                        currentTag?.slug === tag.slug
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      )}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog posts grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search criteria
              </p>
              {searchParams.search && (
                <Button onClick={clearSearch} className="mr-2">
                  Clear search
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/blog">View all articles</Link>
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={
                pageType === "category" && currentCategory
                  ? `/blog/category/${currentCategory.slug}`
                  : pageType === "tag" && currentTag
                  ? `/blog/tag/${currentTag.slug}`
                  : "/blog"
              }
              searchParams={urlSearchParams}
            />
          )}
        </div>
      </section>
    </main>
  );
}
