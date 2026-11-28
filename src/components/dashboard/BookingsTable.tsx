"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, XCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/fetcher";
import type { BookingRequest } from "@/types/wedding";

interface BookingsTableProps {
  bookings: BookingRequest[];
  limit?: number;
  showViewAll?: boolean;
}

export function BookingsTable({
  bookings: initialBookings,
  limit,
  showViewAll = false,
}: BookingsTableProps) {
  const router = useRouter();
  const [bookingsList, setBookingsList] = useState<BookingRequest[]>(initialBookings);
  const [cancelledId, setCancelledId] = useState<string | null>(null);

  const displayed = limit ? bookingsList.slice(0, limit) : bookingsList;

  const handleCancelBooking = async (id: string) => {
    try {
      await apiFetch(`/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" }),
      });

      setBookingsList((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
      );
      setCancelledId(id);
      toast.info("Booking request cancelled", {
        description: "The vendor has been notified of your cancellation.",
      });
      setTimeout(() => setCancelledId(null), 3000);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel booking"
      );
    }
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
        icon={Calendar}
        title="No Bookings Found"
        description="You have not requested any vendor dates yet. Browse our curated services to begin planning."
        action={
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-5 text-sm font-medium"
            )}
          >
            Browse Wedding Services
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {cancelledId && (
        <div className="p-3 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>Booking inquiry cancelled successfully.</span>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-soft-pearl/80">
            <TableRow className="border-b border-zinc-200 hover:bg-transparent">
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                Service
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Vendor
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Event Date
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Location
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Status
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Requested
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map((booking) => {
              const isPending = booking.status.toLowerCase() === "pending";

              return (
                <TableRow
                  key={booking.id}
                  className="border-b border-zinc-100 hover:bg-soft-pearl/30 transition-colors"
                >
                  {/* Service Thumbnail + Title */}
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-lg bg-soft-pearl border border-border flex items-center justify-center">
                        {booking.serviceImage ? (
                          <Image
                            src={booking.serviceImage}
                            alt={booking.serviceName}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        ) : (
                          <Calendar className="size-4 text-muted-foreground" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/services/${booking.serviceId}`}
                          className="font-serif font-semibold text-sm text-deep-ink hover:text-rosewood transition-colors truncate block max-w-[200px]"
                        >
                          {booking.serviceName}
                        </Link>
                        <span className="inline-block text-[10px] text-zinc-500 font-sans mt-0.5">
                          {booking.serviceCategory}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Vendor Name */}
                  <TableCell className="py-4 text-xs font-medium text-zinc-700">
                    {booking.vendorName}
                  </TableCell>

                  {/* Event Date */}
                  <TableCell className="py-4 text-xs font-medium text-deep-ink">
                    {formatDate(booking.eventDate)}
                  </TableCell>

                  {/* Location */}
                  <TableCell className="py-4 text-xs text-zinc-600 max-w-[140px] truncate">
                    {booking.specialNotes?.slice(0, 30) || "Private Venue"}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-4">
                    <StatusBadge status={booking.status} />
                  </TableCell>

                  {/* Request Date */}
                  <TableCell className="py-4 text-xs text-zinc-500">
                    {formatDate(booking.createdAt)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-4 text-right pr-6">
                    {isPending ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-xs text-rose-700 hover:bg-rose-50 hover:text-rose-800 h-8 px-2.5 rounded-lg cursor-pointer"
                      >
                        <XCircle className="size-3.5 mr-1" />
                        Cancel
                      </Button>
                    ) : (
                      <span className="text-[11px] text-zinc-400 font-sans italic">
                        No actions
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {showViewAll && limit && initialBookings.length > limit && (
        <div className="text-right pt-2">
          <Link
            href="/dashboard/customer/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rosewood hover:underline"
          >
            <span>View All Bookings ({initialBookings.length})</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
