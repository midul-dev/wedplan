"use client";

import React, { useState } from "react";
import { Upload, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/data/mockData";
import type { UserProfile } from "@/types/wedding";

interface ProfileSettingsFormProps {
  user?: UserProfile;
}

export function ProfileSettingsForm({
  user = MOCK_USERS[0],
}: ProfileSettingsFormProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "+1 (555) 234-8901");
  const [location, setLocation] = useState(user.location || "San Francisco, CA");
  const [bio, setBio] = useState(user.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const [businessName, setBusinessName] = useState(user.businessName || "");
  const [isSaved, setIsSaved] = useState(false);

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    toast.success("Profile saved", {
      description: "Your account details and preferences were updated.",
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl bg-pure-alabaster border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {isSaved && (
        <div className="p-3.5 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>Profile preferences saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Avatar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-xl bg-soft-pearl/70 border border-zinc-200/80">
          <Avatar className="size-18 border-2 border-white shadow-xs">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="bg-rose-50 text-rosewood text-lg font-serif font-bold">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-deep-ink font-serif">
                Profile Photo
              </p>
              <p className="text-xs text-zinc-500">
                Recommended 400x400px. JPG, PNG or WebP.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white text-xs font-medium text-deep-ink hover:bg-zinc-50 cursor-pointer shadow-xs transition-colors">
              <Upload className="size-3.5 text-zinc-500" />
              <span>Change Avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* Editable Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Full Name
            </label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Email Address
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Phone Number
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              City / Location
            </label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>
        </div>

        {/* Optional Business Name (Visible for Vendors or Optional) */}
        {user.role === "vendor" && (
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Business / Studio Name
            </label>
            <Input
              type="text"
              placeholder="e.g. Velvet & Vine Botanical Florals"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>
        )}

        {/* Read-Only Account Specifications */}
        <div className="pt-4 border-t border-zinc-200/80 space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Account Specifications (Managed by Platform)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Account Role (Disabled) */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium text-zinc-500 flex items-center justify-between">
                <span>Assigned Role</span>
                <Lock className="size-3 text-zinc-400" />
              </label>
              <div className="relative">
                <Input
                  type="text"
                  disabled
                  value={user.role.toUpperCase()}
                  className="rounded-xl bg-zinc-100 border-zinc-200 h-10 text-xs font-semibold text-zinc-600 uppercase cursor-not-allowed"
                />
              </div>
            </div>

            {/* Subscription Plan (Disabled) */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium text-zinc-500 flex items-center justify-between">
                <span>Active Subscription Tier</span>
                <Lock className="size-3 text-zinc-400" />
              </label>
              <div className="relative">
                <Input
                  type="text"
                  disabled
                  value={
                    user.vendorTier === "premium"
                      ? "Premium Vendor Plan"
                      : "Standard Customer Tier"
                  }
                  className="rounded-xl bg-zinc-100 border-zinc-200 h-10 text-xs font-semibold text-zinc-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Rosewood CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            className="bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-6 text-sm font-medium transition-colors shadow-xs"
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
