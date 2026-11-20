"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck2,
  User,
  Search,
  ArrowLeft,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MOCK_USERS } from "@/data/mockData";
import { type UserProfile } from "@/types/wedding";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  user?: UserProfile;
  onCloseMobile?: () => void;
  className?: string;
}

export function DashboardSidebar({
  user = MOCK_USERS[0],
  onCloseMobile,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const customerNavItems = [
    {
      label: "Overview",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "My Bookings",
      href: "/dashboard/customer/bookings",
      icon: CalendarCheck2,
      exact: false,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/customer/profile",
      icon: User,
      exact: false,
    },
  ];

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
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="bg-rose-50 text-rosewood text-xs font-serif font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-deep-ink font-serif truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between border-t border-zinc-100">
            <StatusBadge
              status={user.role}
              showDot={false}
              className="text-[10px] py-0 px-2 uppercase font-semibold"
            />
            {user.vendorTier === "premium" && (
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
            Customer Menu
          </p>
          <nav className="space-y-1 pt-1">
            {customerNavItems.map((item) => {
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
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
