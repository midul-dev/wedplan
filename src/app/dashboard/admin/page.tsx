import React from "react";
import Link from "next/link";
import {
  Users,
  Store,
  Heart,
  FolderKanban,
  AlertCircle,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { AdminServicesTable } from "@/components/dashboard/AdminServicesTable";
import { MOCK_USERS, MOCK_SERVICES, MOCK_TRANSACTIONS } from "@/data/mockData";

export default function AdminOverviewPage() {
  const adminUser = MOCK_USERS[3];
  const vendors = MOCK_USERS.filter((u) => u.role === "vendor");
  const customers = MOCK_USERS.filter((u) => u.role === "customer");
  const pendingServices = MOCK_SERVICES.filter((s) => s.status === "pending");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <p className="text-xs font-medium text-rosewood">
            Platform administration
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
            Director overview — {adminUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Monitor platform metrics, curate pending artisan listings, and manage system users.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-botanical-sage border border-emerald-200/80 text-xs font-medium">
            <span className="size-1.5 rounded-full bg-botanical-sage" />
            System status: Healthy
          </span>
        </div>
      </div>

      {/* 6 StatCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Total Users"
          value={MOCK_USERS.length}
          description="Registered accounts"
          icon={Users}
        />
        <StatCard
          label="Vendors"
          value={vendors.length}
          description="1 Free, 1 Premium"
          icon={Store}
        />
        <StatCard
          label="Couples"
          value={customers.length}
          description="Planning clients"
          icon={Heart}
        />
        <StatCard
          label="Total Services"
          value={MOCK_SERVICES.length}
          description="Across 6 categories"
          icon={FolderKanban}
        />
        <StatCard
          label="Pending Queue"
          value={pendingServices.length}
          trend={{ value: "Action Required", isPositive: false }}
          description="Awaiting moderation"
          icon={AlertCircle}
        />
        <StatCard
          label="Transactions"
          value={MOCK_TRANSACTIONS.length}
          trend={{ value: "$539 USD", isPositive: true }}
          description="Stripe ledger"
          icon={Receipt}
        />
      </div>

      {/* Pending Services Moderation Queue */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-deep-ink tracking-tight">
              Service Moderation Queue
            </h2>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Review and approve pending wedding vendor package submissions
            </p>
          </div>
          <Link
            href="/dashboard/admin/services"
            className="inline-flex items-center gap-1 text-xs font-semibold text-rosewood hover:underline"
          >
            <span>Manage All Services ({MOCK_SERVICES.length})</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <AdminServicesTable initialStatusFilter="pending" limit={5} />
      </div>
    </div>
  );
}
