"use client";

import { useState, useEffect, useRef, useCallback, startTransition } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  // Holds cleanup for the focus-trap listener, set asynchronously via rAF
  const trapCleanupRef = useRef<(() => void) | null>(null);

  const navLinks = [
    { label: t("nav.whatWeDo"), href: "/#services" },
    { label: t("nav.aboutUs"), href: "/#about" },
    { label: t("nav.howItWorks"), href: "/#process" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.talkToUs"), href: "/#quote" },
  ];

  // Memoised so child onClick props are stable across renders
  const toggleMenu = useCallback(() => {
    startTransition(() => setOpen((prev) => !prev));
  }, []);

  const closeMenu = useCallback(() => {
    startTransition(() => setOpen(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Single effect for all open-dependent side-effects
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (!open) {
      // Clean up any previously registered focus-trap listener
      trapCleanupRef.current?.();
      trapCleanupRef.current = null;
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);

    // Defer DOM scan + focus + trap registration off the click's critical path.
    // rAF fires after paint so it doesn't block INP.
    const rafId = requestAnimationFrame(() => {
      const el = drawerRef.current;
      if (!el) return;
      const sel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusables = Array.from(el.querySelectorAll<HTMLElement>(sel));
      focusables[0]?.focus({ preventScroll: true });

      const trapFocus = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener("keydown", trapFocus);
      trapCleanupRef.current = () => document.removeEventListener("keydown", trapFocus);
    });

    return () => {
      document.removeEventListener("keydown", handleEscape);
      cancelAnimationFrame(rafId);
      trapCleanupRef.current?.();
      trapCleanupRef.current = null;
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

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
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              aria-label={t("logoAriaLabel")}
              className="flex items-center gap-1 text-white font-bold text-xl focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <span>We Make&nbsp;</span>
              <span className="text-[#22D3EE]">IT</span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label={t("mainNavLabel")} className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as "/"}
                  className="text-slate-300 hover:text-[#22D3EE] transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right side: Language switcher + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    import("@/components/sections/Contact").then(mod => {
                      if (mod.focusContactForm) mod.focusContactForm();
                    });
                  }
                }}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-5 py-2 bg-[#22D3EE] text-[#0F172A] font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                {t("cta")}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center w-11 h-11 text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay — always in DOM, toggled via CSS to avoid layout cost of mount/unmount */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer — role=dialog + aria-modal so AT restricts navigation
           to this panel; a JS focus trap handles keyboard-only users. */}
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("mobileNavLabel")}
        className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] z-50 bg-[#0F172A] transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <span className="text-white font-bold text-xl">
            We Make <span className="text-[#22D3EE]">IT</span>
          </span>
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => { closeMenu(); hamburgerRef.current?.focus(); }}
            className="flex items-center justify-center w-11 h-11 text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="px-6 pt-5 pb-2">
          <LanguageSwitcher />
        </div>
        <nav aria-label={t("mobileNavLabel")}>
          <ul className="flex flex-col px-6 py-4 gap-2" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as "/"}
                  onClick={closeMenu}
                  className="flex items-center h-11 text-slate-300 hover:text-[#22D3EE] transition-colors font-medium text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  if (typeof window !== "undefined") {
                    import("@/components/sections/Contact").then(mod => {
                      if (mod.focusContactForm) mod.focusContactForm();
                    });
                  }
                }}
                className="flex items-center justify-center h-11 px-5 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
              >
                {t("cta")}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
