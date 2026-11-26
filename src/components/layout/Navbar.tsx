"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { MobileNav } from "@/components/layout/MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_USERS } from "@/data/mockData";
import { type UserProfile } from "@/types/wedding";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { User } from "lucide-react";

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

   const { 
        data: session, 
        isPending, 
    } = useSession() 

    const user = session?.user

  return (
    <header className="sticky top-0 z-40 w-full bg-pure-alabaster/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Logo size="md" />
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
                  "text-sm transition-colors hover:text-deep-ink",
                  isActive ? "text-deep-ink font-medium" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Loading Skeleton OR Profile Dropdown OR Guest Buttons) */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="flex items-center gap-2.5 p-1">
              <Skeleton className="size-8 rounded-full" />
              <div className="hidden sm:flex flex-col gap-1.5 text-left">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2.5 w-12" />
              </div>
            </div>
          ) : user ? (
            <ProfileDropdown
              user={user}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-muted-foreground hover:text-deep-ink transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-9 px-4 text-sm font-medium transition-colors"
                )}
              >
                Get started
              </Link>
            </div>
          )}

          {/* Mobile Sheet Trigger */}
          <MobileNav
            user={user || currentUser}
            onLogout={() => setCurrentUser(null)}
          />
        </div>
      </div>
    </header>
  );
}
