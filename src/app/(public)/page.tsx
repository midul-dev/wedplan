import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { WhyChooseWedPlan } from "@/components/home/WhyChooseWedPlan";
import { HowItWorks } from "@/components/home/HowItWorks";

export const metadata = {
  title: "WedPlan — Premier Wedding Planning Platform",
  description:
    "Discover verified private venues, documentary wedding photographers, bespoke florists, and couture artisans for an unforgettable celebration.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-pure-alabaster">
      {/* 1. Hero Banner with Floating Search */}
      <HeroBanner />

      {/* 2. Soft Pearl Band of 6 Wedding Categories */}
      <CategoryGrid />

      {/* 3. Featured Wedding Services Grid (Mock Data) */}
      <FeaturedServices />

      {/* 4. The WedPlan Standard: 4 Benefit Columns */}
      <WhyChooseWedPlan />

      {/* 5. Deep Ink Contrast Section: How It Works */}
      <HowItWorks />
    </div>
  );
}
