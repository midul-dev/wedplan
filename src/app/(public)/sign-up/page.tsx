import React from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Create Account — WedPlan Wedding Platform",
  description: "Join WedPlan to connect with premier wedding vendors and curate your celebration.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create Your Account"
      subtitle="Join WedPlan to discover premier wedding artisans or manage your wedding services."
    >
      <SignUpForm />
    </AuthShell>
  );
}
