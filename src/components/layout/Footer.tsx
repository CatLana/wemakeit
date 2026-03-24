import Link from "next/link";
import { Mail, MapPin, Globe } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Frontend Development", href: "/#services" },
    { label: "Backend Development", href: "/#services" },
    { label: "Accessibility (WCAG)", href: "/#services" },
    { label: "UX Design", href: "/#services" },
    { label: "Website Development", href: "/#services" },
  ],
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "How It Works", href: "/#process" },
    { label: "Blog", href: "/blog" },
    { label: "Get a Quote", href: "/#quote" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Accessibility Statement", href: "/accessibility-statement" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="bg-[#0F172A] text-slate-400 border-t border-white/10"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="We Make IT - Home"
              className="inline-flex items-center text-white font-bold text-2xl mb-4 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              We Make <span className="text-[#22D3EE] ml-1">IT</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              We help entrepreneurs and small businesses turn their ideas into
              real apps and websites. Based in Ireland, working globally.
            </p>
            {/* Contact info */}
            <address className="not-italic text-sm space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <span>
                  32 Millbourne Drive,<br />
                  Ashbourne, Co. Meath, Ireland
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <a
                  href="mailto:info@wemakeit.ie"
                  className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  info@wemakeit.ie
                </a>
              </div>
            </address>
            {/* Language note */}
            <p className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
              <Globe size={12} aria-hidden="true" className="shrink-0" />
              <span>
                By the way, we also speak{" "}
                <span lang="it">Italiano</span> and{" "}
                <span lang="ru">Русский</span>.
              </span>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {section}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} We Make IT Sole Trader company registered in Ireland.
          </p>
        </div>
      </div>
    </footer>
  );
}
