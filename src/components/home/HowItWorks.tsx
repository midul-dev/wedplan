import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, CalendarCheck2, ShieldCheck } from "lucide-react";
import { MotionSection } from "@/components/shared/MotionSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Discover & Compare",
    icon: Compass,
    description:
      "Explore curated portfolios with cinematic galleries, verified guest reviews, transparent pricing, and specific amenity details.",
  },
  {
    step: "02",
    title: "Request Your Date",
    icon: CalendarCheck2,
    description:
      "Send a seamless booking request with your celebration date, guest count, and vision notes directly to the vendor's private dashboard.",
  },
  {
    step: "03",
    title: "Track & Confirm",
    icon: ShieldCheck,
    description:
      "Receive official acceptance notices, review package deliverables, and secure your wedding team with complete transparency.",
  },
];

export function HowItWorks() {
  return (
    <div className="w-full bg-deep-ink text-pure-alabaster">
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Editorial Section Header with Dark Palette */}
        <div className="max-w-3xl mb-12 space-y-2">
          <p className="text-xs font-medium text-rose-300">
            Three-step booking
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-pure-alabaster">
            How WedPlan works
          </h2>
          <p className="text-sm sm:text-base text-[#efe9de]/75 font-sans leading-relaxed">
            From initial discovery to confirmed dates, coordinate your wedding team in one ledger.
          </p>
        </div>

        {/* 3 Numbered Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative flex flex-col justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-white/10 text-rose-300 border border-white/10">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-2xl font-medium text-white/30 tabular-nums">
                    {s.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-medium text-pure-alabaster tracking-tight">
                    {s.title}
                  </h3>
                  <p className="font-sans text-sm text-[#efe9de]/75 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-serif text-lg text-pure-alabaster font-medium">
            Start comparing venues and artisans for your date
          </p>
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 px-5 text-sm font-medium transition-colors"
            )}
          >
            <span>Browse all services</span>
            <ArrowRight className="size-4 ml-1.5" strokeWidth={1.5} />
          </Link>
        </div>
      </MotionSection>
    </div>
  );
}
