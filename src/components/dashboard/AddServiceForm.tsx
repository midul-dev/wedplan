"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Upload, AlertCircle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_CATEGORIES, ServiceCategory } from "@/types/wedding";
import { cn } from "@/lib/utils";

interface AddServiceFormProps {
  isFreeLimitReached?: boolean;
  currentActiveCount?: number;
}

export function FreeLimitBanner() {
  return (
    <div className="p-5 bg-amber-50/90 border border-amber-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      <div className="flex items-start gap-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-champagne-amber border border-amber-300/60 mt-0.5">
          <AlertCircle className="size-4.5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif text-sm font-semibold text-amber-950">
            Free Vendor Limit Reached (3 of 3 Active Services)
          </h4>
          <p className="font-sans text-xs text-amber-900/80 leading-relaxed max-w-xl">
            You have reached the maximum allowed services on the Free Vendor tier. Upgrade to Premium for unlimited listings, the Premium Vendor Badge, and priority search placement.
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:self-center">
        <Link
          href="/dashboard/vendor/subscription"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-9 px-4 text-xs font-medium shadow-xs"
          )}
        >
          <span>Upgrade Plan</span>
          <ArrowRight className="size-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}

export function AddServiceForm({
  isFreeLimitReached = false,
  currentActiveCount = 2,
}: AddServiceFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("Wedding Venues");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("starting package");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Free Limit Warning Banner */}
      {isFreeLimitReached && <FreeLimitBanner />}

      {isSubmitted && (
        <div className="p-4 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-2xl text-xs flex items-center gap-2.5">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>
            Service submitted successfully! It has been routed to platform curators for review.
          </span>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 bg-pure-alabaster border border-zinc-200 rounded-2xl shadow-xs space-y-6"
      >
        <div className="space-y-1 pb-4 border-b border-zinc-100">
          <h2 className="font-serif text-xl font-semibold text-deep-ink">
            Service Details
          </h2>
          <p className="text-xs text-zinc-500 font-sans">
            Provide transparent pricing, high-resolution imagery, and clear service inclusions.
          </p>
        </div>

        {/* Service Name */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Service Title / Package Name
          </label>
          <Input
            type="text"
            required
            placeholder="e.g. The Grand Manor & Rose Gardens or Full-Day Cinema Reel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isFreeLimitReached}
            className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        {/* Category & Pricing Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Select */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Wedding Discipline / Category
            </label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as ServiceCategory)}
              disabled={isFreeLimitReached}
            >
              <SelectTrigger className="w-full h-10 rounded-xl bg-white border-zinc-200 text-sm font-sans">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
                {SERVICE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price & Unit */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Base Price (USD)
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                required
                min="0"
                placeholder="4200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isFreeLimitReached}
                className="w-1/2 rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
              />
              <Input
                type="text"
                placeholder="e.g. per event"
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
                disabled={isFreeLimitReached}
                className="w-1/2 rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
              />
            </div>
          </div>
        </div>

        {/* Location & Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Location / Service Area
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Napa Valley, CA or Portland, OR"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isFreeLimitReached}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-deep-ink">
              Capacity / Deliverable Scope (Optional)
            </label>
            <Input
              type="text"
              placeholder="e.g. Up to 350 Guests or 8 Hours Coverage"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              disabled={isFreeLimitReached}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Editorial Service Description
          </label>
          <Textarea
            rows={4}
            required
            placeholder="Describe your craft, materials, style, experience, and what makes your celebration offering extraordinary..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isFreeLimitReached}
            className="rounded-xl bg-white border-zinc-200 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood leading-relaxed"
          />
        </div>

        {/* ImgBB-Ready File Upload Dropzone Preview */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink flex items-center justify-between">
            <span>Primary Showcase Photo (ImgBB Ready)</span>
            <span className="text-[10px] text-zinc-400">Aspect 4:3 recommended</span>
          </label>

          <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-200 rounded-xl bg-soft-pearl/30 hover:bg-soft-pearl/60 transition-colors cursor-pointer text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isFreeLimitReached}
              className="sr-only"
            />

            {previewImage ? (
              <div className="space-y-2">
                <div className="relative aspect-[4/3] w-48 mx-auto rounded-lg overflow-hidden border border-zinc-200 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewImage}
                    alt="Upload Preview"
                    className="object-cover size-full"
                  />
                </div>
                <p className="text-xs font-medium text-botanical-sage">
                  Photo loaded. Click to replace.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center size-10 mx-auto rounded-xl bg-white border border-zinc-200 text-rosewood shadow-xs">
                  <Upload className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-deep-ink">
                    Click to select or drag photo here
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    ImgBB Direct Upload Ready (JPG, PNG, WebP up to 10MB)
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isFreeLimitReached}
            className="bg-rosewood hover:bg-rosewood-hover disabled:bg-zinc-200 disabled:text-zinc-400 text-white rounded-xl h-11 px-8 text-sm font-medium transition-colors shadow-xs"
          >
            Submit Service for Review
          </Button>
        </div>
      </form>
    </div>
  );
}
