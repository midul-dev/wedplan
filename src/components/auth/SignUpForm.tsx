"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Upload, User, Store, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignUpForm() {
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pure presentational UI: no auth API logic
  };

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Role Selector (Customer vs Vendor Only) */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            I want to join WedPlan as:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Customer Pill */}
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer focus:outline-hidden",
                role === "customer"
                  ? "border-rosewood bg-rose-50/50 text-rosewood font-medium shadow-xs ring-1 ring-rosewood"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              )}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <User className="size-3.5" />
                <span className="text-xs font-semibold">Customer / Couple</span>
              </div>
              <span className="text-[10px] text-zinc-500">
                Plan & book services
              </span>
            </button>

            {/* Vendor Pill */}
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer focus:outline-hidden",
                role === "vendor"
                  ? "border-rosewood bg-rose-50/50 text-rosewood font-medium shadow-xs ring-1 ring-rosewood"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              )}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <Store className="size-3.5" />
                <span className="text-xs font-semibold">Wedding Vendor</span>
              </div>
              <span className="text-[10px] text-zinc-500">
                List services & receive bookings
              </span>
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Full Name
          </label>
          <Input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Email Address
          </label>
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm pr-10 focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-hidden"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {/* Subtle Helper Text */}
          <p className="text-[11px] text-zinc-500 font-sans">
            Min 6 characters, 1 uppercase, 1 lowercase
          </p>
        </div>

        {/* Optional Profile Image Dropzone UI */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink flex items-center justify-between">
            <span>Profile Photo</span>
            <span className="text-zinc-400 font-normal">Optional</span>
          </label>
          <label className="relative flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-zinc-200 rounded-xl bg-soft-pearl/40 hover:bg-soft-pearl/70 transition-colors cursor-pointer text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            {fileName ? (
              <div className="flex items-center gap-2 text-xs text-botanical-sage font-medium">
                <Check className="size-3.5" />
                <span className="truncate max-w-[200px]">{fileName}</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-center size-8 mx-auto rounded-lg bg-white border border-zinc-200 text-zinc-400">
                  <Upload className="size-3.5" />
                </div>
                <p className="text-xs text-zinc-600 font-medium">
                  Click or drag to upload avatar
                </p>
                <p className="text-[10px] text-zinc-400">
                  PNG, JPG or WEBP up to 5MB
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Submit Rosewood CTA */}
        <Button
          type="submit"
          className="w-full bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 text-sm font-medium transition-colors shadow-xs mt-2"
        >
          Create Account
        </Button>
      </form>

      {/* Subtle Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-pure-alabaster px-3 text-zinc-400 font-medium">
            or continue with
          </span>
        </div>
      </div>

      {/* Google Sign In Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 rounded-xl border-zinc-200 text-deep-ink hover:bg-zinc-50 font-medium text-sm flex items-center justify-center gap-2.5"
      >
        <svg className="size-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>

      {/* Redirect to Sign In */}
      <p className="text-center text-xs text-zinc-600 font-sans pt-1">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-rosewood hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
