import React from "react";
import { ProfileSettingsForm } from "@/components/dashboard/ProfileSettingsForm";
import { MOCK_USERS } from "@/data/mockData";

export const metadata = {
  title: "Profile Settings — WedPlan",
  description: "Update your personal information and contact preferences.",
};

export default function CustomerProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Account Preferences
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Manage your personal details, celebration location, and contact information.
        </p>
      </div>

      {/* Form */}
      <ProfileSettingsForm user={MOCK_USERS[0]} />
    </div>
  );
}
