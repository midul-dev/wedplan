import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12",
        isCentered && "text-center md:flex-col md:items-center",
        className
      )}
    >
      <div className={cn("space-y-1.5", isCentered && "mx-auto max-w-2xl")}>
        {eyebrow && (
          <p className="text-xs uppercase tracking-widest font-semibold text-rosewood">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-deep-ink">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className={cn("shrink-0", isCentered && "pt-2")}>
          {action}
        </div>
      )}
    </div>
  );
}
