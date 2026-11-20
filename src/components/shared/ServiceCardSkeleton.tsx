import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ServiceCardSkeletonProps {
  className?: string;
}

export function ServiceCardSkeleton({ className }: ServiceCardSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-pure-alabaster border border-zinc-200 rounded-2xl overflow-hidden",
        className
      )}
    >
      {/* 4/3 Aspect Ratio Image Skeleton */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      {/* Content Skeleton with p-6 */}
      <div className="flex flex-1 flex-col p-6 space-y-4">
        {/* Category Pill + Price Row */}
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-4/5 rounded-md" />
          <Skeleton className="h-4 w-3/5 rounded-md" />
        </div>

        {/* Location & Vendor Skeleton */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>

        {/* Button Skeleton */}
        <div className="pt-2 mt-auto">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
