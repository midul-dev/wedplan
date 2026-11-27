import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { VendorServicesTable } from "@/components/dashboard/VendorServicesTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/fetcher";
import { ApiResponse, IUser, IWeddingService } from "@/types/wedding";

export const metadata = {
  title: "My Services — Vendor Studio",
  description: "Manage your wedding service listings, pricing, and live availability.",
};

export default async function VendorServicesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user: IUser = session.user;

  const res = await apiFetch<ApiResponse<IWeddingService[]>>(
    `/service?vendorId=${user.id}`,
    { cache: "no-store" }
  );
  const services: IWeddingService[] = res.data ?? [];

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
