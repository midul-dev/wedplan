import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Plus, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Payment Confirmed — WedPlan",
  description: "Your Premium Vendor subscription is confirmed and activated.",
};

export default function PaymentSuccessPage() {
  const benefits = [
    {
      title: "Unlimited Service Listings",
      desc: "Publish your entire wedding portfolio without 3-service limits.",
    },
    {
      title: "Verified Premium Vendor Badge",
      desc: "Gain instant couple trust with the Champagne Amber trust mark.",
    },
    {
      title: "Priority Directory Placement",
      desc: "Rank higher across category grids and search results.",
    },
    {
      title: "Direct Client Leads",
      desc: "Receive client bookings with comprehensive inquiries and dates.",
    },
  ];

  return (
    <div className="min-h-[80vh] bg-soft-pearl py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-pure-alabaster border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-center sm:text-left">
          {/* Top Status Icon & Heading */}
          <div className="text-center space-y-4">
            <div className="mx-auto inline-flex size-16 sm:size-18 items-center justify-center rounded-full bg-emerald-50 text-botanical-sage ring-8 ring-emerald-50/60 shadow-xs">
              <CheckCircle2 className="size-9 stroke-[2.2] text-botanical-sage" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-botanical-sage text-xs font-semibold tracking-wide">
                <ShieldCheck className="size-3.5" />
                <span>Stripe Verified Transaction</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-deep-ink tracking-tight">
                Payment Confirmed & Premium Activated
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans max-w-md mx-auto leading-relaxed">
                Thank you for elevating your studio. Your payment was processed safely and your Premium Vendor privileges are now live across the platform.
              </p>
            </div>
          </div>

          {/* Transaction Metadata Receipt Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-soft-pearl/80 border border-zinc-200/80 space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2.5">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Receipt Overview
              </span>
              <StatusBadge status="paid" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block">Plan Upgraded</span>
                <span className="font-semibold text-deep-ink">Premium Vendor (Annual)</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Amount Processed</span>
                <span className="font-semibold text-deep-ink">$490.00 USD</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Stripe Session ID</span>
                <span className="font-mono text-zinc-700 text-[11px]">cs_live_wed_8813a7</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Billing Interval</span>
                <span className="font-medium text-deep-ink">Renews annually (Cancel anytime)</span>
              </div>
            </div>
          </div>

          {/* Unlocked Benefits */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-champagne-amber" />
              <h2 className="font-serif text-lg font-semibold text-deep-ink">
                Premium Vendor Privileges Unlocked
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-3.5 rounded-xl border border-zinc-200 bg-white space-y-1 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-4 items-center justify-center rounded-full bg-emerald-100 text-botanical-sage text-[10px] font-bold shrink-0">
                      ✓
                    </span>
                    <h3 className="font-semibold text-xs text-deep-ink">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-zinc-500 pl-6 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-zinc-100">
            <Link
              href="/dashboard/vendor/add-service"
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex-1 bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 text-xs sm:text-sm font-medium shadow-xs"
              )}
            >
              <Plus className="size-4 mr-2" />
              Add a New Service
            </Link>

            <Link
              href="/dashboard/vendor"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 border-zinc-300 hover:bg-soft-pearl text-deep-ink rounded-xl h-11 text-xs sm:text-sm font-medium"
              )}
            >
              Go to Dashboard
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </div>

          {/* Security reassurance */}
          <p className="text-[11px] text-center text-zinc-500 flex items-center justify-center gap-1.5 pt-1">
            <FileText className="size-3.5 text-zinc-400" />
            <span>A PDF tax invoice and receipt have been dispatched to your email address.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
