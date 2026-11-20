"use client";

import React, { useState, useMemo } from "react";
import { Search, Receipt, ShieldCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MOCK_TRANSACTIONS } from "@/data/mockData";
import type { SubscriptionTransaction } from "@/types/wedding";

interface AdminTransactionsTableProps {
  transactions?: SubscriptionTransaction[];
}

export function AdminTransactionsTable({
  transactions = MOCK_TRANSACTIONS,
}: AdminTransactionsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase().trim();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.vendorName.toLowerCase().includes(q) ||
        (tx.stripePaymentIntentId && tx.stripePaymentIntentId.toLowerCase().includes(q)) ||
        tx.plan.toLowerCase().includes(q)
      );
    });
  }, [transactions, search]);

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

  return (
    <div className="space-y-4">
      {/* Top Search Toolbar */}
      <div className="p-4 bg-pure-alabaster border border-zinc-200 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search by vendor, plan, or Stripe ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-white border-zinc-200 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-sans">
          <ShieldCheck className="size-4 text-emerald-600" />
          <span>Immutable Stripe Ledger (Read-Only)</span>
        </div>
      </div>

      {/* Transactions Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No Transactions Found"
          description="No billing records match your search criteria."
        />
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
          <Table>
            <TableHeader className="bg-soft-pearl/80">
              <TableRow className="border-b border-zinc-200 hover:bg-transparent">
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                  Vendor Partner
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Plan Tier
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Gross Amount
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Stripe Payment Intent ID
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Payment Status
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-b border-zinc-100 hover:bg-soft-pearl/30 transition-colors"
                >
                  {/* Vendor Information */}
                  <TableCell className="py-4 pl-6">
                    <div>
                      <p className="font-serif font-semibold text-sm text-deep-ink">
                        {tx.vendorName}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        ID: {tx.vendorId}
                      </p>
                    </div>
                  </TableCell>

                  {/* Plan Tier */}
                  <TableCell className="py-4">
                    <span className="text-xs font-semibold text-deep-ink capitalize">
                      {tx.plan.replace("_", " ")}
                    </span>
                    <span className="block text-[10px] text-zinc-500 capitalize">
                      {tx.billingInterval} billing
                    </span>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="py-4 text-xs font-bold text-deep-ink">
                    ${tx.amount}.00 {tx.currency.toUpperCase()}
                  </TableCell>

                  {/* Monospace Stripe ID */}
                  <TableCell className="py-4">
                    <span className="font-mono text-xs text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200">
                      {tx.stripePaymentIntentId || tx.id}
                    </span>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-4">
                    <StatusBadge status={tx.status} />
                  </TableCell>

                  {/* Transaction Date */}
                  <TableCell className="py-4 text-right pr-6 text-xs text-zinc-500 font-sans">
                    {formatDate(tx.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
