import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-deep-ink">
      {/* Background Wedding Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Elegant wedding celebration ceremony"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Dark Editorial Scrim for WCAG AAA Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-ink/95 via-deep-ink/80 to-deep-ink/50" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-deep-ink/40 to-deep-ink/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl space-y-6 text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide">
            <Sparkles className="size-3.5 text-amber-300" />
            <span>The Premier Wedding Planning Directory</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
            Where Your Love Story Meets Extraordinary Artistry
          </h1>

          {/* Description */}
          <p className="font-sans text-base sm:text-lg text-zinc-200/90 max-w-2xl font-normal leading-relaxed">
            Discover verified private estates, documentary cinematographers, floral artisans,
            and couture ateliers handpicked to create an effortless, unforgettable wedding day.
          </p>

          {/* Floating White Search Bar UI */}
          <div className="pt-4 max-w-3xl">
            <form
              action="/services"
              method="GET"
              className="bg-pure-alabaster rounded-2xl shadow-2xl p-2.5 sm:p-3 border border-zinc-200/90 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
            >
              {/* Category Search Input */}
              <div className="sm:col-span-5 flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r border-zinc-200">
                <Search className="size-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Service (e.g. Venue, Florist)"
                  className="w-full bg-transparent text-sm text-deep-ink placeholder:text-zinc-400 focus:outline-hidden"
                />
              </div>

              {/* Location Input */}
              <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2">
                <MapPin className="size-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="Location or City"
                  className="w-full bg-transparent text-sm text-deep-ink placeholder:text-zinc-400 focus:outline-hidden"
                />
              </div>

              {/* Rosewood CTA Button */}
              <div className="sm:col-span-3">
                <Button
                  type="submit"
                  className="w-full bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 text-xs sm:text-sm font-medium transition-colors shadow-xs"
                >
                  Search
                  <ArrowRight className="size-3.5 ml-1.5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 text-xs text-zinc-300/80 font-medium border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-botanical-sage" />
              <span>100% Verified Vendors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-champagne-amber" />
              <span>Direct Date Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-rose-400" />
              <span>Transparent Package Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
