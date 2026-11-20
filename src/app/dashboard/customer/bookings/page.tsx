import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BookingsTable } from "@/components/dashboard/BookingsTable";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_BOOKINGS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "My Wedding Bookings — WedPlan",
  description: "View and manage your wedding vendor bookings and dates.",
};

export default function CustomerBookingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
            Inquiry Ledger
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
            My Wedding Bookings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans">
            Track status updates, confirmed dates, and inquiry correspondence across all vendors.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-4 text-xs sm:text-sm font-medium shadow-xs"
            )}
          >
            <Plus className="size-3.5 mr-1.5" />
            Request New Service
          </Link>
        </div>
      </div>

      {/* Full Bookings Table */}
      <BookingsTable bookings={MOCK_BOOKINGS} />
    </div>
  );
}
