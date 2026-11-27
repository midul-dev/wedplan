"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Store } from "lucide-react";
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
import { toast } from "@/components/ui/sonner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { EditServiceDialog } from "@/components/dashboard/EditServiceDialog";
import { DeleteServiceDialog } from "@/components/dashboard/DeleteServiceDialog";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/fetcher";
import type { IWeddingService } from "@/types/wedding";

interface VendorServicesTableProps {
  services: IWeddingService[];
}

function getServiceImage(service: IWeddingService): string | null {
  if (service.featuredImage) return service.featuredImage;
  if (service.image) return service.image;
  if (Array.isArray(service.images)) return service.images[0] ?? null;
  if (typeof service.images === "string" && service.images.trim()) {
    return service.images;
  }
  return null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
}

export function VendorServicesTable({ services }: VendorServicesTableProps) {
  const router = useRouter();

  const handleToggle = async (id: string, nextState: boolean) => {
    try {
      await apiFetch(`/service/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: nextState }),
      });

      toast.success(nextState ? "Service activated" : "Service paused");
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (services.length === 0) {
    return (
      <EmptyState
        icon={Store}
        title="No services listed yet"
        description="Publish your first wedding service package to start receiving date inquiries from couples."
        action={
          <Link
            href="/dashboard/vendor/add-service"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 px-5 text-sm font-medium",
            )}
          >
            <Plus className="size-4 mr-1.5" strokeWidth={1.5} />
            Add new service
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-pure-alabaster overflow-hidden">
        <Table>
          <TableHeader className="bg-soft-pearl">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-medium text-deep-ink text-xs py-3.5 pl-6">
                Service
              </TableHead>
              <TableHead className="font-medium text-deep-ink text-xs py-3.5">
                Category
              </TableHead>
              <TableHead className="font-medium text-deep-ink text-xs py-3.5">
                Pricing
              </TableHead>
              <TableHead className="font-medium text-deep-ink text-xs py-3.5">
                Approval status
              </TableHead>
              <TableHead className="font-medium text-deep-ink text-xs py-3.5">
                Accepting dates
              </TableHead>
              <TableHead className="font-medium text-deep-ink text-xs py-3.5 text-right pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const imageSrc = getServiceImage(service);
              const isAvailable = Boolean(service.isActive);

              return (
                <TableRow
                  key={service._id}
                  className="border-b border-border hover:bg-soft-pearl/40 transition-colors"
                >
                  {/* Service Image + Title */}
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-lg bg-soft-pearl border border-border flex items-center justify-center">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={service.title}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        ) : (
                          <Store
                            className="size-4 text-muted-foreground"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/services/${service._id}`}
                          className="font-serif font-medium text-sm text-deep-ink hover:text-rosewood transition-colors truncate block max-w-[220px]"
                        >
                          {service.title}
                        </Link>
                        <span className="text-xs text-muted-foreground font-sans truncate block">
                          {service.location}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-soft-pearl text-deep-ink border border-border">
                      {service.category}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-4 text-xs font-medium text-deep-ink tabular-nums">
                    {formatPrice(service.price)}
                    {service.priceUnit && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        /{service.priceUnit}
                      </span>
                    )}
                  </TableCell>

                  {/* Approval Status */}
                  <TableCell className="py-4">
                    <StatusBadge status={service.status ?? "pending"} />
                  </TableCell>

                  {/* Availability Switch */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isAvailable}
                        onCheckedChange={(checked) =>
                          handleToggle(service._id, checked)
                        }
                        aria-label={`Toggle active availability for ${service.title}`}
                      />
                      <span className="text-xs text-muted-foreground font-sans">
                        {isAvailable ? "Active" : "Paused"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Edit / Delete Icon Buttons */}
                  <TableCell className="py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <EditServiceDialog service={service} />

                      <DeleteServiceDialog service={service} />
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
