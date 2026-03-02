import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Make IT — Custom Software Development in Ireland",
  description:
    "We Make IT is a Dublin-based software development company specialising in custom software, cloud migration, AI strategy, and managed IT services for businesses across Ireland and beyond.",
  keywords: [
    "software development Ireland",
    "custom software Dublin",
    "cloud migration Ireland",
    "AI consulting Ireland",
    "managed IT services Dublin",
  ],
  openGraph: {
    title: "We Make IT — Custom Software Development in Ireland",
    description:
      "Custom software, cloud & AI solutions — built by Irish engineers, delivered on time, built to last.",
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
      </body>
    </html>
  );
}
