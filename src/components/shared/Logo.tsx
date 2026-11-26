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
      box: "size-7 text-sm rounded-md",
      text: "text-base",
    },
    md: {
      box: "size-8 text-base rounded-lg",
      text: "text-lg",
    },
    lg: {
      box: "size-10 text-xl rounded-lg",
      text: "text-2xl",
    },
  }[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <div
        className={cn(
          "flex items-center justify-center bg-rosewood text-pure-alabaster font-serif font-medium",
          sizeStyles.box
        )}
        aria-hidden="true"
      >
        W
      </div>
      {withWordmark && (
        <span
          className={cn(
            "font-serif font-semibold tracking-tight text-deep-ink leading-none",
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
