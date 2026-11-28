import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MOCK_USERS } from "@/data/mockData";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { IUser } from "@/types/wedding";

export const metadata = {
  title: "Admin Portal — WedPlan",
  description: "Platform administration, directory curation, user moderation, and financial ledgers.",
};

export default async function AdminDashboardLayout({
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
