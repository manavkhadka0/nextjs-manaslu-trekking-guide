"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: URLSearchParams | ReturnType<typeof useSearchParams>;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
  className,
}: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Create a function to generate page URLs
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    return `${baseUrl}?${params.toString()}`;
  };

  // Calculate the range of pages to display
  const getPageRange = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];
    let l;

    // Always include page 1
    range.push(1);

    // Calculate the range of pages to show
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always include the last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageRange = getPageRange();

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("flex justify-center items-center gap-1", className)}
    >
      {/* First page */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage !== 1 ? (
          <Link href={createPageUrl(1)} aria-label="Go to first page">
            <ChevronsLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronsLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {/* Previous page */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage !== 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {/* Page numbers */}
      {pageRange.map((page, i) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${i}`}
              className="px-3 py-1.5 text-sm text-gray-500"
            >
              {page}
            </span>
          );
        }

        const pageNum = page as number;
        const isCurrentPage = pageNum === currentPage;

        return (
          <Button
            key={`page-${pageNum}`}
            variant={isCurrentPage ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            asChild={!isCurrentPage}
            aria-current={isCurrentPage ? "page" : undefined}
          >
            {!isCurrentPage ? (
              <Link
                href={createPageUrl(pageNum)}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </Link>
            ) : (
              <span>{pageNum}</span>
            )}
          </Button>
        );
      })}

      {/* Next page */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage !== totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>

      {/* Last page */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage !== totalPages ? (
          <Link href={createPageUrl(totalPages)} aria-label="Go to last page">
            <ChevronsRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronsRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}
