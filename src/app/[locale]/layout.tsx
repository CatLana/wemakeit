import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const BASE_URL = "https://wemakeit.ie";

// hreflang alternate tags per locale
const hreflangMap: Record<string, { hreflang: string; href: string }[]> = {
  en: [
    { hreflang: "en", href: `${BASE_URL}/en` },
    { hreflang: "en-IE", href: `${BASE_URL}/en` },
    { hreflang: "x-default", href: `${BASE_URL}/en` },
  ],
  it: [
    { hreflang: "it", href: `${BASE_URL}/it` },
    { hreflang: "it-IT", href: `${BASE_URL}/it` },
    { hreflang: "it-CH", href: `${BASE_URL}/it` },
  ],
  ru: [
    { hreflang: "ru", href: `${BASE_URL}/ru` },
  ],
};

const ogLocaleMap: Record<string, string> = {
  en: "en_IE",
  it: "it_IT",
  ru: "ru_RU",
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const alts = hreflangMap[locale] ?? [];
  const languages: Record<string, string> = {};
  for (const { hreflang, href } of alts) {
    languages[hreflang] = href;
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s | We Make IT`,
    },
    description: t("description"),
    keywords: [
      "app development ireland",
      "web development ireland",
      "custom app development",
      "idea validation",
      "mvp development",
      "startup app developer",
      "web application development",
      "mobile app development ireland",
      "software consultancy ireland",
      "ux design ireland",
      "sviluppo app irlanda",
      "развитие приложений",
    ],
    authors: [{ name: "We Make IT", url: BASE_URL }],
    creator: "We Make IT",
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}`,
      siteName: "We Make IT",
      locale: ogLocaleMap[locale] ?? "en_IE",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/api/og`,
          width: 1200,
          height: 630,
          alt: "We Make IT – Custom App & Web Development Ireland",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/images/favicon.PNG",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  // JSON-LD organisation schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "We Make IT",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    image: `${BASE_URL}/api/og`,
    description:
      "Custom app and website development for entrepreneurs and small businesses. Based in Ireland, working globally.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ashbourne",
      addressRegion: "Co. Meath",
      addressCountry: "IE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@wemakeit.ie",
      availableLanguage: ["English", "Italian", "Russian"],
    },
    areaServed: ["IE", "IT", "CH", "RU", "EU"],
    knowsLanguage: ["en", "it", "ru"],
    priceRange: "€€",
    sameAs: ["https://www.linkedin.com/in/svetlana-savchenko-08868764"],
  };

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        {/* WCAG 2.4.1: Skip navigation */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[9999] focus-visible:bg-[#22D3EE] focus-visible:text-[#0F172A] focus-visible:font-bold focus-visible:px-4 focus-visible:py-2 focus-visible:rounded"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Suspense fallback={null}>
            <CookieBanner />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
