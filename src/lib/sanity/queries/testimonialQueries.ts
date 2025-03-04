import { groq } from "next-sanity";
import { client } from "@/sanity/client";

// Type definitions for testimonials
export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  rating: number;
  designation?: string;
  location?: string;
  trekDate?: string;
  trekRoute?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  src?: {
    asset: {
      _ref: string;
    };
  };
  featured: boolean;
  testimonialType: "text" | "video";
  videoUrl?: string;
  videoThumbnail?: {
    asset: {
      _ref: string;
    };
  };
  verified: boolean;
  status: "published" | "review" | "rejected";
  submissionDate: string;
}

// Base testimonial fields projection
const testimonialFields = `
  _id,
  name,
  quote,
  rating,
  designation,
  location,
  trekDate,
  trekRoute,
  image,
  src,
  featured,
  testimonialType,
  videoUrl,
  videoThumbnail,
  verified,
  status,
  submissionDate
`;

// Query to get all testimonials
const allTestimonialsQuery = groq`
  *[_type == "testimonial" && status == "published"] | order(submissionDate desc) {
    ${testimonialFields}
  }
`;

// Query to get featured testimonials
const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && status == "published" && featured == true] | order(submissionDate desc) {
    ${testimonialFields}
  }
`;

// Query to get video testimonials
const videoTestimonialsQuery = groq`
  *[_type == "testimonial" && status == "published" && testimonialType == "video"] | order(submissionDate desc) {
    ${testimonialFields}
  }
`;

// Query to get testimonials by trek route
const testimonialsByRouteQuery = (route: string) => groq`
  *[_type == "testimonial" && status == "published" && trekRoute == "${route}"] | order(submissionDate desc) {
    ${testimonialFields}
  }
`;

// Function to fetch all published testimonials
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(allTestimonialsQuery);
}

// Function to fetch featured testimonials
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(featuredTestimonialsQuery);
}

// Function to fetch video testimonials
export async function getVideoTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(videoTestimonialsQuery);
}

// Function to fetch testimonials by trek route
export async function getTestimonialsByRoute(
  route: string
): Promise<Testimonial[]> {
  return await client.fetch(testimonialsByRouteQuery(route));
}
