import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-pure-alabaster">
      {/* Global Public Navbar with Static Preview Toggle */}
      <Navbar />

      {/* Main Page Canvas */}
      <main className="flex-1 w-full">{children}</main>

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  );
}
