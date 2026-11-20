import React from "react";
import Link from "next/link";
import {
  Camera,
  Building2,
  Flower2,
  UtensilsCrossed,
  Sparkles,
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
    tagline: "Luminous bridal hair & photographic artistry",
    icon: Sparkles,
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
    <div className="w-full bg-soft-pearl border-y border-zinc-200/80">
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          eyebrow="Curated Disciplines"
          title="Explore Wedding Categories"
          subtitle="Every dimension of your ceremony and reception, curated with meticulous attention to craft."
        />

        {/* 6 Categories Grid with 8px rhythm (gap-6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={`/services?category=${encodeURIComponent(cat.title)}`}
                className="group flex flex-col justify-between p-6 bg-pure-alabaster border border-zinc-200 rounded-2xl transition-all duration-300 hover:shadow-md hover:border-zinc-300 hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-soft-pearl text-rosewood border border-zinc-200/80 group-hover:bg-rosewood group-hover:text-white transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-400 font-sans tracking-wide">
                      {cat.count}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-semibold text-deep-ink group-hover:text-rosewood transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-rosewood">
                  <span>Browse Category</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </MotionSection>
    </div>
  );
}
