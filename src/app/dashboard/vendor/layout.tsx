import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { IUser } from "@/types/wedding";

export const metadata = {
  title: "Vendor Studio — WedPlan",
  description: "Manage wedding service listings, booking requests, and studio preferences.",
};

export default async function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user: IUser = {
    ...session.user,
    role: session.user.role as IUser["role"],
    avatar: session.user.image || undefined,
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
