import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Users,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { VendorInfoCard } from "@/components/services/VendorInfoCard";
import { BookingRequestModal } from "@/components/services/BookingRequestModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MOCK_SERVICES } from "@/data/mockData";
import type { WeddingService } from "@/types/wedding";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_SERVICES.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;

  // Find service by ID or slug (fallback to first service for resilient preview)
  const service =
    MOCK_SERVICES.find((s) => s.id === id || s.slug === id) || MOCK_SERVICES[0];

  if (!service) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(service.price);

  return (
    <div className="w-full min-h-screen bg-pure-alabaster">
      {/* 1. Breadcrumbs Bar */}
      <div className="border-b border-zinc-200/80 bg-soft-pearl/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 font-sans">
            <Link href="/" className="hover:text-deep-ink transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-zinc-400" />
            <Link href="/services" className="hover:text-deep-ink transition-colors">
              Services
            </Link>
            <ChevronRight className="size-3 text-zinc-400" />
            <Link
              href={`/services?category=${encodeURIComponent(service.category)}`}
              className="hover:text-deep-ink transition-colors truncate max-w-[140px] sm:max-w-none"
            >
              {service.category}
            </Link>
            <ChevronRight className="size-3 text-zinc-400" />
            <span className="text-deep-ink font-medium truncate max-w-[180px] sm:max-w-none">
              {service.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Main 12-Column Desktop Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ================= LEFT CONTENT (7 Columns) ================= */}
          <div className="lg:col-span-7 space-y-10">
            {/* Gallery with Primary Image + Clickable Thumbnails */}
            <ServiceGallery
              images={service.images}
              title={service.title}
            />

            {/* Description & Editorial Overview */}
            <section className="space-y-4 pt-4 border-t border-zinc-200">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink tracking-tight">
                About this Service
              </h2>
              <p className="font-sans text-base text-zinc-700 leading-relaxed">
                {service.description}
              </p>
              {service.shortDescription && (
                <div className="p-4 rounded-xl bg-soft-pearl border border-zinc-200/80 text-sm text-zinc-600 italic">
                  &ldquo;{service.shortDescription}&rdquo;
                </div>
              )}
            </section>

            {/* Key Amenities & Features */}
            {service.amenities && service.amenities.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-zinc-200">
                <h3 className="font-serif text-xl font-semibold text-deep-ink tracking-tight">
                  Inclusions & Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-pure-alabaster border border-zinc-200 text-sm text-zinc-700 font-sans"
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-botanical-sage">
                        <Check className="size-3 stroke-2" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itemized Packages (If Available) */}
            {service.packages && service.packages.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-zinc-200">
                <h3 className="font-serif text-xl font-semibold text-deep-ink tracking-tight">
                  Curated Packages
                </h3>
                <div className="space-y-4">
                  {service.packages.map((pkg) => {
                    const pkgPrice = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(pkg.price);

                    return (
                      <div
                        key={pkg.id}
                        className="p-5 rounded-2xl bg-pure-alabaster border border-zinc-200 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-serif text-lg font-semibold text-deep-ink">
                            {pkg.name}
                          </h4>
                          <span className="font-semibold text-rosewood text-base">
                            {pkgPrice}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                          {pkg.description}
                        </p>
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600">
                          {pkg.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5">
                              <span className="size-1 rounded-full bg-rosewood" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR (5 Columns Sticky) ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 bg-pure-alabaster border border-zinc-200 rounded-2xl shadow-sm space-y-6">
              {/* Category Pill + Rating */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-soft-pearl text-zinc-700 border border-zinc-200">
                  {service.category}
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-deep-ink">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span>{service.rating}</span>
                  <span className="text-zinc-400 font-normal">
                    ({service.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-ink leading-tight">
                  {service.title}
                </h1>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-xl bg-soft-pearl/70 border border-zinc-200/80 flex items-baseline justify-between">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Pricing
                </span>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-rosewood">
                    {formattedPrice}
                  </span>
                  {service.priceUnit && (
                    <span className="text-xs text-zinc-500 font-sans ml-1">
                      /{service.priceUnit}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Details List */}
              <div className="space-y-2.5 text-xs text-zinc-600 border-y border-zinc-100 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-zinc-400 shrink-0" />
                  <span>{service.location}</span>
                </div>
                {service.capacity && (
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-zinc-400 shrink-0" />
                    <span>{service.capacity}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-zinc-400 shrink-0" />
                  <span>Prompt Response (within 24–48 hours)</span>
                </div>
              </div>

              {/* Vendor Info Card Component */}
              <VendorInfoCard service={service} />

              {/* Booking Request Modal Trigger */}
              <div className="pt-2 space-y-2">
                <BookingRequestModal service={service} />
                <p className="text-[11px] text-zinc-400 text-center font-sans">
                  No payment required now. Direct date inquiry with vendor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
