import React from "react";
import { AdminServicesTable } from "@/components/dashboard/AdminServicesTable";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse, IWeddingService } from "@/types/wedding";

export const metadata = {
  title: "Manage Services — Admin Portal",
  description:
    "Review, approve, reject, and curate wedding service listings across all categories.",
};

export default async function AdminServicesPage() {
  let services: IWeddingService[] = [];

  try {
    const res = await apiFetch<ApiResponse<IWeddingService[]>>("/service", {
      cache: "no-store",
    });
    services = res.data ?? [];
  } catch {
    services = [];
  }

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-border space-y-1">
        <p className="text-xs font-medium text-rosewood">Directory curation</p>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
          Service catalog moderation
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans">
          Audit submitted vendor packages, verify pricing transparency, and
          approve listings for public discovery.
        </p>
      </div>

      <AdminServicesTable services={services} />
    </div>
  );
}
