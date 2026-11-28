import React, { Suspense } from "react";
import { ServiceCardSkeleton } from "@/components/shared/ServiceCardSkeleton";
import { AllServices } from "@/app/(public)/services/_components/allServices";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse, IWeddingService } from "@/types/wedding";

export const metadata = {
  title: "Browse Services — WedPlan",
  description:
    "Compare private estates, documentary photographers, florists, and couture ateliers for your celebration.",
};

export default async function BrowseServicesPage() {
  let activeServices: IWeddingService[] = [];

  try {
    const res = await apiFetch<ApiResponse<IWeddingService[]>>("/service?isActive=true", {
      cache: "no-store",
    });
    activeServices = res.data ?? [];
  } catch {
    activeServices = [];
  }

  return (
    <div className="w-full min-h-screen bg-pure-alabaster flex flex-col">
      {/* 1. Header Band */}
      <div className="w-full bg-soft-pearl border-b border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-xs font-medium text-rosewood">
            Wedding directory
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-deep-ink">
            Browse wedding services
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Compare private estates, documentary photographers, florists, and
            couture ateliers for your celebration.
          </p>
        </div>
      </div>

      {/* 2. Client Interactive Directory */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ServiceCardSkeleton key={idx} />
            ))}
          </div>
        }
      >
        <AllServices activeServices={activeServices} />
      </Suspense>
    </div>
  );
}
