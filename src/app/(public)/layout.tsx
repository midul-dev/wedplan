import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-1 w-full flex flex-col">{children}</main>;
}
