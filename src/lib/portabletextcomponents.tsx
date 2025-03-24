import { SanityImage } from "@/components/blog/sanity-image";
import { PortableTextReactComponents } from "next-sanity";
import Link from "next/link";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    // Heading 1
    h1: ({ children }) => {
      // Create an ID from the heading text for the table of contents
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h1
          id={id}
          className="scroll-mt-24 mb-6 mt-10 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
        >
          {children}
        </h1>
      );
    },
    // Heading 2
    h2: ({ children }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h2
          id={id}
          className="scroll-mt-24 mb-5 mt-8 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
        >
          {children}
        </h2>
      );
    },
    // Heading 3
    h3: ({ children }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h3
          id={id}
          className="scroll-mt-24 mb-4 mt-6 text-xl font-bold tracking-tight text-gray-900 md:text-2xl"
        >
          {children}
        </h3>
      );
    },
    // Heading 4
    h4: ({ children }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      return (
        <h4
          id={id}
          className="scroll-mt-24 mb-3 mt-5 text-lg font-bold tracking-tight text-gray-900 md:text-xl"
        >
          {children}
        </h4>
      );
    },
    // Normal paragraph
    normal: ({ children }) => {
      return <p className="mb-6 leading-relaxed text-gray-700">{children}</p>;
    },
    // Blockquote
    blockquote: ({ children }) => {
      return (
        <blockquote className="my-6 border-l-4 border-primary/70 bg-primary/5 p-4 italic text-gray-700">
          {children}
        </blockquote>
      );
    },
  },
  // Lists
  list: {
    // Bullet list
    bullet: ({ children }) => {
      return <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>;
    },
    // Numbered list
    number: ({ children }) => {
      return <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>;
    },
  },
  // List items
  listItem: {
    // Bullet list item
    bullet: ({ children }) => {
      return <li className="text-gray-700">{children}</li>;
    },
    // Numbered list item
    number: ({ children }) => {
      return <li className="text-gray-700">{children}</li>;
    },
  },
  // Marks (inline formatting)
  marks: {
    // Bold text
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    // Italic text
    em: ({ children }) => <em className="italic">{children}</em>,
    // Links
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
        >
          {children}
        </Link>
      );
    },
  },
  // Custom types
  types: {
    // Images - Using dedicated SanityImage component
    image: ({ value, isInline }) => {
      return <SanityImage value={value} isInline={isInline} />;
    },
    // Code blocks
    code: ({ value }) => {
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">
          <code>{value?.code}</code>
        </pre>
      );
    },
  },
};
