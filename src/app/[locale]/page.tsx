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
  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "x-default": `${BASE_URL}/en`,
        en: `${BASE_URL}/en`,
        it: `${BASE_URL}/it`,
        ru: `${BASE_URL}/ru`,
      },
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
    </>
  );
}
