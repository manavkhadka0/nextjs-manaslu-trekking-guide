"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PostList, Category, Tag } from "@/lib/api/blog";
import PostCard from "@/components/sections/blog/post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Search as SearchIcon,
  X as XIcon,
  BookOpenIcon,
  TagIcon,
  FolderIcon,
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

          {/* Mobile filters button */}
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Blog posts grid - Left Column */}
        <div className="md:w-2/3">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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

        {/* Sidebar - Right Column */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            {/* Categories */}
            {showCategoryFilter && categories.length > 0 && (
              <div id="categories" className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
                  <FolderIcon className="h-4 w-4 mr-2 text-primary" />
                  Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/blog/category/${category.slug}`}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm transition-colors flex items-center",
                        currentCategory?.slug === category.slug
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {showTagFilter && tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center border-b pb-2">
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
        </div>
      </div>
    </div>
  );
}
