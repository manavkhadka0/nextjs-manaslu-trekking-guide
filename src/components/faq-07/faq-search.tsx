"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon, LoaderIcon } from "lucide-react";

interface FAQSearchProps {
  initialQuery?: string;
}

export default function FAQSearch({ initialQuery = "" }: FAQSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // Update search query when URL changes
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Focus the input when the focus parameter is present
  useEffect(() => {
    if (searchParams.get("focus") === "search" && inputRef.current) {
      inputRef.current.focus();

      // Remove the focus parameter from the URL
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("focus");
        router.replace(`/faqs?${params.toString()}`, { scroll: false });
      });
    }
  }, [searchParams, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      // Create new URLSearchParams
      const params = new URLSearchParams(searchParams);

      // Update or remove the 'q' parameter based on searchQuery
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }

      // Update the URL
      router.push(`/faqs?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete("q");
      router.push(`/faqs?${params.toString()}`);
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-24 h-12 bg-white dark:bg-accent shadow-sm"
          />
          <div className="absolute right-0 top-0 h-full flex items-center pr-2">
            {isPending && (
              <LoaderIcon className="h-5 w-5 text-muted-foreground animate-spin mr-2" />
            )}
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={clearSearch}
                disabled={isPending}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="ml-1"
              disabled={isPending || !searchQuery.trim()}
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      {searchQuery && (
        <p className="mt-2 text-sm text-muted-foreground">
          Showing results for:{" "}
          <span className="font-medium">{searchQuery}</span>
        </p>
      )}
    </div>
  );
}
