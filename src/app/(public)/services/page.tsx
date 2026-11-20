"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX, RotateCcw, Loader2 } from "lucide-react";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ServiceCardSkeleton } from "@/components/shared/ServiceCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import {
  ServiceFilterBar,
  type FilterState,
} from "@/components/services/ServiceFilterBar";
import { MOCK_SERVICES } from "@/data/mockData";
import { type WeddingService } from "@/types/wedding";

function BrowseServicesView() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "all";

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: initialQuery,
    category: initialCategory,
    location: initialLocation,
    sortBy: "featured",
  });

  // Preview state to toggle skeleton view
  const [simulateLoading, setSimulateLoading] = useState(false);

  // Extract unique locations from approved services
  const locations = useMemo(() => {
    const locSet = new Set(
      MOCK_SERVICES.filter((s) => s.status === "approved").map((s) => s.location)
    );
    return Array.from(locSet).sort();
  }, []);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let result = MOCK_SERVICES.filter((s) => s.status === "approved");

    // Search query filter (title, vendorName, description)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.vendorName.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      result = result.filter((s) => s.category === filters.category);
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      result = result.filter((s) => s.location === filters.location);
    }

    // Sort order
    if (filters.sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating-desc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      location: "all",
      sortBy: "featured",
    });
  };

  return (
    <div className="w-full min-h-screen bg-pure-alabaster flex flex-col">
      {/* 1. Header Band on Soft Pearl #F7F6F3 */}
      <div className="w-full bg-soft-pearl border-b border-zinc-200/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs uppercase tracking-widest font-semibold text-rosewood">
            The Wedding Directory
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-deep-ink">
            Browse Wedding Services
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-2xl leading-relaxed">
            Discover verified private estates, documentary cinematographers, floral artists,
            and couture ateliers dedicated to your celebration.
          </p>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        {/* Floating Filter Toolbar */}
        <div className="space-y-3">
          <ServiceFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            locations={locations}
            totalResults={filteredServices.length}
          />

          {/* Dev / Preview Bar */}
          <div className="flex items-center justify-end gap-3 text-xs text-zinc-500 font-sans">
            <button
              type="button"
              onClick={() => setSimulateLoading((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer select-none"
            >
              <Loader2 className="size-3 text-rosewood" />
              <span>
                {simulateLoading ? "Show Real Cards" : "Preview Loading Skeletons"}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Service Cards Grid / Skeleton / Empty State */}
        {simulateLoading ? (
          // 6 Skeletons Preview
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ServiceCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          // Active Services Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service: WeddingService) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          // Clean Empty State
          <div className="py-8">
            <EmptyState
              icon={SearchX}
              title="No Wedding Services Found"
              description="No services matched your current filters. Try refining your keyword, selecting another category, or resetting your filters."
              action={
                <Button
                  onClick={handleResetFilters}
                  className="bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-5 text-sm font-medium transition-colors shadow-xs"
                >
                  <RotateCcw className="size-3.5 mr-2" />
                  Reset All Filters
                </Button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))}
        </div>
      }
    >
      <BrowseServicesView />
    </Suspense>
  );
}
