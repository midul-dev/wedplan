import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MOCK_USERS } from "@/data/mockData";

export const metadata = {
  title: "Vendor Studio — WedPlan",
  description: "Manage wedding service listings, booking requests, and studio preferences.",
};

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell user={MOCK_USERS[1]}>{children}</DashboardShell>;
}
