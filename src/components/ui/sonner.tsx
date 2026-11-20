"use client";

import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-pure-alabaster group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:font-sans",
          description: "group-[.toast]:text-zinc-600",
          actionButton:
            "group-[.toast]:bg-rosewood group-[.toast]:text-pure-alabaster font-medium",
          cancelButton:
            "group-[.toast]:bg-soft-pearl group-[.toast]:text-zinc-700 font-medium",
        },
      }}
      {...props}
    />
  );
}

export { toast };
