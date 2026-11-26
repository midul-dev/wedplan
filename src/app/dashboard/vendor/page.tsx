import React from "react";
import Link from "next/link";
import { Store, CalendarCheck2, Clock, DollarSign, Plus } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { VendorBookingRequestsTable } from "@/components/dashboard/VendorBookingRequestsTable";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_BOOKINGS, MOCK_SERVICES, MOCK_USERS } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { IUser } from "@/types/wedding";

export default async function VendorOverviewPage() {
 const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const vendorUser: IUser = session.user; 
  const vendorServices = MOCK_SERVICES.filter(
    (s) => s.vendorId === vendorUser.id || s.vendorTier === "free"
  );
  const pendingRequests = MOCK_BOOKINGS.filter((b) => b.status === "pending").length;
  const acceptedRequests = MOCK_BOOKINGS.filter((b) => b.status === "accepted").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <p className="text-xs font-medium text-rosewood">
            Vendor studio
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
            {vendorUser.businessName || vendorUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Manage your service portfolio, review incoming date requests, and track inquiry conversions.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/dashboard/vendor/add-service"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-9 px-4 text-sm font-medium"
            )}
          >
            <Plus className="size-4 mr-1.5" strokeWidth={1.5} />
            Add service
          </Link>
        </div>
      </div>

      {/* 5 StatCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard
          label="Total Services"
          value={vendorServices.length}
          description="Active listings"
          icon={Store}
        />
        <StatCard
          label="Confirmed Dates"
          value={acceptedRequests}
          trend={{ value: "Confirmed", isPositive: true }}
          description="Active client events"
          icon={CalendarCheck2}
        />
        <StatCard
          label="Pending Requests"
          value={pendingRequests}
          trend={{ value: "Action Required", isPositive: true }}
          description="Awaiting your response"
          icon={Clock}
        />
        <StatCard
          label="Pipeline Value"
          value="$16,900"
          trend={{ value: "+18% mo", isPositive: true }}
          description="Inquiry gross volume"
          icon={DollarSign}
        />
        <StatCard
          label="Studio Tier"
          value={vendorUser.vendorTier === "premium" ? "Premium" : "Free Plan"}
          description="3 of 3 slots used"
        />
      </div>

      {/* Recent Client Requests */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-deep-ink tracking-tight">
              Recent Client Inquiries
            </h2>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Review event dates and decide to accept or decline bookings
            </p>
          </div>
          <Link
            href="/dashboard/vendor/bookings"
            className="text-xs font-semibold text-rosewood hover:underline"
          >
            View All Requests ({MOCK_BOOKINGS.length})
          </Link>
        </div>

        <VendorBookingRequestsTable bookings={MOCK_BOOKINGS} limit={3} />
      </div>
    </div>
  );
}
