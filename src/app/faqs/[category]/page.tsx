import { Metadata } from "next";
import FAQ07 from "@/components/faq-07/faq-07";
import { getFAQs, getFAQsByCategory } from "@/lib/api/faq";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Define valid categories and their descriptions
const CATEGORIES = {
  General: {
    title: "General FAQs",
    description: "Common questions about our trekking services",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.59.jpeg",
  },
  Trekking: {
    title: "Trekking FAQs",
    description: "Information about the trekking routes and difficulty levels",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.59 (1).jpeg",
  },
  Accommodation: {
    title: "Accommodation FAQs",
    description: "Details about where you'll stay during your trek",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.58.jpeg",
  },
  Travel: {
    title: "Travel FAQs",
    description: "How to get to and around Nepal and the trekking regions",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.57 (1).jpeg",
  },
  Permits: {
    title: "Permits FAQs",
    description: "Required permits and documentation for trekking",
    image: "/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg",
  },
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const slug = await params;
  const category = decodeURIComponent(slug.category);

  // Check if category is valid
  if (!Object.keys(CATEGORIES).includes(category)) {
    return {
      title: "Category Not Found | Manaslu Trekking Guide",
      description: "The requested FAQ category could not be found.",
    };
  }

  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];

  return {
    title: `${categoryInfo.title} | Manaslu Trekking Guide`,
    description: categoryInfo.description,
    openGraph: {
      title: `${categoryInfo.title} | Manaslu Trekking Guide`,
      description: categoryInfo.description,
      images: [categoryInfo.image],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = await params;
  const category = decodeURIComponent(slug.category);

  // Validate category
  if (!Object.keys(CATEGORIES).includes(category)) {
    notFound();
  }

  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];
  const faqs = await getFAQsByCategory(category);

  // If no FAQs found for this category, show all FAQs
  if (faqs.length === 0) {
    const allFaqs = await getFAQs();
    return (
      <div className="pt-24">
        <div className="container mx-auto px-6 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold">No FAQs found for {category}</h1>
            <p className="mt-2 text-muted-foreground mb-6">
              Showing all FAQs instead
            </p>
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to all FAQs
            </Link>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="container mx-auto px-6">
              <div className="space-y-4 max-w-3xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-accent animate-pulse rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          }
        >
          <FAQ07 faqs={allFaqs} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-6 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeftIcon className="h-3 w-3" />
              All FAQs
            </Link>
          </div>

          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {categoryInfo.title}
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              {categoryInfo.description}
            </p>
            <p className="mt-4 text-sm">
              <span className="font-medium">{faqs.length}</span> questions in
              this category
            </p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="container mx-auto px-6">
            <div className="space-y-4 max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-accent animate-pulse rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        }
      >
        <FAQ07 faqs={faqs} />
      </Suspense>
    </div>
  );
}
