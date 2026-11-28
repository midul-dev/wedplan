import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { VendorBookingRequestsTable } from "@/components/dashboard/VendorBookingRequestsTable";
import { auth } from "@/lib/auth";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse, BookingRequest } from "@/types/wedding";

export const metadata = {
  title: "Booking Requests — Vendor Studio",
  description:
    "Review incoming client booking inquiries, requested celebration dates, and client messages.",
};

type BookingDoc = BookingRequest & { _id?: string };

export default async function VendorBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  let bookings: BookingRequest[] = [];

  try {
    const res = await apiFetch<ApiResponse<BookingDoc[]>>(
      `/bookings?vendorId=${session.user.id}`,
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
      <div className="pb-6 border-b border-border space-y-1">
        <p className="text-xs font-medium text-rosewood">
          Calendar management
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
          Client booking requests
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans">
          Review date availability inquiries, read client vision notes, and accept or decline requests.
        </p>
      </div>

      <VendorBookingRequestsTable bookings={bookings} />
    </div>
  );
}
