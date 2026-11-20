import React from "react";
import { cn } from "@/lib/utils";

export type StatusType =
  | "Approved"
  | "Accepted"
  | "Paid"
  | "Pending"
  | "Premium"
  | "Rejected"
  | "Blocked"
  | "Cancelled"
  | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({
  status,
  className,
  showDot = true,
}: StatusBadgeProps) {
  const normalized = (status || "").trim().toLowerCase();

  let colorClasses = "bg-zinc-100 text-zinc-700 border-zinc-200";
  let dotColor = "bg-zinc-500";

  if (["approved", "accepted", "paid"].includes(normalized)) {
    // Botanical Sage #15803D
    colorClasses = "bg-emerald-50 text-botanical-sage border-emerald-200/80";
    dotColor = "bg-botanical-sage";
  } else if (["pending", "premium"].includes(normalized)) {
    // Champagne Amber #B45309
    colorClasses = "bg-amber-50 text-champagne-amber border-amber-200/80";
    dotColor = "bg-champagne-amber";
  } else if (["rejected", "blocked"].includes(normalized)) {
    // Soft Rosewood / Rose
    colorClasses = "bg-rose-50 text-rose-800 border-rose-200/80";
    dotColor = "bg-rose-700";
  } else if (["cancelled"].includes(normalized)) {
    // Neutral Zinc
    colorClasses = "bg-zinc-100 text-zinc-600 border-zinc-200";
    dotColor = "bg-zinc-400";
  }

  // Format label: capitalize words
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide select-none transition-colors",
        colorClasses,
        className
      )}
    >
      {showDot && (
        <span
          className={cn("size-1.5 rounded-full shrink-0", dotColor)}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
}
