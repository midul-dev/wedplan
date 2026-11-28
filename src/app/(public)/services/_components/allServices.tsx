"use client";

import React, { useState, useMemo } from "react";
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
import type { IWeddingService, WeddingService } from "@/types/wedding";

interface AllServicesProps {
  activeServices: IWeddingService[];
}

function toCardService(activeServices: IWeddingService): WeddingService & {
  id: string;
  featuredImage: string;
  vendorTier?: string;
} {
  const imageUrl =
    activeServices.featuredImage ||
    activeServices.image ||
    (Array.isArray(activeServices.images) ? activeServices.images[0] : activeServices.images) ||
    "";

  return {
    ...(activeServices as unknown as WeddingService),
    id: activeServices._id,
    featuredImage: imageUrl,
  };
}

export function AllServices({ activeServices }: AllServicesProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "all";

  const [filters, setFilters] = useState<FilterState>({
    search: initialQuery,
    category: initialCategory,
    location: initialLocation,
    sortBy: "featured",
  });

  const [simulateLoading, setSimulateLoading] = useState(false);

  

  // Extract unique locations from active services
  const locations = useMemo(() => {
    const locSet = new Set(
      activeServices.map((s) => s.location).filter(Boolean)
    );
    return Array.from(locSet).sort();
  }, [activeServices]);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let result = [...activeServices];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.vendorName || "").toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter((s) => s.category === filters.category);
    }

    if (filters.location && filters.location !== "all") {
      result = result.filter((s) => s.location === filters.location);
    }

    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [activeServices, filters]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
      {/* Filter Toolbar */}
      <div className="space-y-3">
        <ServiceFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          locations={locations}
          totalResults={filteredServices.length}
        />

        {/* Preview Skeleton Toggle */}
        <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground font-sans">
          <button
            type="button"
            onClick={() => setSimulateLoading((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-pure-alabaster hover:bg-soft-pearl text-deep-ink transition-colors cursor-pointer select-none"
          >
            <Loader2 className="size-3 text-rosewood" strokeWidth={1.5} />
            <span>
              {simulateLoading ? "Show real cards" : "Preview loading skeletons"}
            </span>
          </button>
        </div>
      </div>

      {/* Service Cards Grid / Skeleton / Empty State */}
      {simulateLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={toCardService(service)} />
          ))}
        </div>
      ) : (
        <div className="py-8">
          <EmptyState
            icon={SearchX}
            title="No wedding services found"
            description="No services matched your current filters. Try refining your keyword, selecting another category, or resetting your filters."
            action={
              <Button
                onClick={handleResetFilters}
                className="bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 px-5 text-sm font-medium transition-colors"
              >
                <RotateCcw className="size-3.5 mr-2" strokeWidth={1.5} />
                Reset all filters
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
