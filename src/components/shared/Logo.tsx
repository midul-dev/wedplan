import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
}

export function Logo({
  className,
  href = "/",
  size = "md",
  withWordmark = true,
}: LogoProps) {
  const sizeStyles = {
    sm: {
      box: "size-8 text-base rounded-lg",
      text: "text-lg",
    },
    md: {
      box: "size-10 text-xl rounded-xl",
      text: "text-2xl",
    },
    lg: {
      box: "size-12 text-2xl rounded-2xl",
      text: "text-3xl",
    },
  }[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div
        className={cn(
          "flex items-center justify-center bg-rosewood text-white font-serif font-bold shadow-xs transition-transform duration-200 group-hover:scale-105",
          sizeStyles.box
        )}
        aria-hidden="true"
      >
        W
      </div>
      {withWordmark && (
        <span
          className={cn(
            "font-serif font-bold tracking-tight text-deep-ink leading-none",
            sizeStyles.text
          )}
        >
          WedPlan
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-hidden">
        {content}
      </Link>
    );
  }

  return content;
}
