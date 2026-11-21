"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle2, AlertCircle, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IUser } from "@/types/wedding";
import { authClient } from "@/lib/auth-client";

interface ProfileSettingsFormProps {
  user?: IUser;
}

export function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar || (user?.image as string) || "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getInitials = (n: string) => {
    if (!n) return "U";
    return n
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setIsSaved(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      await authClient.updateUser(
        {
          name,
          image: avatarUrl || undefined,
        },
        {
          onSuccess: () => {
            setIsSaving(false);
            setIsSaved(true);
            toast.success("Profile saved successfully", {
              description: "Your account details and preferences were updated.",
            });
            router.refresh();
            setIsSaved(false);
          },
          onError: (ctx) => {
            setIsSaving(false);
            const err = ctx.error?.message || "Failed to update profile";
            setErrorMessage(err);
            toast.error("Profile update failed", {
              description: err,
            });
          },
        },
      );
    } catch (err: unknown) {
      setIsSaving(false);
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong while saving your profile";
      setErrorMessage(msg);
      toast.error("Profile update failed", {
        description: msg,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload an image smaller than 2MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl bg-pure-alabaster border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {isSaved && (
        <div className="p-3.5 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>Profile preferences saved successfully.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Profile Avatar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-xl bg-soft-pearl/70 border border-zinc-200/80">
          <Avatar className="size-18 border-2 border-white shadow-xs">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={user?.name || ""} />}
            <AvatarFallback className="bg-rose-50 text-rosewood text-lg font-serif font-bold">
              {getInitials(user?.name || "")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-deep-ink font-serif">
                Profile Photo
              </p>
              <p className="text-xs text-zinc-500">
                Recommended 400x400px. JPG, PNG or WebP (max 2MB).
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
              name="name"
              required
              defaultValue={user?.name || ""}
              disabled={isSaving}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink flex items-center justify-between">
              <span>Email Address</span>
              <Lock className="size-3 text-zinc-400" />
            </label>
            <Input
              type="email"
              disabled
              value={user?.email || ""}
              className="rounded-xl bg-zinc-100 border-zinc-200 h-10 text-sm text-zinc-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Optional Business Name (Visible for Vendors or Optional) */}
        {user?.role === "vendor" && (
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Business / Studio Name
            </label>
            <Input
              type="text"
              name="businessName"
              placeholder="e.g. Velvet & Vine Botanical Florals"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={isSaving}
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
                  value={(user?.role || "customer").toUpperCase()}
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
                    user?.vendorTier === "premium"
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
            disabled={isSaving}
            className="bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 px-6 text-sm font-medium transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin shrink-0" />
                Saving Changes...
              </span>
            ) : (
              "Save Profile Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
