import React from "react";
import Image from "next/image";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-deep-ink">
      {/* Background Wedding Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Outdoor wedding ceremony table and floral setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Calm left-side scrim so headline reads cleanly over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1b16]/90 via-[#1f1b16]/65 to-[#1f1b16]/25" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-2xl space-y-6 text-left">
          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.02em] text-pure-alabaster leading-[1.08]">
            Find vetted venues and artisans for your wedding day
          </h1>

          {/* Description */}
          <p className="font-sans text-base sm:text-lg text-[#efe9de]/85 max-w-xl font-normal leading-relaxed">
            Compare private estates, documentary photographers, florists, and
            bridal ateliers with itemized pricing and direct date inquiries.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-2xl">
            <form
              action="/services"
              method="GET"
              className="bg-pure-alabaster rounded-xl p-2 border border-border grid grid-cols-1 sm:grid-cols-12 gap-2 items-center shadow-lg"
            >
              {/* Category Search Input */}
              <div className="sm:col-span-5 flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r border-border">
                <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="text"
                  name="q"
                  placeholder="Venue, florist, photographer"
                  className="w-full bg-transparent text-sm text-deep-ink placeholder:text-muted-foreground/70 focus:outline-hidden"
                />
              </div>

              {/* Location Input */}
              <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2">
                <MapPin className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="text"
                  name="location"
                  placeholder="City or region"
                  className="w-full bg-transparent text-sm text-deep-ink placeholder:text-muted-foreground/70 focus:outline-hidden"
                />
              </div>

              {/* Primary CTA Button */}
              <div className="sm:col-span-3">
                <Button
                  type="submit"
                  className="w-full bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 text-sm font-medium transition-colors"
                >
                  Search
                  <ArrowRight className="size-4 ml-1.5" strokeWidth={1.5} />
                </Button>
              </div>
            </form>
          </div>

          {/* Quiet factual highlights */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-[#efe9de]/75 border-t border-white/15">
            <span>Vetted vendor portfolios</span>
            <span aria-hidden="true">·</span>
            <span>Direct date inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Itemized package pricing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
