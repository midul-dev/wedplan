import React from "react";
import { MotionSection } from "@/components/shared/MotionSection";
import { SectionHeader } from "@/components/shared/SectionHeader";

const BENEFITS = [
  {
    number: "01",
    title: "Vetted Premier Artisans",
    description:
      "Every photographer, venue, and atelier on WedPlan undergoes rigorous portfolio validation, insurance checks, and background verifications.",
  },
  {
    number: "02",
    title: "Transparent Package Pricing",
    description:
      "Review clear price ranges and itemized package inclusions upfront. No hidden commissions, unexpected fees, or inflated estimates.",
  },
  {
    number: "03",
    title: "Direct Date Availability",
    description:
      "Submit availability inquiries directly to vendor schedules and receive prompt, documented responses tailored to your date and guest count.",
  },
  {
    number: "04",
    title: "Unified Planning Ledger",
    description:
      "Organize quotes, keep track of confirmed bookings, and maintain clear communication with all wedding collaborators in one serene workspace.",
  },
];

export function WhyChooseWedPlan() {
  return (
    <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        eyebrow="The WedPlan Standard"
        title="Designed with Restraint & Intent"
        subtitle="We replace chaotic spreadsheets and predatory vendor directories with a calm, transparent editorial platform."
      />

      {/* 4 calm editorial benefit columns separated by subtle top borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENEFITS.map((b) => (
          <div
            key={b.number}
            className="flex flex-col border-t border-zinc-200/90 pt-6 space-y-3"
          >
            <span className="font-serif text-sm font-semibold text-rosewood tracking-wider">
              {b.number}
            </span>
            <h3 className="font-serif text-lg font-semibold text-deep-ink tracking-tight">
              {b.title}
            </h3>
            <p className="font-sans text-sm text-zinc-600 leading-relaxed">
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
