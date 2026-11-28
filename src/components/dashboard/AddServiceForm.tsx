"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ApiResponse,
  SERVICE_CATEGORIES,
  ServiceCategory,
  WeddingService,
} from "@/types/wedding";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

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
            You have reached the maximum allowed services on the Free Vendor
            tier. Upgrade to Premium for unlimited listings, the Premium Vendor
            Badge, and priority search placement.
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:self-center">
        <Link
          href="/dashboard/vendor/subscription"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-9 px-4 text-xs font-medium shadow-xs",
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
  const { data: session, isPending } = useSession();
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const user = session?.user
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    const toastId = toast.loading("Uploading image...");

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.display_url);
        setPreviewImage(data.data.display_url);
        toast.success("Image uploaded!", { id: toastId });
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed", {
        id: toastId,
        description: "Something went wrong while uploading.",
      });
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload a showcase photo first.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.category) {
      toast.error("Please select a wedding category.");
      return;
    }

    setIsSubmitting(true);
    const serviceData = {
      ...data,
      price: Number(data.price),
      image: imageUrl,
      vendorId: user?.id,
      vendorEmail: user?.email,
      vendorName: user?.name,
      vendorImage: user?.image,
    };

    try {
      const res = await apiFetch<ApiResponse<WeddingService>>("/service", {
        method: "POST",
        body: JSON.stringify(serviceData),
      });
      console.log("Create service response:", res);

      if (res.success) {
        setIsSubmitted(true);
        toast.success("Service submitted for approval", {
          description: "Our curation team will review and publish your listing shortly.",
        });
        router.push("/dashboard/vendor/services");
        router.refresh();
      } else {
        toast.error("Failed to submit service.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Free Limit Warning Banner */}
      {isFreeLimitReached && <FreeLimitBanner />}

      {isSubmitted && (
        <div className="p-4 bg-emerald-50 text-botanical-sage border border-emerald-200 rounded-2xl text-xs flex items-center gap-2.5">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>
            Service submitted successfully! It has been routed to platform
            curators for review.
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
            Provide transparent pricing, high-resolution imagery, and clear
            service inclusions.
          </p>
        </div>

        {/* Service Name */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Service Title / Package Name<span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            required
            placeholder="e.g. The Grand Manor & Rose Gardens or Full-Day Cinema Reel"
            name="title"
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
              <span className="text-red-600">*</span>
            </label>
            <Select name="category" disabled={isFreeLimitReached} required>
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
              Base Price (USD)<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                required
                min="0"
                placeholder="4200"
                name="price"
                disabled={isFreeLimitReached}
                className="w-1/2 rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
              />
              <Input
                type="text"
                placeholder="e.g. per event"
                name="priceUnit"
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
              Location / Service Area<span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Napa Valley, CA or Portland, OR"
              name="location"
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
              name="capacity"
              disabled={isFreeLimitReached}
              className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink">
            Editorial Service Description<span className="text-red-600">*</span>
          </label>
          <Textarea
            rows={4}
            required
            placeholder="Describe your craft, materials, style, experience, and what makes your celebration offering extraordinary..."
            name="description"
            disabled={isFreeLimitReached}
            className="rounded-xl bg-white border-zinc-200 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood leading-relaxed"
          />
        </div>

        {/* ImgBB-Ready File Upload Dropzone Preview */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-semibold text-deep-ink flex items-center justify-between">
            <span>
              Primary Showcase Photo (Up to 6 files, uploaded to ImgBB)
              <span className="text-red-600">*</span>
            </span>
            <span className="text-[10px] text-zinc-400">
              Aspect 4:3 recommended
            </span>
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
                    PNG, JPG, or WebP up to 5MB each. First image is used as the
                    cover.
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
            disabled={isFreeLimitReached || isSubmitting || isPending}
            className="bg-rosewood hover:bg-rosewood-hover disabled:bg-zinc-200 disabled:text-zinc-400 text-white rounded-xl h-11 px-8 text-sm font-medium transition-colors shadow-xs"
          >
            {isSubmitting ? "Submitting..." : "Submit Service for Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
