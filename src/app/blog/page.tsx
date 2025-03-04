import { Metadata } from "next";
import BlogPageClient from "@/components/blog/blog-page-client";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/api/blog";

export const metadata: Metadata = {
  title: "Blog | Samrat Adhikari - Manaslu Trek Guide",
  description:
    "Discover expert trekking tips, latest trail updates, and inspiring stories from the Himalayas.",
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
  // Get the current page from the URL
  const searchParamsObj = await searchParams;
  const page = searchParamsObj.page ? parseInt(searchParamsObj.page) : 1;
  const limit = 9;

  // Fetch posts, categories, and tags
  const { posts, total } = await getAllPosts({
    limit,
    offset: (page - 1) * limit,
    search: searchParamsObj.search,
    category: searchParamsObj.category,
    tag: searchParamsObj.tag,
  });
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Serialize the data to ensure it's safe to pass to client components
  const serializedPosts = JSON.parse(JSON.stringify(posts));
  const serializedCategories = JSON.parse(JSON.stringify(categories));
  const serializedTags = JSON.parse(JSON.stringify(tags));

  return (
    <BlogPageClient
      initialPosts={serializedPosts}
      categories={serializedCategories}
      tags={serializedTags}
      currentPage={page}
      totalPages={Math.ceil(total / limit)}
      totalPosts={total}
      initialSearchParams={{
        page: searchParamsObj.page,
        search: searchParamsObj.search,
        category: searchParamsObj.category,
        tag: searchParamsObj.tag,
      }}
    />
  );
}
