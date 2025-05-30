import { client } from "@/sanity/client";

// Type definition for trek highlights
export interface TrekHighlight {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnail: {
    asset: {
      _ref: string;
    };
  };
  location?: string;
  trekRoute?: string;
  featured: boolean;
  order: number;
  tags?: Array<{
    _id: string;
    name: string;
  }>;
  publishedAt: string;
  // New fields for photo galleries
  isPhotoGallery?: boolean;
  photos?: Array<{
    _key: string;
    asset: {
      _ref: string;
    };
    caption?: string;
    location?: string;
  }>;
}

// Get all trek highlights
export async function getAllTrekHighlights(): Promise<TrekHighlight[]> {
  return client.fetch(
    `*[_type == "trekHighlight"] | order(order asc) {
      _id,
      title,
      description,
      videoUrl,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery,
      photos
    }`
  );
}

// Get featured trek highlights
export async function getFeaturedTrekHighlights(
  limit = 3
): Promise<TrekHighlight[]> {
  return client.fetch(
    `*[_type == "trekHighlight" && featured == true] | order(order asc)[0...${limit}] {
      _id,
      title,
      description,
      videoUrl,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery,
      photos
    }`
  );
}

// Get trek highlights by tag
export async function getTrekHighlightsByTag(
  tagId: string
): Promise<TrekHighlight[]> {
  return client.fetch(
    `*[_type == "trekHighlight" && references("${tagId}")] | order(order asc) {
      _id,
      title,
      description,
      videoUrl,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery,
      photos
    }`
  );
}

// Get a single trek highlight by ID
export async function getTrekHighlightById(id: string): Promise<TrekHighlight> {
  return client.fetch(
    `*[_type == "trekHighlight" && _id == "${id}"][0] {
      _id,
      title,
      description,
      videoUrl,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery,
      photos
    }`
  );
}

// Get all photo galleries
export async function getAllPhotoGalleries(
  limit?: number
): Promise<TrekHighlight[]> {
  const range = typeof limit === "number" ? `[0...${limit}]` : "";
  return client.fetch(
    `*[_type == "trekHighlight" && isPhotoGallery == true] | order(order asc) ${range} {
      _id,
      title,
      description,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery,
      photos
    }`
  );
}

// Get featured photo galleries
export async function getFeaturedPhotoGalleries(
  limit = 3
): Promise<TrekHighlight[]> {
  return client.fetch(
    `*[_type == "trekHighlight" && isPhotoGallery == true && featured == true] | order(order asc)[0...${limit}] {
      _id,
      title,
      description,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery,
      photos
    }`
  );
}

// Get all videos (non-photo galleries)
export async function getAllVideos(): Promise<TrekHighlight[]> {
  return client.fetch(
    `*[_type == "trekHighlight" && (isPhotoGallery != true || !defined(isPhotoGallery))] | order(order asc) {
      _id,
      title,
      description,
      videoUrl,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery
    }`
  );
}

// Get featured videos
export async function getFeaturedVideos(limit = 3): Promise<TrekHighlight[]> {
  return client.fetch(
    `*[_type == "trekHighlight" && (isPhotoGallery != true || !defined(isPhotoGallery)) && featured == true] | order(order asc)[0...${limit}] {
      _id,
      title,
      description,
      videoUrl,
      thumbnail,
      location,
      trekRoute,
      featured,
      order,
      "tags": tags[]->{ _id, name },
      publishedAt,
      isPhotoGallery
    }`
  );
}

// Helper function to extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Helper function to generate YouTube embed URL
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
