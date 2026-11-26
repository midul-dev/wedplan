import React from "react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <div className="w-full min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-soft-pearl/60">
      <div
        className={cn(
          "w-full max-w-md bg-pure-alabaster border border-border rounded-xl p-6 sm:p-8 space-y-6",
          className
        )}
      >
        {/* Brand Logo */}
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1.5 text-center">
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
            {title}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Form Body */}
        <div>{children}</div>

        {/* Footer (Alternative Links / Disclaimer) */}
        {footer && <div className="pt-3 border-t border-border text-center">{footer}</div>}
      </div>
    </div>
  );
}
