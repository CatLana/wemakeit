import Link from "next/link";
import { Linkedin, Github, Twitter, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Custom Software", href: "#services" },
    { label: "Cloud Migration", href: "#services" },
    { label: "AI Strategy", href: "#services" },
    { label: "Managed IT", href: "#services" },
    { label: "Data Engineering", href: "#services" },
    { label: "Cybersecurity", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility", href: "#" },
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
              aria-label="We Make IT — Home"
              className="inline-flex items-center text-white font-bold text-2xl mb-4 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              We Make <span className="text-[#22D3EE] ml-1">IT</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Dublin-based software development company. Custom software, cloud &amp;
              AI solutions — built by Irish engineers, delivered on time, built to last.
            </p>
            {/* Contact info */}
            <address className="not-italic text-sm space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <span>
                  1 Grand Canal Square,<br />
                  Dublin 2, D02 P820, Ireland
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <a
                  href="mailto:hello@wemakeit.ie"
                  className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  hello@wemakeit.ie
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <a
                  href="tel:+35312345678"
                  className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  +353 1 234 5678
                </a>
              </div>
            </address>
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
            © {new Date().getFullYear()} We Make IT Ltd. Registered in Ireland. CRO No. 123456.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="We Make IT on LinkedIn (opens in new tab)"
              className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="We Make IT on GitHub (opens in new tab)"
              className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="We Make IT on X / Twitter (opens in new tab)"
              className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <Twitter size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
