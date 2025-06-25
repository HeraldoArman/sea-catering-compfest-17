"use client";

import type React from "react";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarPages = ["/sign-in", "/sign-up"];
  const shouldHideNavbar = hideNavbarPages.includes(pathname);

  return (
    <div className="relative flex flex-col h-screen">
      {!shouldHideNavbar && <Navbar />}
      <main className={`flex-grow ${!shouldHideNavbar ? "" : ""}`}>
        {children}
      </main>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers
      themeProps={{
        attribute: "class",
        defaultTheme: "light",
        forcedTheme: "light",
      }}
    >
      <LayoutContent>
        {" "}
        <HeroUIProvider>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </LayoutContent>
    </Providers>
  );
}
