import React from "react";
import { AdminServicesTable } from "@/components/dashboard/AdminServicesTable";

export const metadata = {
  title: "Manage Services — Admin Portal",
  description: "Review, approve, reject, and curate wedding service listings across all categories.",
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Directory Curation
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Service Catalog Moderation
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Audit submitted vendor packages, verify pricing transparency, and approve listings for public discovery.
        </p>
      </div>

      <AdminServicesTable />
    </div>
  );
}
