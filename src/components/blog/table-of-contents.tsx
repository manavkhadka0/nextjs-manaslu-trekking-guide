"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
  key: string;
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children: Array<{ text: string; [key: string]: any }>;
  [key: string]: any;
}

interface TableOfContentsProps {
  content: PortableTextBlock[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Generate a consistent ID from text
  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  // Extract headings from the content
  useEffect(() => {
    if (!content) return;

    // Find all heading blocks in the Portable Text content
    const extractedHeadings: Heading[] = [];
    const idCounts: Record<string, number> = {};

    content.forEach((block: PortableTextBlock, blockIndex: number) => {
      if (
        block._type === "block" &&
        block.style &&
        ["h1", "h2"].includes(block.style) // Only include h1 and h2 headings
      ) {
        // Create an ID from the heading text
        const text = block.children.map((child) => child.text).join("");
        const id = generateId(text);

        // Track and handle duplicate IDs
        idCounts[id] = (idCounts[id] || 0) + 1;

        // If this is a duplicate ID, append the count
        const uniqueId = idCounts[id] > 1 ? `${id}-${idCounts[id]}` : id;

        // Create a unique key that combines the ID and block index
        const key = `heading-${blockIndex}-${uniqueId}`;

        const level = parseInt(block.style.substring(1));

        extractedHeadings.push({ id: uniqueId, text, level, key });
      }
    });

    setHeadings(extractedHeadings);

    // Add IDs to the actual heading elements in the DOM
    setTimeout(() => {
      // First, find all heading elements without IDs
      const headingElements = Array.from(
        document.querySelectorAll("h1, h2")
      ).filter((el) => !el.id);

      // Then match them with our extracted headings
      extractedHeadings.forEach(({ id, text }) => {
        // Find the first heading element that matches the text and doesn't have an ID
        const matchingElement = headingElements.find(
          (el) => el.textContent?.trim() === text.trim()
        );

        if (matchingElement) {
          matchingElement.id = id;
          // Remove this element from the array so it's not matched again
          const index = headingElements.indexOf(matchingElement);
          if (index > -1) {
            headingElements.splice(index, 1);
          }
        }
      });
    }, 100);
  }, [content]);

  // Set up intersection observer to highlight active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that's intersecting
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        if (intersectingEntry) {
          setActiveId(intersectingEntry.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  // Scroll to heading when clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Get the height of any fixed headers
      const headerHeight = 100; // Adjust based on your actual header height

      // Calculate the target position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      // Smooth scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return (
      <p className="text-sm text-gray-500">No table of contents available</p>
    );
  }

  return (
    <nav className="toc" aria-label="Table of contents">
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.key}
            className={cn(
              "transition-colors",
              heading.level === 1 ? "font-medium" : ""
            )}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "flex w-full items-center py-1.5 text-left hover:text-primary",
                activeId === heading.id
                  ? "font-medium text-primary"
                  : "text-gray-600"
              )}
            >
              <ChevronRightIcon
                className={cn(
                  "mr-1.5 h-3 w-3 flex-shrink-0 transition-transform",
                  activeId === heading.id ? "text-primary" : "text-gray-400",
                  activeId === heading.id ? "rotate-90" : ""
                )}
              />
              <span className="line-clamp-1">{heading.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
