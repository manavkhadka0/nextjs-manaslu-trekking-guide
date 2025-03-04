import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/api/blog";
import BlogList from "@/components/blog/blog-list";

type Params = Promise<{ slug: string }>;

interface CategoryPageProps {
  params: Params;
  searchParams: Promise<{
    page?: string;
    search?: string;
    [key: string]: string | string[] | undefined;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const categories = await getAllCategories();
  const slug = await params;
  const category = categories.find((c) => c.slug === slug.slug);

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
  const slug = await params;
  const searchParamsdata = await searchParams;
  const page = searchParamsdata?.page ? parseInt(searchParamsdata.page) : 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  // Get all categories to find the current one
  const categories = await getAllCategories();
  const currentCategory = categories.find((c) => c.slug === slug.slug);

  // If category doesn't exist, return 404
  if (!currentCategory) {
    notFound();
  }

  // Get posts for this category with pagination
  const { posts, total } = await getPostsByCategory(slug.slug, {
    limit,
    offset,
    search: searchParamsdata.search,
  });

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  return (
    <BlogList
      posts={posts}
      categories={categories}
      currentCategory={currentCategory}
      currentPage={page}
      totalPages={totalPages}
      totalPosts={total}
      searchParams={{
        ...searchParamsdata,
        category: slug.slug,
      }}
      showCategoryFilter={false}
      pageType="category"
    />
  );
}
