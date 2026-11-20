import React from "react";
import { SubscriptionPlans } from "@/components/dashboard/SubscriptionPlans";

export const metadata = {
  title: "Subscription & Tiers — Vendor Studio",
  description: "Manage your studio subscription tier, unlock unlimited services, and view billing invoices.",
};

export default function VendorSubscriptionPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Studio Membership
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Subscription & Plans
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Unlock unlimited active service packages, priority directory rankings, and the Champagne Amber badge.
        </p>
      </div>

      <SubscriptionPlans />
    </div>
  );
}
