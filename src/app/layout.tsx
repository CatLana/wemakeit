import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Make IT — Software Development in Ireland",
  description:
    "We Make IT is a software development company in Ireland. What makes us different from other companies is that we care about Accessibility and Usability. You do not to hire UX experts or do Accessibility audit later at extra costs. Our software and websites are accessible with the best UX standards first.",
  keywords: [
    "app development ireland",
    "software development ireland",
    "web accessibility consultant",
    "web accessibility for small company",
    "accessible website",
    "accessible web development",
    "screen reader accessibility testing",
    "keyboard accessibility testing",
    "remote usability testing services",
    "web development company Dublin",
    "web development company Ireland",
    "web development company",
    "WCAG audit Dublin",
    "app development Dublin",
  ],
  openGraph: {
    title: "We Make IT — Software Development in Ireland",
    description:
      "Custom Applications and Website. Best standards development only. Accessible software. Reliable delivery.",
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
