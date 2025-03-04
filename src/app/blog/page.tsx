import { Metadata } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/api/blog";
import BlogList from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Blog | Manaslu Trekking Guide",
  description:
    "Discover expert trekking tips, latest trail updates, and inspiring stories from the Manaslu region.",
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Convert searchParams to a regular object to avoid the dynamic API issue
  const searchParamsdata = await searchParams;

  const searchParamsObj = Object.fromEntries(
    Object.entries(searchParamsdata || {})
  );

  const page = searchParamsObj.page ? parseInt(searchParamsObj.page) : 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  // Get posts with pagination and filters
  const { posts, total } = await getAllPosts({
    limit,
    offset,
    search: searchParamsObj.search,
  });

  // Get all categories and tags for filters
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  return (
    <BlogList
      posts={posts}
      categories={categories}
      tags={tags}
      currentPage={page}
      totalPages={totalPages}
      totalPosts={total}
      searchParams={searchParamsObj}
      pageType="main"
    />
  );
}
