"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "What We Do", href: "/#services" },
  { label: "About Us", href: "/#about" },
  { label: "How It Works", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Talk to Us", href: "/#quote" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F172A]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              aria-label="We Make IT - Home"
              className="flex items-center gap-1 text-white font-bold text-xl focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <span>We Make&nbsp;</span>
              <span className="text-[#22D3EE]">IT</span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-[#22D3EE] transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href="/#quote"
              className="hidden md:inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-5 py-2 bg-[#22D3EE] text-[#0F172A] font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a quote
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`fixed top-0 left-0 h-full w-72 z-50 bg-[#0F172A] transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <span className="text-white font-bold text-xl">
            We Make <span className="text-[#22D3EE]">IT</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-11 h-11 text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-8 gap-2" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center h-11 text-slate-300 hover:text-[#22D3EE] transition-colors font-medium text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href="/#quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center h-11 px-5 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors"
            >
              Get a quote
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
