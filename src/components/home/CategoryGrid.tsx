import React from "react";
import Link from "next/link";
import {
  Camera,
  Building2,
  Flower2,
  UtensilsCrossed,
  Palette,
  Shirt,
  ArrowRight,
} from "lucide-react";
import { MotionSection } from "@/components/shared/MotionSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SERVICE_CATEGORIES, ServiceCategory } from "@/types/wedding";

interface CategoryMeta {
  title: ServiceCategory;
  tagline: string;
  icon: React.ElementType;
  count: string;
}

const CATEGORIES_DATA: CategoryMeta[] = [
  {
    title: "Photography & Videography",
    tagline: "Documentary cinema & 35mm heirloom stills",
    icon: Camera,
    count: "48 Artisans",
  },
  {
    title: "Wedding Venues",
    tagline: "Historic châteaux, private estates & ocean vistas",
    icon: Building2,
    count: "32 Estates",
  },
  {
    title: "Decoration & Florist",
    tagline: "Sculptural arches & organic botanical tablescapes",
    icon: Flower2,
    count: "29 Studios",
  },
  {
    title: "Catering Services",
    tagline: "Farm-to-table tasting courses & wine pairings",
    icon: UtensilsCrossed,
    count: "24 Purveyors",
  },
  {
    title: "Makeup & Styling",
    tagline: "Bridal hair and photographic makeup",
    icon: Palette,
    count: "36 Stylists",
  },
  {
    title: "Wedding Fashion",
    tagline: "Made-to-measure couture & bespoke tailoring",
    icon: Shirt,
    count: "18 Ateliers",
  },
];

export function CategoryGrid() {
  return (
    <div className="w-full bg-soft-pearl border-y border-border">
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          eyebrow="Disciplines"
          title="Explore wedding categories"
          subtitle="Browse every vendor discipline for your ceremony and reception."
        />

        {/* 6 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={`/services?category=${encodeURIComponent(cat.title)}`}
                className="group flex flex-col justify-between p-5 bg-pure-alabaster border border-border rounded-xl transition-colors hover:border-deep-ink/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-soft-pearl text-muted-foreground border border-border group-hover:bg-rosewood group-hover:text-pure-alabaster group-hover:border-rosewood transition-colors">
                      <Icon className="size-4" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                      {cat.count}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-medium text-deep-ink group-hover:text-rosewood transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-medium text-rosewood">
                  <span>Browse category</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </div>
              </Link>
            );
          })}
        </div>
      </MotionSection>
    </div>
  );
}
