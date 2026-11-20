import React from "react";
import { VendorBookingRequestsTable } from "@/components/dashboard/VendorBookingRequestsTable";
import { MOCK_BOOKINGS } from "@/data/mockData";

export const metadata = {
  title: "Booking Requests — Vendor Studio",
  description: "Review incoming client booking inquiries, requested celebration dates, and client messages.",
};

export default function VendorBookingsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Calendar Management
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Client Booking Requests
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Review date availability inquiries, read client vision notes, and accept or decline requests.
        </p>
      </div>

      <VendorBookingRequestsTable bookings={MOCK_BOOKINGS} />
    </div>
  );
}
