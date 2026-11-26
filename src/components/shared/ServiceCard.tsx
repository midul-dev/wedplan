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
        "group flex flex-col bg-pure-alabaster border border-border rounded-xl overflow-hidden transition-colors hover:border-deep-ink/20",
        className
      )}
    >
      {/* 4/3 Aspect Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-soft-pearl">
        <Image
          src={service.featuredImage || service.images[0]}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 space-y-3">
        {/* Category + Price Row */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {service.category}
          </span>
          <div className="text-right tabular-nums">
            <span className="font-medium text-deep-ink text-sm">
              {formattedPrice}
            </span>
            {service.priceUnit && (
              <span className="text-xs text-muted-foreground font-sans ml-1">
                /{service.priceUnit}
              </span>
            )}
          </div>
        </div>

        {/* Service Title */}
        <div>
          <h3 className="font-serif text-lg font-medium tracking-tight text-deep-ink line-clamp-1 group-hover:text-rosewood transition-colors">
            <Link href={`/services/${service.id}`} className="focus:outline-hidden">
              {service.title}
            </Link>
          </h3>
        </div>

        {/* Location & Vendor Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 truncate max-w-[60%]">
            <MapPin className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
            <span className="truncate">{service.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="truncate font-medium text-deep-ink/80">
              {service.vendorName}
            </span>
            {isPremiumVendor && (
              <StatusBadge status="Featured" showDot={false} className="py-0 px-1.5 text-[11px]" />
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/services/${service.id}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-9 text-sm font-medium transition-colors"
            )}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
