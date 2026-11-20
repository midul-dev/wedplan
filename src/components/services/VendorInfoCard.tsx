import React from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { WeddingService } from "@/types/wedding";

interface VendorInfoCardProps {
  service: WeddingService;
}

export function VendorInfoCard({ service }: VendorInfoCardProps) {
  const isPremium = service.vendorTier === "premium";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-5 bg-soft-pearl border border-zinc-200/90 rounded-2xl space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 border border-zinc-200">
            {service.vendorAvatar && (
              <AvatarImage src={service.vendorAvatar} alt={service.vendorName} />
            )}
            <AvatarFallback className="bg-rose-50 text-rosewood text-sm font-serif font-bold">
              {getInitials(service.vendorName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-serif text-base font-semibold text-deep-ink leading-tight">
              {service.vendorName}
            </h4>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Curated Service Vendor
            </p>
          </div>
        </div>

        {isPremium && (
          <StatusBadge status="Premium" showDot={false} className="py-0.5 px-2 text-[10px]" />
        )}
      </div>

      <div className="pt-3 border-t border-zinc-200/70 space-y-2 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <Mail className="size-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">contact@{service.slug.split("-")[0]}.wedplan.com</span>
        </div>
        <div className="flex items-center gap-2 text-botanical-sage font-medium">
          <CheckCircle2 className="size-3.5 shrink-0" />
          <span>Verified WedPlan Partner</span>
        </div>
      </div>
    </div>
  );
}
