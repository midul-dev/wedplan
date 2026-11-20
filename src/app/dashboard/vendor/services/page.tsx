import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { VendorServicesTable } from "@/components/dashboard/VendorServicesTable";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_SERVICES, MOCK_USERS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "My Services — Vendor Studio",
  description: "Manage your wedding service listings, pricing, and live availability.",
};

export default function VendorServicesPage() {
  const vendorUser = MOCK_USERS[1];
  const services = MOCK_SERVICES.filter(
    (s) => s.vendorId === vendorUser.id || s.vendorTier === "free"
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
            Catalog Management
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
            My Wedding Services
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans">
            Manage packages, toggle live public availability, and review approval statuses.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/dashboard/vendor/add-service"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-4 text-xs sm:text-sm font-medium shadow-xs"
            )}
          >
            <Plus className="size-3.5 mr-1.5" />
            Add New Service
          </Link>
        </div>
      </div>

      <VendorServicesTable services={services} />
    </div>
  );
}
