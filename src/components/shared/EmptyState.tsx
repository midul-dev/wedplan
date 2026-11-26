import React from "react";
import { LucideIcon, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Compass,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 border border-border rounded-xl bg-soft-pearl/60",
        className
      )}
    >
      <div className="flex items-center justify-center size-10 rounded-lg bg-pure-alabaster border border-border text-muted-foreground mb-4">
        <Icon className="size-4" strokeWidth={1.5} />
      </div>

      <h3 className="font-serif text-xl font-medium text-deep-ink tracking-tight mb-2">
        {title}
      </h3>

      <p className="font-sans text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {action && <div className="inline-flex items-center">{action}</div>}
    </div>
  );
}
