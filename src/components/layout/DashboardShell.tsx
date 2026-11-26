"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Logo } from "@/components/shared/Logo";
import type { IUser } from "@/types/wedding";

interface DashboardShellProps {
  children: React.ReactNode;
  user?: IUser;
}

export function DashboardShell({
  children,
  user,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-pure-alabaster font-sans">
      {/* Desktop Persistent Sidebar (240px, lg:flex) */}
      <div className="hidden lg:flex shrink-0">
        <DashboardSidebar user={user} />
      </div>

      {/* Mobile Drawer & Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header (lg:hidden) */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-16 bg-pure-alabaster border-b border-border">
          <Logo size="sm" />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl border border-zinc-200 text-deep-ink"
                  aria-label="Toggle Dashboard Menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-68 p-0 bg-soft-pearl"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Dashboard Navigation</SheetTitle>
              </SheetHeader>
              <DashboardSidebar
                user={user}
                onCloseMobile={() => setMobileOpen(false)}
                className="w-full min-h-full border-r-0"
              />
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content Canvas (p-6 lg:p-10) */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-pure-alabaster max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
