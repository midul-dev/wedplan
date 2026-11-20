"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { BookingRequest } from "@/types/wedding";

interface VendorBookingRequestsTableProps {
  bookings: BookingRequest[];
  limit?: number;
}

export function VendorBookingRequestsTable({
  bookings: initialBookings,
  limit,
}: VendorBookingRequestsTableProps) {
  const [requests, setRequests] = useState<BookingRequest[]>(initialBookings);
  const [feedback, setFeedback] = useState<{ message: string; isAccept: boolean } | null>(null);

  const displayed = limit ? requests.slice(0, limit) : requests;

  const handleAction = (id: string, action: "accepted" | "rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    const isAccept = action === "accepted";
    const msg = isAccept
      ? "Booking accepted! Client has been notified."
      : "Inquiry declined. The requested date is freed up.";
    setFeedback({
      message: msg,
      isAccept,
    });

    if (isAccept) {
      toast.success("Booking Accepted", {
        description: "The couple has been notified to proceed with event planning.",
      });
    } else {
      toast.info("Booking Declined", {
        description: "The date has been released and the client notified.",
      });
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (displayed.length === 0) {
    return (
      <EmptyState
        title="No Booking Requests Yet"
        description="Couples will reach out to request dates for your wedding services. They will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {feedback && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            feedback.isAccept
              ? "bg-emerald-50 text-botanical-sage border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {feedback.isAccept ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-soft-pearl/80">
            <TableRow className="border-b border-zinc-200 hover:bg-transparent">
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                Customer
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Service Requested
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Event Date & Location
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Client Notes
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Status
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                Decision Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map((req) => {
              const isPending = req.status.toLowerCase() === "pending";

              return (
                <TableRow
                  key={req.id}
                  className="border-b border-zinc-100 hover:bg-soft-pearl/30 transition-colors"
                >
                  {/* Customer Information */}
                  <TableCell className="py-4 pl-6">
                    <div>
                      <p className="font-serif font-semibold text-sm text-deep-ink">
                        {req.customerName}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-sans">
                        {req.customerEmail}
                      </p>
                      {req.customerPhone && (
                        <p className="text-[10px] text-zinc-400 font-sans">
                          {req.customerPhone}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  {/* Service Name */}
                  <TableCell className="py-4">
                    <p className="font-serif font-medium text-xs text-deep-ink max-w-[160px] truncate">
                      {req.serviceName}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-sans">
                      {req.serviceCategory}
                    </span>
                  </TableCell>

                  {/* Event Date & Location */}
                  <TableCell className="py-4">
                    <p className="text-xs font-semibold text-deep-ink">
                      {formatDate(req.eventDate)}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {req.guestCount ? `${req.guestCount} Guests` : "Private Event"}
                    </p>
                  </TableCell>

                  {/* Customer Message / Notes */}
                  <TableCell className="py-4 max-w-[200px]">
                    <p className="text-xs text-zinc-600 line-clamp-2 italic">
                      &ldquo;{req.specialNotes || "Inquiry for celebration dates."}&rdquo;
                    </p>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-4">
                    <StatusBadge status={req.status} />
                  </TableCell>

                  {/* Decision Actions (Only visible for Pending rows) */}
                  <TableCell className="py-4 text-right pr-6">
                    {isPending ? (
                      <div className="flex items-center justify-end gap-2">
                        {/* Accept Button: Botanical Sage #15803D */}
                        <Button
                          size="sm"
                          onClick={() => handleAction(req.id, "accepted")}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg h-8 px-2.5 text-xs font-medium cursor-pointer shadow-xs"
                        >
                          <Check className="size-3.5 mr-1" />
                          Accept
                        </Button>

                        {/* Reject Button: Soft Rose Outline */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(req.id, "rejected")}
                          className="border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg h-8 px-2.5 text-xs font-medium cursor-pointer"
                        >
                          <X className="size-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-zinc-400 font-sans italic">
                        Resolved
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
