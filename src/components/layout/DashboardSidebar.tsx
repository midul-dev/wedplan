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
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toast } from "@/components/ui/sonner";
import { MOCK_USERS } from "@/data/mockData";
import { type UserProfile, type IUser } from "@/types/wedding";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";

interface DashboardSidebarProps {
  user?: IUser;
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

  const effectiveUser = user;

  const role: "customer" | "vendor" | "admin" = isVendorRoute
    ? "vendor"
    : isAdminRoute
    ? "admin"
    : effectiveUser?.role === "vendor" || effectiveUser?.role === "admin"
    ? (effectiveUser.role as "vendor" | "admin")
    : "customer";

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
        "w-64 shrink-0 bg-soft-pearl border-r border-border min-h-screen flex flex-col justify-between p-4 font-sans select-none",
        className
      )}
    >
      <div className="space-y-6">
        {/* Brand Logo & Back link */}
        <div className="px-2 pt-2">
          <Logo size="sm" />
        </div>

        {/* User Identity Header */}
        <div className="p-3 bg-pure-alabaster border border-border rounded-xl space-y-2.5">
          {effectiveUser ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar className="size-9 border border-border">
                  {(effectiveUser.avatar || effectiveUser.image) && (
                    <AvatarImage
                      src={(effectiveUser.avatar || effectiveUser.image) as string}
                      alt={effectiveUser.name}
                    />
                  )}
                  <AvatarFallback className="bg-rose-50 text-rosewood text-xs font-serif font-medium">
                    {getInitials(effectiveUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-deep-ink font-serif truncate">
                    {effectiveUser.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{effectiveUser.email}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <StatusBadge
                  status={effectiveUser.role}
                  showDot={false}
                  className="text-[11px] py-0 px-2 font-medium capitalize"
                />
                {effectiveUser.vendorTier === "premium" && (
                  <span className="text-[11px] text-champagne-amber font-medium">
                    Premium
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
              </div>
              <div className="pt-1 border-t border-border flex justify-between">
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          )}
        </div>

        {/* Primary Role-Based Nav Links */}
        <div className="space-y-2">
          <p className="px-2.5 text-xs font-medium text-muted-foreground">
            {navConfig.title}
          </p>
          <nav className="space-y-0.5">
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
                    "flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[13px] transition-colors",
                    isActive
                      ? "bg-pure-alabaster text-deep-ink font-medium border border-border"
                      : "text-muted-foreground hover:text-deep-ink hover:bg-accent/60"
                  )}
                >
                  <Icon
                    strokeWidth={1.5}
                    className={cn(
                      "size-4 shrink-0",
                      isActive ? "text-rosewood" : "text-muted-foreground"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Public Shortcuts */}
        <div className="space-y-2 pt-3 border-t border-border">
          <p className="px-2.5 text-xs font-medium text-muted-foreground">
            Public directory
          </p>
          <nav className="space-y-0.5">
            <Link
              href="/services"
              onClick={onCloseMobile}
              className="flex items-center gap-2.5 px-2.5 h-9 text-[13px] text-muted-foreground hover:text-deep-ink hover:bg-accent/60 rounded-lg transition-colors"
            >
              <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <span>Browse Services</span>
            </Link>
            <Link
              href="/"
              onClick={onCloseMobile}
              className="flex items-center gap-2.5 px-2.5 h-9 text-[13px] text-muted-foreground hover:text-deep-ink hover:bg-accent/60 rounded-lg transition-colors"
            >
              <ArrowLeft className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <span>Back to Home</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Sign Out Action */}
      <div className="pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full flex items-center gap-2.5 px-2.5 h-9 text-[13px] font-medium text-rose-700 hover:bg-rose-50/70 rounded-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSigningOut ? (
            <Loader2 className="size-4 animate-spin text-rose-700 shrink-0" strokeWidth={1.5} />
          ) : (
            <LogOut className="size-4 shrink-0" strokeWidth={1.5} />
          )}
          <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
        </button>
      </div>
    </aside>
  );
}
