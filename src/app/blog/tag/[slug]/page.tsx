import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPageClient from "@/components/blog/blog-page-client";
import { getPostsByTag, getAllCategories, getAllTags } from "@/lib/api/blog";

interface TagPageProps {
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
}: TagPageProps): Promise<Metadata> {
  const tags = await getAllTags();
  const slug = (await params).slug;
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    return {
      title: "Tag Not Found | Manaslu Trekking Guide",
    };
  }

  return {
    title: `${tag.name} | Manaslu Trekking Guide Blog`,
    description: `Explore our articles tagged with ${tag.name} in the Manaslu region.`,
  };
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const slug = (await params).slug;
  const searchParamsObj = await searchParams;
  const page = searchParamsObj.page ? parseInt(searchParamsObj.page) : 1;
  const limit = 9;

  // Get all tags to find the current one
  const tags = await getAllTags();
  const currentTag = tags.find((t) => t.slug === slug);

  if (!currentTag) {
    notFound();
  }

  // Get posts for this tag
  const { posts, total } = await getPostsByTag(slug, {
    limit,
    offset: (page - 1) * limit,
    search: searchParamsObj.search,
  });

  // Get all categories for filters
  const categories = await getAllCategories();

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
        tag: slug,
      }}
    />
  );
}
