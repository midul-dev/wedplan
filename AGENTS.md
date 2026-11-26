<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WedPlan — Agent Guide

WedPlan is a wedding planning and vendor marketplace built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn (`base-nova` / `@base-ui/react`), and Better Auth backed by MongoDB.

## Tech Stack & Key Config
- **Framework**: Next.js `16.4.6` (App Router in `src/app/`, React Compiler enabled in `next.config.ts`, Turbopack).
- **Language**: TypeScript (`strict: true`, path alias `@/*` -> `./src/*`).
- **Styling & UI**: Tailwind CSS v4 (`src/app/globals.css`), `shadcn` (`base-nova` style in `components.json`), `@base-ui/react`, `lucide-react`, `framer-motion`, `sonner`.
- **Auth & Database**: `better-auth` + `@better-auth/mongo-adapter` + `mongodb` (`src/lib/auth.ts`, `src/lib/auth-client.ts`).
  - Connects via `process.env.DB_URI` to the `wedplan` database.
  - Email/password auth is enabled with an additional `role` user field (`"customer" | "vendor" | "admin"`, default `"customer"`).
- **Images**: `next.config.ts` allows remote images from `images.unsplash.com`.

## Repository Layout (`src/`)
- `src/app/(public)/` — Public pages: landing page, `/services`, `/sign-in`, `/sign-up`, `/payment-success`, `/payment-cancel`.
- `src/app/dashboard/` — Role-based dashboards: `customer/`, `vendor/`, `admin/`.
- `src/app/api/auth/` — Better Auth route handler.
- `src/components/` — Organized by domain:
  - `ui/` — Reusable primitives (`button`, `dialog`, `input`, `select`, `sheet`, `table`, etc.).
  - `shared/` — Cross-app components (`ServiceCard`, `StatCard`, `StatusBadge`, `SectionHeader`, `MotionSection`, `EmptyState`, `Logo`).
  - `layout/` — `Navbar`, `MobileNav`, `Footer`, `DashboardShell`, `DashboardSidebar`, `ProfileDropdown`.
  - `home/`, `services/`, `auth/`, `dashboard/` — Feature-specific components.
- `src/types/wedding.ts` — Core domain types & constants (`SERVICE_CATEGORIES`, `UserRole`, `VendorTier`, `WeddingService`, `BookingRequest`, `SubscriptionTransaction`, `IUser`, `UserProfile`).
- `src/data/mockData.ts` — Mock/seed data for services, bookings, and transactions.
- `src/lib/` — `auth.ts` (server), `auth-client.ts` (client), `utils.ts`.

## Common Commands
- `npm run dev` — Start Next.js dev server (`next dev`).
- `npm run build` — Production build (`next build`).
- `npm run lint` — Run ESLint (`eslint`).

## Working Conventions
- Preserve the `<!-- BEGIN:nextjs-agent-rules -->` block in this file; `next dev` regenerates it.
- Check `node_modules/next/dist/docs/` before using Next.js APIs that may have changed in Next.js 16.
- Prefer existing UI primitives in `src/components/ui/` and shared domain types in `src/types/wedding.ts` before creating new ones.
- Keep server-only auth/DB logic (`src/lib/auth.ts`) out of client components; use `src/lib/auth-client.ts` on the client.
