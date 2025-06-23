import type React from "react"
import "@/styles/globals.css"
import clsx from "clsx"

import { fontSans } from "@/config/fonts"
import ClientLayout from "./clientLayout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen text-foreground bg-background font-sans antialiased", fontSans.variable)}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
