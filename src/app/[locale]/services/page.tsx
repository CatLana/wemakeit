import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "services";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  const titles: Record<string, string> = {
    en: "Our Services | Web Development, App Development & UX Audit | We Make IT",
    it: "I Nostri Servizi | Sviluppo Web e App | We Make IT",
    ru: "Наши услуги | Веб-разработка, разработка приложений | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Web development, app development, UX research, and accessibility audits for Irish businesses. Discover our services and find the right solution for your needs.",
    it: "Sviluppo web, sviluppo app, ricerca UX e audit di accessibilità. Scopri i nostri servizi.",
    ru: "Веб-разработка, разработка приложений, исследования UX и проверка доступности.",
  };

  return {
    title: titles[locale] || titles["en"],
    description: descriptions[locale] || descriptions["en"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
        it: `${BASE_URL}/it/${SLUG}`,
        ru: `${BASE_URL}/ru/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] || titles["en"],
      description: descriptions[locale] || descriptions["en"],
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = [
    {
      title: "Web Development",
      description: "Custom business websites, CMS platforms, and e-commerce solutions",
      href: "/services/web-development",
      icon: "🌐",
    },
    {
      title: "App Development",
      description: "Mobile apps (iOS/Android), web apps, and progressive web apps",
      href: "/services/app-development",
      icon: "📱",
    },
    {
      title: "UX & Accessibility Audit",
      description: "WCAG compliance, accessibility audits, and UX improvements",
      href: "/services/ux-accessibility-audit",
      icon: "♿",
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="py-16 md:py-24 bg-slate-950 text-slate-50">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <nav aria-label="Breadcrumb" className="mb-12">
              <ol className="flex items-center gap-2 text-sm text-slate-400">
                <li><Link href="/" className="text-cyan-400 hover:text-cyan-300">Home</Link></li>
                <li>/</li>
                <li className="text-slate-300">Services</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
              Our Services
            </h1>

            <p className="text-lg text-slate-300 mb-12 max-w-3xl">
              We offer a complete range of development and consulting services for Irish businesses, from idea validation to production-ready products. Everything under one roof.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300">
                    {service.title}
                  </h2>
                  <p className="text-slate-300 group-hover:text-slate-200">
                    {service.description}
                  </p>
                  <div className="mt-6 text-cyan-400 group-hover:text-cyan-300 font-bold">
                    Learn more →
                  </div>
                </Link>
              ))}
            </div>

            <div className="cta-section text-center">
              <h3 className="text-xl font-bold text-slate-50 mb-4">Not sure which service fits your needs?</h3>
              <Link href="/contact" className="inline-block px-8 py-3 bg-cyan-400 text-slate-950 rounded-lg font-bold hover:bg-cyan-300">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
