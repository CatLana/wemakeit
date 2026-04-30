"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#0F172A] border border-[#22D3EE]/40 text-[#22D3EE] shadow-lg hover:bg-[#1E293B] hover:border-[#22D3EE] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
