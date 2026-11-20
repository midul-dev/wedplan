import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MOCK_USERS } from "@/data/mockData";

export const metadata = {
  title: "Customer Dashboard — WedPlan",
  description: "Manage your wedding bookings, artisan inquiries, and profile settings.",
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell user={MOCK_USERS[0]}>{children}</DashboardShell>;
}
