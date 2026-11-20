"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, CreditCard, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MOCK_TRANSACTIONS } from "@/data/mockData";

export function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [showSimulatedSuccess, setShowSimulatedSuccess] = useState(false);

  const handleUpgrade = () => {
    setShowSimulatedSuccess(true);
    toast.success("Simulated Stripe Checkout initialized!", {
      description: "In production, this redirects to Stripe Checkout with your billing interval.",
    });
    setTimeout(() => setShowSimulatedSuccess(false), 5000);
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {showSimulatedSuccess && (
        <div className="p-4 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-2xl text-xs flex items-center gap-2.5">
          <CheckCircle2 className="size-4.5 shrink-0" />
          <span>
            Simulated Stripe Checkout complete! Your vendor profile now features the Premium Vendor Badge and unlimited service listings.
          </span>
        </div>
      )}

      {/* Header & Billing Cycle Toggle */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-deep-ink tracking-tight">
              Vendor Subscription Tiers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-0.5">
              Scale your wedding business with verified trust badges and unlimited service listings.
            </p>
          </div>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-soft-pearl border border-zinc-200 self-center sm:self-auto">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-deep-ink shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-deep-ink"
              }`}
            >
              Monthly ($49/mo)
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-white text-deep-ink shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-deep-ink"
              }`}
            >
              <span>Annual ($490/yr)</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-botanical-sage text-[10px] font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Side-by-Side Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* FREE PLAN */}
        <div className="flex flex-col justify-between p-6 sm:p-8 bg-pure-alabaster border border-zinc-200 rounded-2xl shadow-xs space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Starter Tier
              </span>
              <h3 className="font-serif text-2xl font-semibold text-deep-ink">
                Free Vendor Plan
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Ideal for emerging wedding artisans getting started on WedPlan.
              </p>
            </div>

            <div className="pt-2 flex items-baseline gap-1">
              <span className="font-serif text-4xl font-bold text-deep-ink">$0</span>
              <span className="text-xs text-zinc-500">/ forever</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-zinc-100 text-xs text-zinc-700">
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-zinc-400 shrink-0" />
                <span>Max <strong>3 Active Services</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-zinc-400 shrink-0" />
                <span>Basic Inquiry & Booking Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-zinc-400 shrink-0" />
                <span>Standard Directory Placement</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-zinc-400 shrink-0" />
                <span>Direct Client Email Correspondence</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              disabled
              className="w-full rounded-xl h-11 border-zinc-200 text-zinc-400 font-medium text-xs sm:text-sm bg-zinc-50 cursor-not-allowed"
            >
              Current Active Tier
            </Button>
          </div>
        </div>

        {/* PREMIUM PLAN */}
        <div className="relative flex flex-col justify-between p-6 sm:p-8 bg-pure-alabaster border-2 border-champagne-amber/70 rounded-2xl shadow-md space-y-6">
          {/* Top Recommendation Badge */}
          <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-amber text-white text-[11px] font-semibold tracking-wide shadow-xs">
            <Sparkles className="size-3" />
            <span>Recommended for Dedicated Studios</span>
          </div>

          <div className="space-y-4 pt-1">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-champagne-amber">
                Pro & Studio Tier
              </span>
              <h3 className="font-serif text-2xl font-semibold text-deep-ink">
                Premium Vendor Plan
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                Built for established venues, studios, and high-demand artisans.
              </p>
            </div>

            <div className="pt-2 flex items-baseline gap-1">
              <span className="font-serif text-4xl font-bold text-rosewood">
                {billingCycle === "annual" ? "$490" : "$49"}
              </span>
              <span className="text-xs text-zinc-500 font-sans">
                /{billingCycle === "annual" ? "year" : "month"}
              </span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-zinc-100 text-xs text-zinc-700">
              <li className="flex items-center gap-2.5 font-medium text-deep-ink">
                <div className="flex size-4 items-center justify-center rounded-full bg-amber-100 text-champagne-amber shrink-0">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span><strong>Unlimited Active Services</strong> & Packages</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium text-deep-ink">
                <div className="flex size-4 items-center justify-center rounded-full bg-amber-100 text-champagne-amber shrink-0">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span><strong>Champagne Amber Premium Vendor Badge</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-champagne-amber shrink-0" />
                <span>Priority Placement in Search & Category Grids</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-champagne-amber shrink-0" />
                <span>Featured on Homepage Curated Portfolio</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="size-4 text-champagne-amber shrink-0" />
                <span>All Free Features Included</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              onClick={handleUpgrade}
              className="w-full bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
            >
              <CreditCard className="size-4 mr-2" />
              Upgrade to Premium ({billingCycle === "annual" ? "$490/yr" : "$49/mo"})
            </Button>
            <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-zinc-500">
              <span>Preview return pages:</span>
              <Link
                href="/payment-success"
                className="text-botanical-sage hover:underline font-medium inline-flex items-center gap-1"
              >
                Success <ExternalLink className="size-3" />
              </Link>
              <span className="text-zinc-300">•</span>
              <Link
                href="/payment-cancel"
                className="text-champagne-amber hover:underline font-medium inline-flex items-center gap-1"
              >
                Cancel <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Transaction Ledger Preview */}
      <div className="space-y-4 pt-6 border-t border-zinc-200">
        <div>
          <h3 className="font-serif text-xl font-semibold text-deep-ink">
            Subscription & Billing Ledger
          </h3>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            Historical Stripe subscription payments and invoice receipts.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
          <Table>
            <TableHeader className="bg-soft-pearl/80">
              <TableRow className="border-b border-zinc-200 hover:bg-transparent">
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                  Transaction ID
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Plan Description
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Billing Cycle
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                  Next Renewal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-b border-zinc-100 hover:bg-soft-pearl/30 text-xs"
                >
                  <TableCell className="py-3 pl-6 font-mono text-zinc-600">
                    {tx.id}
                  </TableCell>
                  <TableCell className="py-3 font-medium text-deep-ink capitalize">
                    {tx.plan.replace("_", " ")}
                  </TableCell>
                  <TableCell className="py-3 font-semibold text-deep-ink">
                    ${tx.amount} {tx.currency.toUpperCase()}
                  </TableCell>
                  <TableCell className="py-3 text-zinc-600 capitalize">
                    {tx.billingInterval}
                  </TableCell>
                  <TableCell className="py-3">
                    <StatusBadge status={tx.status} />
                  </TableCell>
                  <TableCell className="py-3 text-right pr-6 text-zinc-500">
                    {tx.nextBillingDate ? tx.nextBillingDate.slice(0, 10) : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
