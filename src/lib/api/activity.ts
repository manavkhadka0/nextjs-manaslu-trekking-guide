import { client } from "@/sanity/client";
import { groq } from "next-sanity";

// Types
export interface ActivityItem {
  _id: string;
  activity_title: string;
  slug: string;
  coverImg: {
    url: string;
    alt?: string;
  };
  location: string;
  duration: string;
  price: number;
  priceSale?: number;
  ratings: number;
  trip_grade?: string;
  max_group_size?: string;
  best_time?: string;
  featured: boolean;
}

export interface ActivityDetail extends ActivityItem {
  difficulty_level?: string;
  max_altitude?: string;
  trip_start?: string;
  trips_end?: string;
  group_style?: string;
  best_season?: string;
  activity_type?: string;
  availableStart?: string;
  availableEnd?: string;
  tour_description?: any;
  tour_highlights?: any;
  additional_info?: any;
  tour_includes?: string[];
  tour_excludes?: string[];
  trek_map?: {
    url: string;
    alt?: string;
  };
  itinerary?: Array<{
    _key: string;
    day: number;
    title: string;
    trek_distance?: string;
    trek_duration?: string;
    highest_altitude?: string;
    accomodation?: string;
    meals?: string;
    description?: any;
  }>;
  gallery?: Array<{
    _key: string;
    url: string;
    alt?: string;
  }>;
  faqs?: Array<{
    _id: string;
    question: string;
    answer: any;
  }>;
  testimonials?: Array<{
    _id: string;
    name: string;
    quote: string;
    rating: number;
    designation?: string;
    location?: string;
  }>;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

// Queries
const activityFields = `
  _id,
  activity_title,
  "slug": slug.current,
  "coverImg": {
    "url": coverImg.asset->url,
    "alt": coverImg.alt
  },
  location,
  duration,
  price,
  priceSale,
  ratings,
  trip_grade,
  max_group_size,
  best_time,
  featured
`;

const activityDetailFields = `
  ${activityFields},
  difficulty_level,
  max_altitude,
  trip_start,
  trips_end,
  group_style,
  best_season,
  activity_type,
  availableStart,
  availableEnd,
  tour_description,
  tour_highlights,
  additional_info,
  tour_includes,
  tour_excludes,
  "trek_map": {
    "url": trek_map.asset->url,
    "alt": trek_map.alt
  },
  itinerary[] {
    _key,
    day,
    title,
    trek_distance,
    trek_duration,
    highest_altitude,
    accomodation,
    meals,
    description
  },
  "gallery": gallery[] {
    _key,
    "url": asset->url,
    "alt": alt
  },
  "faqs": faqs[]-> {
    _id,
    question,
    answer
  },
  "testimonials": testimonials[]-> {
    _id,
    name,
    quote,
    rating,
    designation,
    location
  },
  meta_title,
  meta_description,
  meta_keywords
`;

// Get all activities
export async function getAllActivities() {
  const activities = await client.fetch(
    groq`*[_type == "activity"] | order(featured desc, _createdAt desc) {
      ${activityFields}
    }`
  );
  return activities as ActivityItem[];
}

// Get featured activities
export async function getFeaturedActivities(limit = 3) {
  const activities = await client.fetch(
    groq`*[_type == "activity" && featured == true] | order(_createdAt desc)[0...${limit}] {
      ${activityFields}
    }`
  );
  return activities as ActivityItem[];
}

// Get activity by slug
export async function getActivityBySlug(slug: string) {
  const activity = await client.fetch(
    groq`*[_type == "activity" && slug.current == $slug][0] {
      ${activityDetailFields}
    }`,
    { slug }
  );
  return activity as ActivityDetail;
}

// Get activities by type
export async function getActivitiesByType(type: string, limit = 6) {
  const activities = await client.fetch(
    groq`*[_type == "activity" && activity_type == $type] | order(featured desc, _createdAt desc)[0...${limit}] {
      ${activityFields}
    }`,
    { type }
  );
  return activities as ActivityItem[];
}

// Get activities by location
export async function getActivitiesByLocation(location: string, limit = 6) {
  const activities = await client.fetch(
    groq`*[_type == "activity" && location == $location] | order(featured desc, _createdAt desc)[0...${limit}] {
      ${activityFields}
    }`,
    { location }
  );
  return activities as ActivityItem[];
}
