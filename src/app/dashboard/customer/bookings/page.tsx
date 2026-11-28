import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { BookingsTable } from "@/components/dashboard/BookingsTable";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { apiFetch } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import type { ApiResponse, BookingRequest } from "@/types/wedding";

export const metadata = {
  title: "My Wedding Bookings — WedPlan",
  description: "View and manage your wedding vendor bookings and dates.",
};

type BookingDoc = BookingRequest & { _id?: string };

export default async function CustomerBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  let bookings: BookingRequest[] = [];

  try {
    const res = await apiFetch<ApiResponse<BookingDoc[]>>(
      `/bookings?customerId=${session.user.id}`,
      { cache: "no-store" }
    );
    bookings = (res.data ?? []).map((b) => ({
      ...b,
      id: b._id || b.id,
    }));
  } catch {
    bookings = [];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <p className="text-xs font-medium text-rosewood">
            Inquiry ledger
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
            My wedding bookings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Track status updates, confirmed dates, and inquiry correspondence across all vendors.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-9 px-4 text-sm font-medium"
            )}
          >
            <Plus className="size-4 mr-1.5" strokeWidth={1.5} />
            Request new service
          </Link>
        </div>
      </div>

      {/* Full Bookings Table */}
      <BookingsTable bookings={bookings} />
    </div>
  );
}
