import React from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In — WedPlan Wedding Platform",
  description: "Sign in to manage your wedding plans, vendor bookings, and client requests.",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to your WedPlan account to manage your celebration details and vendor bookings."
    >
      <SignInForm />
    </AuthShell>
  );
}
