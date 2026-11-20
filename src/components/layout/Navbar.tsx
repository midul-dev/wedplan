"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { MobileNav } from "@/components/layout/MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_USERS } from "@/data/mockData";
import { type UserProfile } from "@/types/wedding";
import { cn } from "@/lib/utils";

interface NavbarProps {
  /**
   * Static preview prop: pass boolean or UserProfile to toggle between
   * unauthenticated and authenticated states without real backend auth.
   */
  mockUser?: boolean | UserProfile | null;
}

export function Navbar({ mockUser = false }: NavbarProps) {
  const pathname = usePathname();

  // Resolve initial preview user
  const initialUser: UserProfile | null =
    typeof mockUser === "object"
      ? mockUser
      : mockUser === true
      ? MOCK_USERS[0]
      : null;

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Services", href: "/services" },
  ];

  const togglePreviewUser = () => {
    setCurrentUser((prev) => (prev ? null : MOCK_USERS[0]));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Logo size="md" />

          {/* Optional Dev / Demo State Switcher Pill */}
          <button
            type="button"
            onClick={togglePreviewUser}
            className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border border-zinc-200 transition-colors cursor-pointer select-none"
            title="Click to toggle between Guest and Authenticated Navbar UI preview"
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                currentUser ? "bg-botanical-sage" : "bg-zinc-400"
              )}
            />
            <span>Preview: {currentUser ? "Logged In" : "Guest"}</span>
          </button>
        </div>

        {/* Center: Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rosewood",
                  isActive ? "text-deep-ink font-semibold" : "text-zinc-600"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Guest Buttons OR Profile Dropdown) */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <ProfileDropdown
              user={currentUser}
              onLogout={() => setCurrentUser(null)}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-deep-ink hover:text-rosewood hover:bg-zinc-100 rounded-xl font-medium text-xs sm:text-sm"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors"
                )}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Sheet Trigger */}
          <MobileNav
            user={currentUser}
            onLogout={() => setCurrentUser(null)}
          />
        </div>
      </div>
    </header>
  );
}
