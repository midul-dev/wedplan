import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { SERVICE_CATEGORIES } from "@/types/wedding";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-soft-pearl border-t border-zinc-200 text-deep-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 4 Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Editorial Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="font-sans text-sm text-zinc-600 leading-relaxed max-w-sm">
              WedPlan is an editorial wedding planning directory connecting discerning couples with
              handpicked venues, documentary cinematographers, floral artists, and couture ateliers.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200/90 text-zinc-700 text-xs font-medium">
              <Sparkles className="size-3 text-rosewood" />
              <span>Quiet Luxury & Verified Artistry</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-deep-ink">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/" className="hover:text-rosewood transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-rosewood transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-rosewood transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-rosewood transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Category Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-deep-ink">
              Wedding Categories
            </p>
            <ul className="space-y-2 text-sm text-zinc-600">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/services?category=${encodeURIComponent(cat)}`}
                    className="hover:text-rosewood transition-colors truncate block"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-wider font-semibold text-deep-ink">
              Concierge Desk
            </p>
            <div className="space-y-2 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-zinc-400 shrink-0" />
                <span className="truncate">concierge@wedplan.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-zinc-400 shrink-0" />
                <span>+1 (800) 555-WEDP</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-zinc-400 shrink-0" />
                <span>Napa Valley & New York</span>
              </div>
            </div>

            {/* Social Icons (SVGs) */}
            <div className="pt-2 flex items-center gap-3 text-zinc-500">
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center size-9 rounded-xl bg-white border border-zinc-200/80 hover:text-rosewood hover:border-zinc-300 transition-colors"
              >
                <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="flex items-center justify-center size-9 rounded-xl bg-white border border-zinc-200/80 hover:text-rosewood hover:border-zinc-300 transition-colors"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center size-9 rounded-xl bg-white border border-zinc-200/80 hover:text-rosewood hover:border-zinc-300 transition-colors"
              >
                <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-sans">
          <p>© {currentYear} WedPlan Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-deep-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-deep-ink transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-deep-ink transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
