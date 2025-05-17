import { client } from "@/sanity/client";

// Types
export interface PostList {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  author: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  tags: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  mainImage: {
    url: string;
    alt?: string;
    caption?: string;
  };
  readingTime?: number;
  featured?: boolean;
}

export interface PostDetail extends PostList {
  body: any;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: {
    url: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

// Query parameters
export interface PostQueryParams {
  limit?: number;
  offset?: number;
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
}

// Cache options
const options = { next: { revalidate: 30 } };

// Queries
const POST_LIST_PROJECTION = `{
  _id,
  title,
  subtitle,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "category": {
    "_id": category->_id,
    "name": category->name,
    "slug": category->slug.current
  },
  "author": {
    "_id": author->_id,
    "name": author->name,
    "slug": author->slug.current,
    "image": author->image.asset->url
  },
  "tags": tags[]-> {
    _id,
    name,
    "slug": slug.current
  },
  "mainImage": {
    "url": mainImage.asset->url,
    "alt": mainImage.alt,
    "caption": mainImage.caption
  },
  readingTime,
  featured
}`;

const POST_DETAIL_PROJECTION = `{
  _id,
  title,
  subtitle,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  "category": {
    "_id": category->_id,
    "name": category->name,
    "slug": category->slug.current
  },
  "author": {
    "_id": author->_id,
    "name": author->name,
    "slug": author->slug.current,
    "image": author->image.asset->url
  },
  "tags": tags[]-> {
    _id,
    name,
    "slug": slug.current
  },
  "mainImage": {
    "url": mainImage.asset->url,
    "alt": mainImage.alt,
    "caption": mainImage.caption
  },
  readingTime,
  featured,
  metaTitle,
  metaDescription,
  metaKeywords,
  "ogImage": {
    "url": ogImage.asset->url
  }
}`;

// API Functions
export const getLatestPosts = async (limit = 4): Promise<PostList[]> => {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...${limit}] ${POST_LIST_PROJECTION}`;
  const posts = await client.fetch(query, {}, options);
  return posts;
};

export const getFeaturedPosts = async (limit = 4): Promise<PostList[]> => {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc)[0...${limit}] ${POST_LIST_PROJECTION}`;
  const posts = await client.fetch(query, {}, options);
  return posts;
};

export const getAllPosts = async (
  params: PostQueryParams = {}
): Promise<{ posts: PostList[]; total: number }> => {
  const { limit = 10, offset = 0, category, tag, search, featured } = params;

  // Build filters
  const filters = ['_type == "post"'];

  if (category) {
    filters.push(`category->slug.current == "${category}"`);
  }

  if (tag) {
    filters.push(`"${tag}" in tags[]->slug.current`);
  }

  if (search) {
    filters.push(`(title match "*${search}*" || excerpt match "*${search}*")`);
  }

  if (featured !== undefined) {
    filters.push(`featured == ${featured}`);
  }

  const filterString = filters.join(" && ");

  // Count total matching posts
  const countQuery = `count(*[${filterString}])`;
  const total = await client.fetch(countQuery, {}, options);

  // Get paginated posts
  const postsQuery = `*[${filterString}] | order(publishedAt desc) [${offset}...${
    offset + limit
  }] ${POST_LIST_PROJECTION}`;
  const posts = await client.fetch(postsQuery, {}, options);

  return { posts, total };
};

export const getPostBySlug = async (
  slug: string
): Promise<PostDetail | null> => {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] ${POST_DETAIL_PROJECTION}`;
  const post = await client.fetch(query, {}, options);
  return post;
};

export const getRelatedPosts = async (
  postId: string,
  categoryId: string,
  limit = 3
): Promise<PostList[]> => {
  const query = `*[_type == "post" && _id != "${postId}" && category->_id == "${categoryId}"] | order(publishedAt desc)[0...${limit}] ${POST_LIST_PROJECTION}`;
  const posts = await client.fetch(query, {}, options);
  return posts;
};

export const getPostsByCategory = async (
  categorySlug: string,
  params: PostQueryParams = {}
): Promise<{ posts: PostList[]; total: number }> => {
  const { limit = 10, offset = 0 } = params;

  // Count total posts in category
  const countQuery = `count(*[_type == "post" && category->slug.current == "${categorySlug}"])`;
  const total = await client.fetch(countQuery, {}, options);

  // Get paginated posts
  const postsQuery = `*[_type == "post" && category->slug.current == "${categorySlug}"] | order(publishedAt desc) [${offset}...${
    offset + limit
  }] ${POST_LIST_PROJECTION}`;
  const posts = await client.fetch(postsQuery, {}, options);

  return { posts, total };
};

export const getPostsByTag = async (
  tagSlug: string,
  params: PostQueryParams = {}
): Promise<{ posts: PostList[]; total: number }> => {
  const { limit = 10, offset = 0 } = params;

  // Count total posts with tag
  const countQuery = `count(*[_type == "post" && "${tagSlug}" in tags[]->slug.current])`;
  const total = await client.fetch(countQuery, {}, options);

  // Get paginated posts
  const postsQuery = `*[_type == "post" && "${tagSlug}" in tags[]->slug.current] | order(publishedAt desc) [${offset}...${
    offset + limit
  }] ${POST_LIST_PROJECTION}`;
  const posts = await client.fetch(postsQuery, {}, options);

  return { posts, total };
};

export const getAllCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description
  }`;
  const categories = await client.fetch(query, {}, options);
  return categories;
};
