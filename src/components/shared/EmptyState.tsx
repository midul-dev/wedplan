import React from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 border-2 border-dashed border-zinc-200 rounded-2xl bg-soft-pearl/60",
        className
      )}
    >
      <div className="flex items-center justify-center size-14 rounded-2xl bg-white border border-zinc-200/80 text-rosewood shadow-xs mb-4">
        <Icon className="size-6" />
      </div>

      <h3 className="font-serif text-xl font-semibold text-deep-ink tracking-tight mb-2">
        {title}
      </h3>

      <p className="font-sans text-sm text-zinc-600 max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {action && <div className="inline-flex items-center">{action}</div>}
    </div>
  );
}
