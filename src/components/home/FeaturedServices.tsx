import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/shared/MotionSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_SERVICES } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function FeaturedServices() {
  // 6 approved wedding services
  const featured = MOCK_SERVICES.filter((s) => s.status === "approved").slice(0, 6);

  return (
    <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        eyebrow="Curated Portfolio"
        title="Featured Wedding Services"
        subtitle="Explore top-tier venues, award-winning cinematographers, and bespoke artisans vetted for exceptional quality."
        action={
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl h-10 px-4 text-sm font-medium text-deep-ink border-zinc-300 hover:bg-soft-pearl"
            )}
          >
            <span>Explore All Services</span>
            <ArrowRight className="size-4 ml-1.5" />
          </Link>
        }
      />

      {/* 3-column responsive grid with 8px rhythm (gap-6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </MotionSection>
  );
}
