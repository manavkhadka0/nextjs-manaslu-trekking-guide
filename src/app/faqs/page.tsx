import { Metadata } from "next";
import FAQ07 from "@/components/faq-07/faq-07";
import { getFAQs, searchFAQs } from "@/lib/api/faq";
import FAQSearch from "@/components/faq-07/faq-search";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Manaslu Trekking Guide",
  description:
    "Find answers to common questions about trekking in the Manaslu region of Nepal.",
  openGraph: {
    title: "Frequently Asked Questions | Manaslu Trekking Guide",
    description:
      "Find answers to common questions about trekking in the Manaslu region of Nepal.",
    images: ["/images/WhatsApp Image 2025-02-28 at 11.57.57.jpeg"],
  },
};

export default async function FAQsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParamsdata = await searchParams;
  const searchQuery = searchParamsdata?.q || "";

  // If there's a search query, use the search function, otherwise get all FAQs
  const faqs = searchQuery ? await searchFAQs(searchQuery) : await getFAQs();

  return (
    <div className="pt-24">
      <div className="container mx-auto px-6 mb-12">
        <Suspense
          fallback={
            <div className="h-12 w-full bg-accent animate-pulse rounded-md"></div>
          }
        >
          <FAQSearch initialQuery={searchQuery} />
        </Suspense>

        {searchQuery && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">
              {faqs.length > 0
                ? `Found ${faqs.length} result${
                    faqs.length === 1 ? "" : "s"
                  } for "${searchQuery}"`
                : `No results found for "${searchQuery}"`}
            </h2>
            {faqs.length === 0 && (
              <div className="mt-4 space-y-4">
                <p className="text-muted-foreground">
                  Try using different keywords or browse all FAQs below
                </p>
                <Link
                  href="/faqs"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Back to all FAQs
                </Link>
              </div>
            )}
          </div>
        )}
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
        {faqs.length > 0 ? (
          <FAQ07 faqs={faqs} />
        ) : (
          <div className="container mx-auto px-6 py-16 text-center">
            <p className="text-lg">
              No FAQs found. Please try a different search term.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
