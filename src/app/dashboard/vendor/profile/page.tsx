import React from "react";
import { ProfileSettingsForm } from "@/components/dashboard/ProfileSettingsForm";
import { MOCK_USERS } from "@/data/mockData";

export const metadata = {
  title: "Studio Profile Settings — WedPlan",
  description: "Manage your business name, contact information, and public artisan profile.",
};

export default function VendorProfilePage() {
  const vendorUser = MOCK_USERS[1]; // Marcus Thorne (Vendor with business name)

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-zinc-200 space-y-1">
        <p className="text-xs uppercase tracking-wider font-semibold text-rosewood">
          Studio Identity
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
          Studio Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 font-sans">
          Update your public studio branding, business title, and concierge contact channels.
        </p>
      </div>

      <ProfileSettingsForm user={vendorUser} />
    </div>
  );
}
