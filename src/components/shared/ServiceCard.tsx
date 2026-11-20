import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { WeddingService } from "@/types/wedding";

interface ServiceCardProps {
  service: WeddingService;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const isPremiumVendor = service.vendorTier === "premium";
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(service.price);

  return (
    <article
      className={cn(
        "group flex flex-col bg-pure-alabaster border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-zinc-300/80",
        className
      )}
    >
      {/* 4/3 Aspect Image with subtle hover zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <Image
          src={service.featuredImage || service.images[0]}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Content with strict 8px rhythm (p-6) */}
      <div className="flex flex-1 flex-col p-6 space-y-4">
        {/* Category Pill + Price Row */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-soft-pearl text-zinc-700 border border-zinc-200/80 tracking-wide">
            {service.category}
          </span>
          <div className="text-right">
            <span className="font-semibold text-deep-ink text-base">
              {formattedPrice}
            </span>
            {service.priceUnit && (
              <span className="text-xs text-zinc-500 font-sans ml-1">
                /{service.priceUnit}
              </span>
            )}
          </div>
        </div>

        {/* Service Title */}
        <div className="space-y-1">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-deep-ink line-clamp-1 group-hover:text-rosewood transition-colors">
            <Link href={`/services/${service.id}`} className="focus:outline-hidden">
              {service.title}
            </Link>
          </h3>
        </div>

        {/* Location & Vendor Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600 pt-1 border-t border-zinc-100">
          <div className="flex items-center gap-1.5 truncate max-w-[60%]">
            <MapPin className="size-3.5 shrink-0 text-zinc-400" />
            <span className="truncate">{service.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="truncate font-medium text-zinc-700">
              {service.vendorName}
            </span>
            {isPremiumVendor && (
              <StatusBadge status="Premium" showDot={false} className="py-0 px-2 text-[10px]" />
            )}
          </div>
        </div>

        {/* Action Button: Full-width Rosewood CTA */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/services/${service.id}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 font-medium transition-colors shadow-xs"
            )}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
