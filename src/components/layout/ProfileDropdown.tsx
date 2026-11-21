"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, User, LogOut, ChevronDown, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toast } from "@/components/ui/sonner";
import { signOut } from "@/lib/auth-client";
import type { IUser } from "@/types/wedding";

interface ProfileDropdownProps {
  user: IUser;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully", {
              description: "You have been logged out of your session.",
            });
            router.push("/sign-in");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message || "Failed to sign out");
          },
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign out";
      toast.error("Sign out failed", { description: message });
    }
  };
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Determine dashboard link according to role
  const dashboardLink =
    user.role === "vendor"
      ? "/dashboard/vendor"
      : user.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer";

  const profileLink =
    user.role === "vendor"
      ? "/dashboard/vendor/profile"
      : user.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 p-1 rounded-full hover:bg-zinc-100 transition-colors focus:outline-hidden cursor-pointer">
        <Avatar className="size-9 border border-zinc-200">
          {(user.avatar || user.image) && (
            <AvatarImage
              src={(user.avatar || user.image) as string}
              alt={user.name}
            />
          )}
          <AvatarFallback className="bg-rose-50 text-rosewood text-xs font-semibold font-serif">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-deep-ink leading-tight">
            {user.name}
          </span>
          <span className="text-[10px] text-zinc-500 capitalize">
            {user.role}
          </span>
        </div>
        <ChevronDown className="size-3.5 text-zinc-400 hidden sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 p-2 bg-pure-alabaster border border-zinc-200 rounded-xl shadow-lg"
      >
        {/* User Identity Header */}
        <div className="px-2 py-1.5 space-y-1">
          <p className="text-sm font-semibold text-deep-ink font-serif truncate">
            {user.name}
          </p>
          <p className="text-xs text-zinc-500 truncate font-sans">{user.email}</p>
          <div className="pt-1 flex items-center gap-1.5">
            <StatusBadge
              status={user.role}
              showDot={false}
              className="text-[10px] py-0 px-2 uppercase font-semibold"
            />
            {user.vendorTier === "premium" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-amber-50 text-champagne-amber border border-amber-200/80">
                <Sparkles className="size-2.5" />
                Premium
              </span>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="my-1.5 bg-zinc-100" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href={dashboardLink} />}
            className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-deep-ink rounded-lg hover:bg-soft-pearl cursor-pointer"
          >
            <LayoutDashboard className="size-4 text-zinc-500" />
            <span>Dashboard Overview</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href={profileLink} />}
            className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-deep-ink rounded-lg hover:bg-soft-pearl cursor-pointer"
          >
            <User className="size-4 text-zinc-500" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1.5 bg-zinc-100" />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer focus:bg-rose-50 focus:text-rose-700"
        >
          <LogOut className="size-4 text-rose-600" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
