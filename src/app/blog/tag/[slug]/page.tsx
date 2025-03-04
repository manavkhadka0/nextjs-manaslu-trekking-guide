import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/api/blog";
import BlogList from "@/components/blog/blog-list";

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
  const slug = await params;
  const tag = tags.find((t) => t.slug === slug.slug);

  if (!tag) {
    return {
      title: "Tag Not Found | Manaslu Trekking Guide",
    };
  }

  return {
    title: `${tag.name} | Manaslu Trekking Guide Blog`,
    description:
      tag.description ||
      `Explore our articles tagged with ${tag.name} in the Manaslu region.`,
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
  const slug = await params;
  const searchParamsdata = await searchParams;
  const page = searchParamsdata.page ? parseInt(searchParamsdata.page) : 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  // Get all tags to find the current one
  const tags = await getAllTags();
  const currentTag = tags.find((t) => t.slug === slug.slug);

  // If tag doesn't exist, return 404
  if (!currentTag) {
    notFound();
  }

  // Get posts for this tag with pagination
  const { posts, total } = await getPostsByTag(slug.slug, {
    limit,
    offset,
    search: searchParamsdata.search,
  });

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  return (
    <BlogList
      posts={posts}
      tags={tags}
      currentTag={currentTag}
      currentPage={page}
      totalPages={totalPages}
      totalPosts={total}
      searchParams={{
        ...searchParamsdata,
        tag: slug.slug,
      }}
      showTagFilter={false}
      pageType="tag"
    />
  );
}
