"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck2,
  User,
  Search,
  ArrowLeft,
  LogOut,
  Sparkles,
  Store,
  PlusCircle,
  CreditCard,
  Users,
  FolderKanban,
  Receipt,
  Loader2,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toast } from "@/components/ui/sonner";
import { MOCK_USERS } from "@/data/mockData";
import { type UserProfile } from "@/types/wedding";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";

interface DashboardSidebarProps {
  user?: UserProfile;
  onCloseMobile?: () => void;
  className?: string;
}

export function DashboardSidebar({
  user,
  onCloseMobile,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Infer effective role from pathname or user prop
  const isVendorRoute = pathname.startsWith("/dashboard/vendor");
  const isAdminRoute = pathname.startsWith("/dashboard/admin");

  const effectiveUser =
    user ||
    (isVendorRoute
      ? MOCK_USERS[1] // Marcus Thorne (Vendor)
      : isAdminRoute
      ? MOCK_USERS[3] // Seraphina Locke (Admin)
      : MOCK_USERS[0]); // Eleanor Vance (Customer)

  const role = isVendorRoute
    ? "vendor"
    : isAdminRoute
    ? "admin"
    : effectiveUser.role || "customer";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Role-based Nav Configuration
  const navConfig = {
    customer: {
      title: "Customer Menu",
      items: [
        { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard, exact: true },
        { label: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarCheck2, exact: false },
        { label: "Profile Settings", href: "/dashboard/customer/profile", icon: User, exact: false },
      ],
    },
    vendor: {
      title: "Vendor Studio",
      items: [
        { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard, exact: true },
        { label: "My Services", href: "/dashboard/vendor/services", icon: Store, exact: false },
        { label: "Add Service", href: "/dashboard/vendor/add-service", icon: PlusCircle, exact: false },
        { label: "Booking Requests", href: "/dashboard/vendor/bookings", icon: CalendarCheck2, exact: false },
        { label: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard, exact: false },
        { label: "Profile Settings", href: "/dashboard/vendor/profile", icon: User, exact: false },
      ],
    },
    admin: {
      title: "Administration",
      items: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
        { label: "Manage Users", href: "/dashboard/admin/users", icon: Users, exact: false },
        { label: "Manage Services", href: "/dashboard/admin/services", icon: FolderKanban, exact: false },
        { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt, exact: false },
      ],
    },
  }[role];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully", {
              description: "You have been logged out of your session.",
            });
            if (onCloseMobile) onCloseMobile();
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx) => {
            setIsSigningOut(false);
            toast.error(ctx.error?.message || "Failed to sign out", {
              description: "Please try again.",
            });
          },
        },
      });
    } catch (err: unknown) {
      setIsSigningOut(false);
      const message =
        err instanceof Error ? err.message : "Something went wrong while signing out.";
      toast.error("Sign out failed", { description: message });
    }
  };

  return (
    <aside
      className={cn(
        "w-60 shrink-0 bg-soft-pearl border-r border-zinc-200 min-h-screen flex flex-col justify-between p-4 font-sans select-none",
        className
      )}
    >
      <div className="space-y-6">
        {/* Brand Logo & Back link */}
        <div className="px-2 pt-2">
          <Logo size="sm" />
        </div>

        {/* User Identity Header */}
        <div className="p-3 bg-pure-alabaster border border-zinc-200 rounded-xl space-y-2.5">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-zinc-200">
              {effectiveUser.avatar && (
                <AvatarImage src={effectiveUser.avatar} alt={effectiveUser.name} />
              )}
              <AvatarFallback className="bg-rose-50 text-rosewood text-xs font-serif font-bold">
                {getInitials(effectiveUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-deep-ink font-serif truncate">
                {effectiveUser.name}
              </p>
              <p className="text-[11px] text-zinc-500 truncate">{effectiveUser.email}</p>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between border-t border-zinc-100">
            <StatusBadge
              status={effectiveUser.role}
              showDot={false}
              className="text-[10px] py-0 px-2 uppercase font-semibold"
            />
            {effectiveUser.vendorTier === "premium" && (
              <span className="inline-flex items-center gap-1 text-[10px] text-champagne-amber font-semibold">
                <Sparkles className="size-2.5" />
                Premium
              </span>
            )}
          </div>
        </div>

        {/* Primary Role-Based Nav Links */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
            {navConfig.title}
          </p>
          <nav className="space-y-1 pt-1">
            {navConfig.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors",
                    isActive
                      ? "bg-rose-50/80 text-rosewood font-semibold border border-rose-200/80"
                      : "text-zinc-600 hover:text-deep-ink hover:bg-zinc-200/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      isActive ? "text-rosewood" : "text-zinc-400"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Public Shortcuts */}
        <div className="space-y-1 pt-2 border-t border-zinc-200">
          <p className="px-3 text-[11px] uppercase tracking-wider font-semibold text-zinc-400">
            Public Platform
          </p>
          <nav className="space-y-1 pt-1">
            <Link
              href="/services"
              onClick={onCloseMobile}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-zinc-600 hover:text-deep-ink hover:bg-zinc-200/50 rounded-xl transition-colors"
            >
              <Search className="size-4 shrink-0 text-zinc-400" />
              <span>Browse Services</span>
            </Link>
            <Link
              href="/"
              onClick={onCloseMobile}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-zinc-600 hover:text-deep-ink hover:bg-zinc-200/50 rounded-xl transition-colors"
            >
              <ArrowLeft className="size-4 shrink-0 text-zinc-400" />
              <span>Back to Home</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Sign Out Action */}
      <div className="pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSigningOut ? (
            <Loader2 className="size-4 animate-spin text-rose-700 shrink-0" />
          ) : (
            <LogOut className="size-4 shrink-0" />
          )}
          <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
