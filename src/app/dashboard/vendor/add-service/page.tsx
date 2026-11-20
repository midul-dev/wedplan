import React from "react";
import { AddServiceForm } from "@/components/dashboard/AddServiceForm";

export const metadata = {
  title: "Add Wedding Service — Vendor Studio",
  description: "Publish a new wedding service or package to the directory.",
};

export default function AddServicePage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Portfolio Creation
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Add New Wedding Service
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Curate a new package with transparent pricing, full amenity details, and showcase photos.
        </p>
      </div>

      <AddServiceForm isFreeLimitReached={false} />
    </div>
  );
}
