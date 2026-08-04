"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type LiveAppPreviewProps = {
  url: string;
  name: string;
  embed: "live" | "screenshot";
  image: string;
  imageAlt: string;
  liveLabel: string;
  screenshotComingSoonLabel: string;
};

export default function LiveAppPreview({
  url,
  name,
  embed,
  image,
  imageAlt,
  liveLabel,
  screenshotComingSoonLabel,
}: LiveAppPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || embed !== "live") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [embed]);

  if (embed === "live") {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        {isVisible && (
          <iframe
            src={url}
            title={`Live preview of ${name}`}
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] border-0 pointer-events-none"
          />
        )}
        <span className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#0E7490] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          {liveLabel}
        </span>
      </div>
    );
  }

  if (image) {
    return (
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-contain p-4"
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-sm text-slate-400">
      {screenshotComingSoonLabel}
    </div>
  );
}
