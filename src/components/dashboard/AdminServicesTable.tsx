"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Check, AlertCircle, Trash2, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MOCK_SERVICES } from "@/data/mockData";
import type { WeddingService, ServiceStatus } from "@/types/wedding";

interface AdminServicesTableProps {
  initialStatusFilter?: string;
  limit?: number;
}

export function AdminServicesTable({
  initialStatusFilter = "all",
  limit,
}: AdminServicesTableProps) {
  const [services, setServices] = useState<WeddingService[]>(MOCK_SERVICES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    let result = services.filter((s) => {
      const matchSearch =
        !search.trim() ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.vendorName.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || s.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [services, search, statusFilter, limit]);

  const handleStatusChange = (id: string, newStatus: ServiceStatus, title: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    const msg = `Service "${title}" marked as ${newStatus.toUpperCase()}.`;
    setFeedback(msg);
    if (newStatus === "approved") {
      toast.success("Service Approved", { description: msg });
    } else if (newStatus === "rejected") {
      toast.warning("Service Rejected", { description: msg });
    } else {
      toast.info("Status Updated", { description: msg });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    const msg = `Service "${title}" has been deleted from the directory.`;
    setFeedback(msg);
    toast.success("Service Deleted", { description: msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Feedback Banner */}
      {feedback && (
        <div className="p-3 bg-zinc-100 text-deep-ink border border-zinc-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0 text-botanical-sage" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Top Search & Status Filter Toolbar */}
      <div className="p-4 bg-pure-alabaster border border-zinc-200 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search service title, vendor, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-white border-zinc-200 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val || "all")}
          >
            <SelectTrigger className="w-full h-10 rounded-xl bg-white border-zinc-200 text-sm font-sans">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Services Table */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title="No Services Found"
          description="Try modifying your keyword search or switching status filters."
        />
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
          <Table>
            <TableHeader className="bg-soft-pearl/80">
              <TableRow className="border-b border-zinc-200 hover:bg-transparent">
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                  Service & Category
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Vendor
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Price
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Approval Status
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                  Moderation Controls
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => {
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
                    {/* Image & Title */}
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
                            {service.category}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Vendor */}
                    <TableCell className="py-4 text-xs font-medium text-zinc-700">
                      {service.vendorName}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="py-4 text-xs font-semibold text-deep-ink">
                      {formattedPrice}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="py-4">
                      <StatusBadge status={service.status} />
                    </TableCell>

                    {/* Moderation Action Buttons */}
                    <TableCell className="py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Approve: Sage Button */}
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(service.id, "approved", service.title)}
                          disabled={service.status === "approved"}
                          className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-zinc-100 disabled:text-zinc-400 text-white rounded-lg h-8 px-2.5 text-xs font-medium cursor-pointer shadow-xs"
                          title="Approve service"
                        >
                          <Check className="size-3.5 mr-1" />
                          Approve
                        </Button>

                        {/* Reject: Amber Outline Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(service.id, "rejected", service.title)}
                          disabled={service.status === "rejected"}
                          className="border-amber-300 text-amber-800 hover:bg-amber-50 disabled:opacity-40 rounded-lg h-8 px-2.5 text-xs font-medium cursor-pointer"
                          title="Reject service"
                        >
                          <AlertCircle className="size-3.5 mr-1 text-amber-700" />
                          Reject
                        </Button>

                        {/* Delete: Rose Outline Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service.id, service.title)}
                          className="border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg h-8 px-2.5 text-xs font-medium cursor-pointer"
                          title="Delete from database"
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
      )}
    </div>
  );
}
