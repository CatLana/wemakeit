import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import GetQuoteButton from "@/components/GetQuoteButton";

export const metadata: Metadata = {
  title: "Page not found | We Make IT",
  description: "This page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              404
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              We have lost this page
            </h1>
            <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
              Much like this sock, it is nowhere to be found. The rest of the
              site is still fully paired up.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="relative aspect-[3/2] max-w-md mx-auto rounded-2xl overflow-hidden mb-10">
            <Image
              src="/images/404-page-not-found.jpg"
              alt="A single lost sock left stranded on a stick in the sand"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 448px, 90vw"
              priority
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center min-h-[50px] px-7 bg-[#0F172A] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              Back to homepage
            </Link>
            <GetQuoteButton className="inline-flex items-center justify-center min-h-[50px] px-7 border border-slate-300 bg-white text-[#1E293B] font-semibold rounded-xl hover:bg-slate-50 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2">
              Get a free quote
            </GetQuoteButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
