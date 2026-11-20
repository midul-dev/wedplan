import React from "react";
import { AdminUsersTable } from "@/components/dashboard/AdminUsersTable";

export const metadata = {
  title: "Manage Users — Admin Portal",
  description: "View, filter, and moderate platform customer, vendor, and administrator accounts.",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          User Moderation
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Platform User Accounts
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Manage registered couples, verified wedding vendors, and staff administrator permissions.
        </p>
      </div>

      <AdminUsersTable />
    </div>
  );
}
