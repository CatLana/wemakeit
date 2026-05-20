import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import CtaStrip from "@/components/sections/CtaStrip";
import FreeAuditBanner from "@/components/sections/FreeAuditBanner";

// Lazy-load the heavy Contact section: defers react-hook-form, zod and
// @hookform/resolvers from the initial JS bundle (~105 KiB savings).
const Contact = dynamic(() => import("@/components/sections/Contact"));

const BASE_URL = "https://www.wemakeit.ie";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Websites and Applications Development that Grow Your Business | We Make IT",
    it: "Sviluppo di Siti Web e Applicazioni per Far Crescere la Tua Azienda | We Make IT",
    ru: "Разработка сайтов и приложений для роста вашего бизнеса | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Custom digital solutions to improve your online presence. Free consultations and technical audits. Over 15 years of experience in IT, fixed pricing.",
    it: "Soluzioni digitali su misura per migliorare la tua presenza online. Consulenze gratuite e audit tecnici. Oltre 15 anni di esperienza in IT, prezzi fissi.",
    ru: "Индивидуальные цифровые решения для улучшения вашего бренда онлайн. Бесплатные консультации и технические аудиты. Более 15 лет опыта в IT, фиксированные цены.",
  };

  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    title: titles[locale] || titles["en"],
    description: descriptions[locale] || descriptions["en"],
    keywords: locale === "en"
      ? [
          "web development ireland",
          "website design ireland",
          "web design ireland",
          "app development ireland",
          "web designer ireland",
          "digital agency ireland",
          "small business website ireland",
          "custom software development ireland",
          "mvp development ireland",
          "mobile app development ireland",
          "web development agency meath",
          "web developer ashbourne",
        ]
      : locale === "it"
      ? [
          "sviluppo web irlanda",
          "sviluppo app irlanda",
          "agenzia web irlanda",
          "sviluppo siti web personalizzati",
          "sviluppo software irlanda",
          "sviluppo app mobili irlanda",
        ]
      : [
          "веб разработка ирландия",
          "разработка приложений ирландия",
          "разработка сайтов ирландия",
          "разработка мобильных приложений ирландия",
        ],
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
      images: [
        {
          url: `${BASE_URL}/images/wemakeit_thumbnail.png`,
          width: 1200,
          height: 630,
          alt: "We Make IT — Web & App Development Ireland",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles["en"],
      description: descriptions[locale] || descriptions["en"],
      images: [`${BASE_URL}/images/wemakeit_thumbnail.png`],
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
        <Services />
        <Stats />
        <About />
        <FreeAuditBanner />
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
            "@type": ["LocalBusiness", "ProfessionalService"],
            name: "We Make IT",
            description:
              "Web development and app development services in Ireland, Italy, and Switzerland. 15+ years experience.",
            url: BASE_URL,
            image: `${BASE_URL}/images/wemakeit_thumbnail.png`,
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
              email: "info@wemakeit.ie",
            },
          }),
        }}
      />
    </>
  );
}
