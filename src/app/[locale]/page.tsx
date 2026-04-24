import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Founder from "@/components/sections/Founder";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import CtaStrip from "@/components/sections/CtaStrip";

// Lazy-load the heavy Contact section: defers react-hook-form, zod and
// @hookform/resolvers from the initial JS bundle (~105 KiB savings).
const Contact = dynamic(() => import("@/components/sections/Contact"));

const BASE_URL = "https://www.wemakeit.ie";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Web Development & App Development Ireland | We Make IT",
    it: "Sviluppo Web e App Italia | We Make IT",
    ru: "Веб-разработка и разработка приложений Ирландия | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Custom web development and app development in Ireland. Build your business idea from MVP to production. 15+ years experience, fixed pricing. Free consultation.",
    it: "Sviluppo web personalizzato e app development in Italia. Dalla validazione dell'idea alla produzione. Consulenza gratuita.",
    ru: "Разработка веб-сайтов и приложений в Ирландии. От валидации идеи до производства. Бесплатная консультация.",
  };

  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    title: titles[locale] || titles["en"],
    description: descriptions[locale] || descriptions["en"],
    keywords: locale === "en" 
      ? "web development Ireland, app development Ireland, web developer Ireland, custom software development, MVP development"
      : locale === "it"
      ? "sviluppo web Italia, app development Italia, sviluppatore web, software personalizzato"
      : "веб-разработка Ирландия, разработка приложений, разработчик веб",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en`,
        en: `${BASE_URL}/en`,
        it: `${BASE_URL}/it`,
        ru: `${BASE_URL}/ru`,
      },
    },
    openGraph: {
      title: titles[locale] || titles["en"],
      description: descriptions[locale] || descriptions["en"],
      url: canonicalUrl,
      type: "website",
      siteName: "We Make IT",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Stats />
        <Services />
        <Founder />
        <About />
        <Process />
        <CtaStrip />
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Footer />

      {/* JSON-LD Schema for Organization & Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "We Make IT",
            description:
              "Web development and app development services in Ireland, Italy, and Switzerland. 15+ years experience.",
            url: BASE_URL,
            image: `${BASE_URL}/og-image.png`,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ashbourne",
              addressLocality: "Meath",
              addressRegion: "Ireland",
              postalCode: "IE",
              addressCountry: "IE",
            },
            sameAs: [
              "https://www.linkedin.com/company/we-make-it",
              "https://clutch.co/companies/we-make-it",
            ],
            priceRange: "€1,500 - €80,000+",
            serviceArea: [
              {
                "@type": "Country",
                name: "Ireland",
              },
              {
                "@type": "Country",
                name: "Italy",
              },
              {
                "@type": "Country",
                name: "Switzerland",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD Schema for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "We Make IT",
            url: BASE_URL,
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              email: "contact@wemakeit.ie",
            },
          }),
        }}
      />
    </>
  );
}
