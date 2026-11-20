import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Checkout Cancelled — WedPlan",
  description: "Your checkout session was cancelled. No charges were incurred.",
};

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] bg-soft-pearl py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-pure-alabaster border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-center sm:text-left">
          {/* Top Status Icon & Heading */}
          <div className="text-center space-y-4">
            <div className="mx-auto inline-flex size-16 sm:size-18 items-center justify-center rounded-full bg-amber-50 text-champagne-amber ring-8 ring-amber-50/60 shadow-xs">
              <AlertCircle className="size-9 stroke-[2.2] text-champagne-amber" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-champagne-amber text-xs font-semibold tracking-wide">
                <span>Checkout Incomplete</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-deep-ink tracking-tight">
                No Payment Was Deducted
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 font-sans max-w-md mx-auto leading-relaxed">
                Your checkout session was cancelled before completion. No funds were charged to your payment method, and your current tier remains unchanged.
              </p>
            </div>
          </div>

          {/* Calm explanation box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-soft-pearl/80 border border-zinc-200/80 space-y-3.5 text-left text-xs">
            <div className="flex items-center gap-2 text-deep-ink font-semibold">
              <ShieldCheck className="size-4 text-champagne-amber" />
              <span>What this means for your vendor account</span>
            </div>

            <ul className="space-y-2 text-zinc-600 list-disc list-inside">
              <li>
                <strong className="text-zinc-800">Your account is safe:</strong> You remain active on your current Free Vendor Plan with up to 3 services.
              </li>
              <li>
                <strong className="text-zinc-800">No hidden fees:</strong> Zero authorization holds or charges have been applied to your card.
              </li>
              <li>
                <strong className="text-zinc-800">Existing bookings intact:</strong> All current client inquiries and active listings continue uninterrupted.
              </li>
              <li>
                <strong className="text-zinc-800">Upgrade whenever you are ready:</strong> You can return and activate Premium benefits at any time.
              </li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-zinc-100">
            <Link
              href="/dashboard/vendor/subscription"
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex-1 bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 text-xs sm:text-sm font-medium shadow-xs"
              )}
            >
              <ArrowLeft className="size-4 mr-2" />
              Return to Subscription Plans
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

          {/* Support Reassurance */}
          <div className="text-center pt-1">
            <p className="text-[11px] text-zinc-500 inline-flex items-center gap-1.5">
              <HelpCircle className="size-3.5 text-zinc-400" />
              <span>
                Need assistance with payment methods or invoices?{" "}
                <Link href="/dashboard/vendor" className="text-rosewood hover:underline font-medium">
                  Contact Support
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
