import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { BookingsTable } from "@/components/dashboard/BookingsTable";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_BOOKINGS } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function CustomerOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name ?? "Guest";
  const pendingCount = MOCK_BOOKINGS.filter(
    (b) => b.status === "pending",
  ).length;
  const acceptedCount = MOCK_BOOKINGS.filter(
    (b) => b.status === "accepted",
  ).length;
  const rejectedCount = MOCK_BOOKINGS.filter(
    (b) => b.status === "rejected",
  ).length;

  return (
    <div className="space-y-8">
      {/* Editorial Dashboard Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
            Customer Dashboard
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans">
            Review your celebration milestones, vendor responses, and active
            date requests.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-4 text-xs sm:text-sm font-medium shadow-xs",
            )}
          >
            <Search className="size-3.5 mr-1.5" />
            Find More Services
          </Link>
        </div>
      </div>

      {/* 4 StatCards Grid with 8px rhythm (gap-6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Inquiries"
          value={MOCK_BOOKINGS.length}
          description="Services contacted"
          icon={CalendarCheck2}
        />
        <StatCard
          label="Pending Review"
          value={pendingCount}
          trend={{ value: "Awaiting Vendor", isPositive: true }}
          description="In review by artisans"
          icon={Clock}
        />
        <StatCard
          label="Confirmed Dates"
          value={acceptedCount}
          trend={{ value: "Accepted", isPositive: true }}
          description="Date locked in"
          icon={CheckCircle2}
        />
        <StatCard
          label="Declined Inquiries"
          value={rejectedCount}
          trend={{ value: "Schedule Clash", isPositive: false }}
          description="Needs alternative"
          icon={XCircle}
        />
      </div>

      {/* Recent Bookings Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-deep-ink tracking-tight">
              Recent Booking Inquiries
            </h2>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Direct inquiries submitted to vendor calendars
            </p>
          </div>
          <Link
            href="/dashboard/customer/bookings"
            className="text-xs font-semibold text-rosewood hover:underline"
          >
            View All ({MOCK_BOOKINGS.length})
          </Link>
        </div>

        <BookingsTable bookings={MOCK_BOOKINGS} limit={3} showViewAll={true} />
      </div>
    </div>
  );
}
