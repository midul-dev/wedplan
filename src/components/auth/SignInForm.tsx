"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/sonner";

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);

    try {
      await signIn.email(
        {
          email,
          password,
          rememberMe: false,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: (ctx) => {
            setLoading(false);
            const userName = (ctx.data as { user?: { name?: string; role?: string } })?.user?.name || "there";
            const userRole = (ctx.data as { user?: { name?: string; role?: string } })?.user?.role || "customer";

            toast.success(`Welcome back, ${userName}!`, {
              description: "Signed in successfully. Redirecting to your dashboard...",
            });

            if (userRole === "admin") {
              router.push("/dashboard/admin");
            } else if (userRole === "vendor") {
              router.push("/dashboard/vendor");
            } else {
              router.push("/dashboard/customer");
            }
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error?.message || "Invalid email or password", {
              description: "Please check your login details and try again.",
            });
          },
        }
      );
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error("Sign in failed", {
        description: message,
      });
    }
  };

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Email Address
          </label>
          <Input
            type="email"
            required
            placeholder="you@example.com"
            name="email"
            disabled={loading}
            className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood disabled:opacity-70"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-deep-ink">
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-rosewood hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              name="password"
              disabled={loading}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm pr-10 focus-visible:ring-rosewood/30 focus-visible:border-rosewood disabled:opacity-70"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-hidden disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Submit Rosewood CTA */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 text-sm font-medium transition-colors shadow-xs mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin shrink-0" />
              <span>Signing In...</span>
            </span>
          ) : (
            "Sign In"
          )}
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
        disabled={loading}
        className="w-full h-11 rounded-xl border-zinc-200 text-deep-ink hover:bg-zinc-50 font-medium text-sm flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Redirect to Sign Up */}
      <p className="text-center text-xs text-zinc-600 font-sans pt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-rosewood hover:underline transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
