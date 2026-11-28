import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import {
  MapPin,
  Star,
  Users,
  Check,
  ChevronRight,
  Clock,
  Info,
} from "lucide-react";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { VendorInfoCard } from "@/components/services/VendorInfoCard";
import { BookingRequestModal } from "@/components/services/BookingRequestModal";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { apiFetch } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import type {
  ApiResponse,
  IWeddingService,
  WeddingService,
} from "@/types/wedding";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

type DetailService = IWeddingService & {
  shortDescription?: string;
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
};

function getGalleryImages(service: DetailService): string[] {
  if (Array.isArray(service.images) && service.images.length > 0) {
    return service.images;
  }
  const single = service.featuredImage || service.image || service.images;
  return typeof single === "string" && single.trim() ? [single] : [];
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;

  const [session, serviceRes] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    apiFetch<ApiResponse<DetailService>>(`/service/${id}`, {
      cache: "no-store",
    }).catch(() => null),
  ]);

  const service = serviceRes?.data ?? null;
  const userRole = session?.user?.role;

  if (!service) {
    notFound();
  }

  const galleryImages = getGalleryImages(service);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(service.price) || 0);

  const normalizedService = {
    ...(service as unknown as WeddingService),
    id: service._id,
    vendorName: service.vendorName || "WedPlan Vendor",
    vendorEmail: service.vendorEmail || "",
  };

  return (
    <div className="w-full min-h-screen bg-pure-alabaster">
      {/* 1. Breadcrumbs Bar */}
      <div className="border-b border-border bg-soft-pearl/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground font-sans"
          >
            <Link href="/" className="hover:text-deep-ink transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-muted-foreground" strokeWidth={1.5} />
            <Link
              href="/services"
              className="hover:text-deep-ink transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="size-3 text-muted-foreground" strokeWidth={1.5} />
            <Link
              href={`/services?category=${encodeURIComponent(service.category)}`}
              className="hover:text-deep-ink transition-colors truncate max-w-[140px] sm:max-w-none"
            >
              {service.category}
            </Link>
            <ChevronRight className="size-3 text-muted-foreground" strokeWidth={1.5} />
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
            {/* Gallery */}
            <ServiceGallery images={galleryImages} title={service.title} />

            {/* Description */}
            <section className="space-y-4 pt-4 border-t border-border">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
                About this service
              </h2>
              <p className="font-sans text-base text-deep-ink/85 leading-relaxed">
                {service.description}
              </p>
              {service.shortDescription && (
                <div className="p-4 rounded-xl bg-soft-pearl border border-border text-sm text-muted-foreground">
                  &ldquo;{service.shortDescription}&rdquo;
                </div>
              )}
            </section>

            {/* Key Amenities & Features */}
            {service.amenities && service.amenities.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-serif text-xl font-medium text-deep-ink tracking-tight">
                  Inclusions & highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-pure-alabaster border border-border text-sm text-deep-ink/85 font-sans"
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-botanical-sage">
                        <Check className="size-3" strokeWidth={1.75} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itemized Packages (If Available) */}
            {service.packages && service.packages.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-serif text-xl font-medium text-deep-ink tracking-tight">
                  Curated packages
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
                        className="p-5 rounded-xl bg-pure-alabaster border border-border space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-serif text-lg font-medium text-deep-ink">
                            {pkg.name}
                          </h4>
                          <span className="font-medium text-rosewood text-base tabular-nums">
                            {pkgPrice}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                          {pkg.description}
                        </p>
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
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
            <div className="p-6 bg-pure-alabaster border border-border rounded-xl space-y-6">
              {/* Category + Rating */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-soft-pearl text-deep-ink border border-border">
                  {service.category}
                </span>

                {typeof service.rating === "number" && (
                  <div className="flex items-center gap-1 text-xs font-medium text-deep-ink tabular-nums">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating}</span>
                    {typeof service.reviewCount === "number" && (
                      <span className="text-muted-foreground font-normal">
                        ({service.reviewCount} reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink leading-tight">
                  {service.title}
                </h1>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-xl bg-soft-pearl border border-border flex items-baseline justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Pricing
                </span>
                <div className="text-right tabular-nums">
                  <span className="font-serif text-2xl font-medium text-rosewood">
                    {formattedPrice}
                  </span>
                  {service.priceUnit && (
                    <span className="text-xs text-muted-foreground font-sans ml-1">
                      /{service.priceUnit}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Details List */}
              <div className="space-y-2.5 text-xs text-muted-foreground border-y border-border py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <span>{service.location}</span>
                </div>
                {service.capacity && (
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                    <span>{service.capacity}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                  <span>Prompt response (within 24–48 hours)</span>
                </div>
              </div>

              {/* Vendor Info Card Component */}
              <VendorInfoCard service={normalizedService} />

              {/* Booking Action or Role Notice */}
              <div className="pt-2 space-y-2">
                {userRole === "customer" ? (
                  <>
                    <BookingRequestModal service={normalizedService} />
                    <p className="text-xs text-muted-foreground text-center font-sans">
                      No payment required now. Direct date inquiry with vendor.
                    </p>
                  </>
                ) : userRole === "vendor" || userRole === "admin" ? (
                  <div className="p-4 rounded-xl bg-soft-pearl border border-border flex items-start gap-3">
                    <Info
                      className="size-4 text-rosewood shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <p className="text-xs text-deep-ink/85 font-sans leading-relaxed">
                      {userRole === "vendor" ? "Vendor" : "Admin"} accounts
                      cannot submit customer booking requests. Please sign in
                      with a Customer account to book services.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/sign-in"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 text-sm font-medium"
                      )}
                    >
                      Sign in to book service
                    </Link>
                    <p className="text-xs text-muted-foreground text-center font-sans">
                      Sign in with a Customer account to send a date inquiry.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
