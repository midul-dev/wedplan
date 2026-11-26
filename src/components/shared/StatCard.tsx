import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  label,
  value,
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between p-5 bg-pure-alabaster border border-border rounded-xl transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-sans text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-deep-ink tabular-nums">
          {value}
        </div>

        {(trend || description) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  "font-medium tabular-nums",
                  trend.isPositive !== false
                    ? "text-botanical-sage"
                    : "text-rose-800"
                )}
              >
                {trend.value}
              </span>
            )}
            {trend && description && (
              <span className="text-muted-foreground/50" aria-hidden="true">
                ·
              </span>
            )}
            {description && (
              <span className="text-muted-foreground font-sans truncate">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
