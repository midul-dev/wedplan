import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MOCK_USERS } from "@/data/mockData";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Customer Dashboard — WedPlan",
  description: "Manage your wedding bookings, artisan inquiries, and profile settings.",
};

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const session = await auth.api.getSession({
    headers: await headers() 
})

const user = session?.user

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
