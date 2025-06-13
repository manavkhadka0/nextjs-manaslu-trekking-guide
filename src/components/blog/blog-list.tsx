"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PostList, Category, Tag } from "@/lib/api/blog";
import PostCard from "@/components/sections/blog/post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Search as SearchIcon, X as XIcon, BookOpenIcon } from "lucide-react";

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
  currentCategory,
  currentTag,
  currentPage,
  totalPages,
  totalPosts,
  searchParams,
  pageType = "main",
}: BlogListProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  // Clear search
  const clearSearch = () => {
    // Determine the base URL based on page type
    let baseUrl = "/blog";
    if (pageType === "category" && currentCategory) {
      baseUrl = `/blog/category/${currentCategory.slug}`;
    } else if (pageType === "tag" && currentTag) {
      baseUrl = `/blog/tag/${currentTag.slug}`;
    }

    router.push(baseUrl);
  };

  return (
    <div className="w-full">
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
          \
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Blog posts grid - Left Column */}
        <div className="w-full">
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
      </div>
    </div>
  );
}
