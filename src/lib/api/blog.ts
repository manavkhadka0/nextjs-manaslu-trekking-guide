import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[
  _type == "post"
]|order(publishedAt desc)[0...4]{
  _id,
  title,
  "slug" : slug.current,
  metaDescription,
  publishedAt,
  "category": category->name,
  "tags": tags[]->name,
  "image": image.asset->url,
}`;

export interface PostList {
  _id: string;
  title: string;
  slug: string;
  metaDescription: string;
  publishedAt: string;
  category: string;
  tags: string[];
  image: string;
}

const options = { next: { revalidate: 30 } };

export const getLatestPosts = async (): Promise<PostList[]> => {
  const posts: PostList[] = await client.fetch(POSTS_QUERY, {}, options);
  return posts;
};
