import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Make IT: Turn Your Idea Into an App",
  description:
    "Got a business idea but not sure how to turn it into an app or website? We Make IT helps entrepreneurs in Ireland and beyond to validate, plan, and build their digital product. No tech knowledge needed. Free first consultation.",
  keywords: [
    "app development ireland",
    "build an app ireland",
    "startup idea validation ireland",
    "it business idea consultation",
    "how to build an app",
    "web app development ireland",
    "small business website ireland",
    "web development company Dublin",
    "web development company Ireland",
    "app development Dublin",
    "turn idea into app",
    "first time startup ireland",
  ],
  openGraph: {
    title: "We Make IT: Turn Your Idea Into an App",
    description:
      "Got a business idea? We help you validate it, plan it, and build it. No tech knowledge needed. Free first consultation.",
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        {/* WCAG 2.4.1: Skip navigation link */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[9999] focus-visible:bg-brand-cyan focus-visible:text-brand-dark focus-visible:font-bold focus-visible:px-4 focus-visible:py-2 focus-visible:rounded"
        >
          Skip to main content
        </a>
        {children}
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      </body>
    </html>
  );
}
