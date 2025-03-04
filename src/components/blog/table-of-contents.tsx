"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
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

  // Extract headings from the content
  useEffect(() => {
    if (!content) return;

    // Find all heading blocks in the Portable Text content
    const extractedHeadings: Heading[] = [];

    content.forEach((block: PortableTextBlock) => {
      if (
        block._type === "block" &&
        block.style &&
        ["h1", "h2", "h3", "h4"].includes(block.style)
      ) {
        // Create an ID from the heading text
        const text = block.children.map((child) => child.text).join("");

        const id = text
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-");

        const level = parseInt(block.style.substring(1));

        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);

    // Add IDs to the actual heading elements in the DOM
    setTimeout(() => {
      extractedHeadings.forEach(({ id, text }) => {
        const headingElements = Array.from(
          document.querySelectorAll("h1, h2, h3, h4")
        );
        const matchingElement = headingElements.find(
          (el) => el.textContent?.trim() === text.trim() && !el.id
        );

        if (matchingElement) {
          matchingElement.id = id;
        }
      });
    }, 100);
  }, [content]);

  // Set up intersection observer to highlight active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
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
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

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
    <nav className="toc">
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors",
              heading.level === 2 ? "ml-0" : "ml-4",
              heading.level === 4 ? "ml-8" : ""
            )}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "flex w-full items-center py-1 text-left hover:text-primary",
                activeId === heading.id
                  ? "font-medium text-primary"
                  : "text-gray-600"
              )}
            >
              <ChevronRightIcon
                className={cn(
                  "mr-1 h-3 w-3 transition-transform",
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
