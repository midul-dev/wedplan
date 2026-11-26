"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { SERVICE_CATEGORIES, type IUser } from "@/types/wedding";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  user?: IUser | null;
  onLogout?: () => void;
}

export function MobileNav({ user, onLogout }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const dashboardLink =
    user?.role === "vendor"
      ? "/dashboard/vendor"
      : user?.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-deep-ink hover:bg-zinc-100 rounded-xl"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[85vw] sm:max-w-md p-6 bg-pure-alabaster flex flex-col justify-between overflow-y-auto"
      >
        <div className="space-y-6">
          <SheetHeader className="p-0 border-b border-zinc-100 pb-4 text-left">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Logo size="sm" />
          </SheetHeader>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="py-3 px-3 text-base font-medium text-deep-ink hover:text-rosewood hover:bg-soft-pearl rounded-xl transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="py-3 px-3 text-base font-medium text-deep-ink hover:text-rosewood hover:bg-soft-pearl rounded-xl transition-colors"
            >
              Browse Services
            </Link>
          </nav>

          {/* Wedding Categories Quick Links */}
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="px-3 text-xs font-medium text-muted-foreground">
              Wedding categories
            </p>
            <div className="flex flex-col space-y-0.5">
              {SERVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/services?category=${encodeURIComponent(cat)}`}
                  onClick={() => setOpen(false)}
                  className="py-2 px-3 text-xs sm:text-sm text-zinc-600 hover:text-rosewood hover:bg-soft-pearl rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{cat}</span>
                  <ArrowRight className="size-3 text-zinc-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Auth / User Section */}
        <div className="pt-6 border-t border-zinc-200 mt-6 space-y-3">
          {user ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-soft-pearl border border-zinc-200/80">
                <p className="text-xs font-semibold text-deep-ink font-serif truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={dashboardLink}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-xl text-xs font-medium border-zinc-300 w-full"
                  )}
                >
                  <LayoutDashboard className="size-3.5 mr-1.5" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    onLogout?.();
                    setOpen(false);
                  }}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-xl text-xs font-medium text-rose-700 hover:bg-rose-50 w-full cursor-pointer"
                  )}
                >
                  <LogOut className="size-3.5 mr-1.5" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-xl h-10 border-zinc-300 text-deep-ink text-sm font-medium"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full rounded-xl h-10 bg-rosewood hover:bg-rosewood-hover text-white text-sm font-medium"
                )}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
