"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServiceGalleryProps {
  images: string[];
  title: string;
}

export function ServiceGallery({ images, title }: ServiceGalleryProps) {
  const galleryImages = images && images.length > 0 ? images : ["/placeholder.jpg"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = galleryImages[selectedIndex] || galleryImages[0];

  return (
    <div className="space-y-4 w-full">
      {/* Primary Aspect 4/3 Large Image Display */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-xs">
        <Image
          src={activeImage}
          alt={`${title} - photograph ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-all duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Photo Counter Pill */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-deep-ink/70 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
          {selectedIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Clickable Thumbnail Strip */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {galleryImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative aspect-[4/3] w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border transition-all duration-200 cursor-pointer focus:outline-hidden",
                  isSelected
                    ? "ring-2 ring-rosewood ring-offset-2 border-transparent opacity-100"
                    : "border-zinc-200 opacity-60 hover:opacity-100"
                )}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
