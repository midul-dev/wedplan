"use client";

import React from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES } from "@/types/wedding";

export interface FilterState {
  search: string;
  category: string;
  location: string;
  sortBy: string;
}

interface ServiceFilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  locations: string[];
  totalResults: number;
}

export function ServiceFilterBar({
  filters,
  onFilterChange,
  onReset,
  locations,
  totalResults,
}: ServiceFilterBarProps) {
  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.category !== "all" ||
    filters.location !== "all" ||
    filters.sortBy !== "featured";

  return (
    <div className="w-full bg-pure-alabaster border border-border rounded-xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* 1. Search by Service/Vendor Name (4 cols) */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
          <Input
            type="text"
            placeholder="Search service, venue, or vendor"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-9 h-10 rounded-lg bg-pure-alabaster border-border text-sm placeholder:text-muted-foreground/70 focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        {/* 2. Category Filter (3 cols) */}
        <div className="lg:col-span-3">
          <Select
            value={filters.category}
            onValueChange={(val) => onFilterChange("category", val || "all")}
          >
            <SelectTrigger className="w-full h-10 rounded-xl bg-white border-zinc-200 text-sm font-sans">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
              <SelectItem value="all">All Categories</SelectItem>
              {SERVICE_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 3. Location Filter (3 cols) */}
        <div className="lg:col-span-3">
          <Select
            value={filters.location}
            onValueChange={(val) => onFilterChange("location", val || "all")}
          >
            <SelectTrigger className="w-full h-10 rounded-xl bg-white border-zinc-200 text-sm font-sans">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 4. Price Sort (2 cols) */}
        <div className="lg:col-span-2">
          <Select
            value={filters.sortBy}
            onValueChange={(val) => onFilterChange("sortBy", val || "featured")}
          >
            <SelectTrigger className="w-full h-10 rounded-xl bg-white border-zinc-200 text-sm font-sans">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Summary Bar */}
      <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 font-sans">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-3.5 text-zinc-400" />
          <span>
            Showing <strong className="font-semibold text-deep-ink">{totalResults}</strong> available wedding services
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-rosewood hover:text-rosewood-hover font-medium cursor-pointer transition-colors"
          >
            <RotateCcw className="size-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
