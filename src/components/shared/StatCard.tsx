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
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between p-6 bg-pure-alabaster border border-zinc-200 rounded-2xl shadow-xs transition-shadow hover:shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-sans text-xs uppercase tracking-wider font-semibold text-zinc-500">
          {label}
        </span>
        {Icon && (
          <div className="flex items-center justify-center size-9 rounded-xl bg-soft-pearl text-rosewood border border-zinc-200/70">
            <Icon className="size-4" />
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="font-serif text-3xl font-semibold tracking-tight text-deep-ink">
          {value}
        </div>

        {(trend || description) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  "font-medium px-2 py-0.5 rounded-full border",
                  trend.isPositive !== false
                    ? "bg-emerald-50 text-botanical-sage border-emerald-200/80"
                    : "bg-rose-50 text-rose-800 border-rose-200/80"
                )}
              >
                {trend.value}
              </span>
            )}
            {description && (
              <span className="text-zinc-500 font-sans truncate">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
