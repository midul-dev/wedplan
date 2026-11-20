import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MOCK_USERS } from "@/data/mockData";

export const metadata = {
  title: "Admin Portal — WedPlan",
  description: "Platform administration, directory curation, user moderation, and financial ledgers.",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell user={MOCK_USERS[3]}>{children}</DashboardShell>;
}
