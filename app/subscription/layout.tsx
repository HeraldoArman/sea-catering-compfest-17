import type React from "react";

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full py-16">{children}</div>;
}
