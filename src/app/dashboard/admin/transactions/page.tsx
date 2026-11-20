import React from "react";
import { AdminTransactionsTable } from "@/components/dashboard/AdminTransactionsTable";

export const metadata = {
  title: "Transactions Ledger — Admin Portal",
  description: "Immutable read-only ledger of all platform subscription transactions and Stripe payouts.",
};

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Financial Records
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Subscription Transactions Ledger
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Read-only record of all recurring Stripe vendor membership payments, invoice IDs, and timestamps.
        </p>
      </div>

      <AdminTransactionsTable />
    </div>
  );
}
