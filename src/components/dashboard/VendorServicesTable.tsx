"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, CheckCircle2, Plus, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button, buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import type { WeddingService } from "@/types/wedding";

interface VendorServicesTableProps {
  services: WeddingService[];
}

export function VendorServicesTable({ services: initialServices }: VendorServicesTableProps) {
  const [services, setServices] = useState<WeddingService[]>(initialServices);
  const [activeStatusMap, setActiveStatusMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    initialServices.forEach((s) => {
      map[s.id] = s.status === "approved";
    });
    return map;
  });

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const toggleAvailability = (id: string) => {
    setActiveStatusMap((prev) => {
      const nextState = !prev[id];
      setFeedbackMessage(
        nextState
          ? "Service set to Active & Accepting Bookings."
          : "Service paused from public search."
      );
      setTimeout(() => setFeedbackMessage(null), 3000);
      return { ...prev, [id]: nextState };
    });
  };

  const handleDelete = (id: string, title: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setFeedbackMessage(`"${title}" has been deleted.`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  if (services.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title="No Services Listed Yet"
        description="Publish your first wedding service package to start receiving date inquiries from couples."
        action={
          <Link
            href="/dashboard/vendor/add-service"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-5 text-sm font-medium"
            )}
          >
            <Plus className="size-4 mr-1.5" />
            Add New Service
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {feedbackMessage && (
        <div className="p-3 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-soft-pearl/80">
            <TableRow className="border-b border-zinc-200 hover:bg-transparent">
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                Service & Discipline
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Category
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Pricing
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Approval Status
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                Accepting Dates
              </TableHead>
              <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const isAvailable = activeStatusMap[service.id] ?? true;
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(service.price);

              return (
                <TableRow
                  key={service.id}
                  className="border-b border-zinc-100 hover:bg-soft-pearl/30 transition-colors"
                >
                  {/* Service Image + Title */}
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200">
                        <Image
                          src={service.featuredImage || service.images[0]}
                          alt={service.title}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/services/${service.id}`}
                          className="font-serif font-semibold text-sm text-deep-ink hover:text-rosewood transition-colors truncate block max-w-[200px]"
                        >
                          {service.title}
                        </Link>
                        <span className="text-[11px] text-zinc-500 font-sans truncate block">
                          {service.location}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category Pill */}
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-soft-pearl text-zinc-700 border border-zinc-200">
                      {service.category}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-4 text-xs font-semibold text-deep-ink">
                    {formattedPrice}
                    {service.priceUnit && (
                      <span className="text-[10px] text-zinc-500 font-normal ml-1">
                        /{service.priceUnit}
                      </span>
                    )}
                  </TableCell>

                  {/* Approval Status */}
                  <TableCell className="py-4">
                    <StatusBadge status={service.status} />
                  </TableCell>

                  {/* Availability Switch */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isAvailable}
                        onCheckedChange={() => toggleAvailability(service.id)}
                        aria-label={`Toggle active availability for ${service.title}`}
                      />
                      <span className="text-[11px] text-zinc-600 font-sans">
                        {isAvailable ? "Active" : "Paused"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Edit / Delete Icon Buttons */}
                  <TableCell className="py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-zinc-500 hover:text-deep-ink hover:bg-zinc-100 rounded-lg cursor-pointer"
                        title="Edit service details"
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleDelete(service.id, service.title)}
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
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
