"use client";

import { useState, useEffect, useRef, useCallback, startTransition } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const hideDiscoveryCta = pathname === "/book" || pathname === "/discovery-call";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  // Holds cleanup for the focus-trap listener, set asynchronously via rAF
  const trapCleanupRef = useRef<(() => void) | null>(null);

  const servicesMenu = t.raw("servicesMenu") as Array<{
    title: string;
    description: string;
    href: string;
  }>;

  const navLinks = [
    { label: t("nav.audit"), href: "/audit" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.aboutUs"), href: "/about" },
    { label: t("nav.ourWork"), href: "/work" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const closeServicesMenu = useCallback(() => {
    setServicesOpen(false);
  }, []);

  // Close the desktop services dropdown on outside click or Escape
  useEffect(() => {
    if (!servicesOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (
        servicesWrapRef.current &&
        !servicesWrapRef.current.contains(e.target as Node)
      ) {
        closeServicesMenu();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeServicesMenu();
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [servicesOpen, closeServicesMenu]);

  // Memoised so child onClick props are stable across renders
  const toggleMenu = useCallback(() => {
    startTransition(() => setOpen((prev) => !prev));
  }, []);

  const closeMenu = useCallback(() => {
    startTransition(() => {
      setOpen(false);
      setMobileServicesOpen(false);
    });
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
            : "bg-gradient-to-b from-[#0F172A]/70 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              aria-label={t("logoAriaLabel")}
              className="flex flex-col items-start focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <Image
                src="/images/logo_wemakeit.svg"
                alt=""
                width={350}
                height={110}
                className="h-14 w-auto block"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label={t("mainNavLabel")} className="hidden lg:flex items-center gap-8">
              <div ref={servicesWrapRef} className="relative">
                <button
                  ref={servicesButtonRef}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu-panel"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-slate-300 hover:text-[#22D3EE] transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {t("nav.whatWeDo")}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id="services-menu-panel"
                  aria-label={t("servicesMenuLabel")}
                  hidden={!servicesOpen}
                  className="absolute top-full left-0 mt-3 w-[600px] rounded-2xl bg-white shadow-2xl border border-slate-200 p-2 grid grid-cols-3 gap-1"
                >
                  {servicesMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as "/"}
                      onClick={closeServicesMenu}
                      className="block rounded-xl p-4 hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                    >
                      <p className="font-bold text-[#1E293B] text-sm mb-1.5">{item.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
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

            {/* Desktop right side: CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {!hideDiscoveryCta && (
                <Link
                  href="/discovery-call"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-5 py-2 bg-[#22D3EE] text-[#0F172A] font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  {t("cta")}
                </Link>
              )}
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
        className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] z-[60] bg-[#0F172A] transform transition-transform duration-300 lg:hidden ${
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
        <div className="px-6 pt-2 pb-2" />
        <nav aria-label={t("mobileNavLabel")}>
          <ul className="flex flex-col px-6 py-4 gap-2" role="list">
            <li>
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-group"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full h-11 text-slate-300 hover:text-[#22D3EE] transition-colors font-medium text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                {t("nav.whatWeDo")}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <ul
                id="mobile-services-group"
                hidden={!mobileServicesOpen}
                role="list"
                className="flex flex-col pl-4 border-l border-white/10 ml-1 mt-1 mb-1"
              >
                {servicesMenu.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href as "/"}
                      onClick={closeMenu}
                      className="flex items-center h-10 text-slate-400 hover:text-[#22D3EE] transition-colors text-sm focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
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
            {!hideDiscoveryCta && (
              <li className="mt-4">
                <Link
                  href="/discovery-call"
                  onClick={closeMenu}
                  className="flex items-center justify-center h-11 px-5 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
                >
                  {t("cta")}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
