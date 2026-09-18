import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | We Make IT",
  description: "This page could not be found.",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-[#F8FAFC]">
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-3">
            We have lost this page
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mb-8">
            Much like this sock, it is nowhere to be found.
          </p>
          <div className="relative aspect-[3/2] w-full max-w-sm rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/404-page-not-found.jpg"
              alt="A single lost sock left stranded on a stick in the sand"
              fill
              className="object-cover"
              sizes="384px"
              priority
            />
          </div>
          <Link
            href="/en"
            className="inline-flex items-center justify-center min-h-[50px] px-7 bg-[#0F172A] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            Back to homepage
          </Link>
        </main>
      </body>
    </html>
  );
}
