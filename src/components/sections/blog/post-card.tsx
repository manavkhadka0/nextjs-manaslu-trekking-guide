import { PostList } from "@/lib/api/blog";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: { post: PostList }) {
  return (
    <div className="h-full overflow-hidden bg-white rounded shadow">
      <div className="p-5 h-full flex flex-col">
        <div className="relative">
          <Link
            href={`/blog/${post.slug}`}
            className="block aspect-w-4 aspect-h-3"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="object-cover w-full h-full"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            />
          </Link>
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <h3 className="mt-5 text-2xl font-semibold">
          <Link
            href={`/blog/${post.slug}`}
            className="text-black hover:text-blue-600"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 text-base text-gray-600 flex-grow">
          {post.metaDescription}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600"
        >
          Continue Reading
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
