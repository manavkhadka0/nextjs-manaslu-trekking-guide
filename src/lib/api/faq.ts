import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";

const FAQ_FIELDS = `
  _id,
  question,
  answer,
  category,
  order,
  featured,
  "seoKeywords": seo.keywords,
  "relatedFaqs": seo.relatedFaqs[]->{ _id, question, category }
`;

const FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  ${FAQ_FIELDS}
}`;

export interface RelatedFAQ {
  _id: string;
  question: string;
  category?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: PortableTextBlock[]; // This will handle the Portable Text blocks from Sanity
  category?: string;
  order?: number;
  featured?: boolean;
  seoKeywords?: string[];
  relatedFaqs?: RelatedFAQ[];
}

const options = { next: { revalidate: 30 } };

export const getFAQs = async (): Promise<FAQ[]> => {
  const faqs: FAQ[] = await client.fetch(FAQS_QUERY, {}, options);
  return faqs;
};

// Get FAQs by category
export const getFAQsByCategory = async (category: string): Promise<FAQ[]> => {
  const query = `*[_type == "faq" && category == $category] | order(order asc) {
    ${FAQ_FIELDS}
  }`;

  const faqs: FAQ[] = await client.fetch(query, { category }, options);
  return faqs;
};

// Get featured FAQs
export const getFeaturedFAQs = async (limit = 5): Promise<FAQ[]> => {
  const query = `*[_type == "faq" && featured == true] | order(order asc)[0...${limit}] {
    ${FAQ_FIELDS}
  }`;

  const faqs: FAQ[] = await client.fetch(query, {}, options);
  return faqs;
};

// Get FAQ by ID
export const getFAQById = async (id: string): Promise<FAQ | null> => {
  const query = `*[_type == "faq" && _id == $id][0] {
    ${FAQ_FIELDS}
  }`;

  const faq: FAQ | null = await client.fetch(query, { id }, options);
  return faq;
};

// Search FAQs
export const searchFAQs = async (searchTerm: string): Promise<FAQ[]> => {
  const query = `*[_type == "faq" && (
    question match $searchTerm || 
    pt::text(answer) match $searchTerm ||
    category match $searchTerm ||
    $searchTerm in seo.keywords
  )] | order(order asc) {
    ${FAQ_FIELDS}
  }`;

  const faqs: FAQ[] = await client.fetch(
    query,
    { searchTerm: `*${searchTerm}*` },
    options
  );
  return faqs;
};
