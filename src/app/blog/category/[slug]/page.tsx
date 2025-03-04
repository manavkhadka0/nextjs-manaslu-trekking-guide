import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPageClient from "@/components/blog/blog-page-client";
import {
  getPostsByCategory,
  getAllCategories,
  getAllTags,
} from "@/lib/api/blog";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const categories = await getAllCategories();
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Manaslu Trekking Guide",
    };
  }

  return {
    title: `${category.name} | Manaslu Trekking Guide Blog`,
    description:
      category.description ||
      `Explore our articles about ${category.name} in the Manaslu region.`,
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const slug = (await params).slug;
  const searchParamsObj = await searchParams;
  const page = searchParamsObj.page ? parseInt(searchParamsObj.page) : 1;
  const limit = 9;

  // Get all categories to find the current one
  const categories = await getAllCategories();
  const currentCategory = categories.find((cat) => cat.slug === slug);

  if (!currentCategory) {
    notFound();
  }

  // Get posts for this category
  const { posts, total } = await getPostsByCategory(slug, {
    limit,
    offset: (page - 1) * limit,
    search: searchParamsObj.search,
  });

  // Get all tags for filters
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
        category: slug,
      }}
    />
  );
}
