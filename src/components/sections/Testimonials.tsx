"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "We Make IT delivered a fully custom platform in 6 months, on time and under budget. Their engineers became part of our team and we still work with them 4 years later.",
    author: "Sarah O'Brien",
    title: "CTO",
    company: "Bright Finance",
    initials: "SO",
  },
  {
    quote:
      "From day one they challenged our thinking, suggested better approaches, and were completely transparent with us. I can't recommend them highly enough.",
    author: "Ciarán Murphy",
    title: "Head of Product",
    company: "HealthNode",
    initials: "CM",
  },
  {
    quote:
      "Our legacy system was holding us back. We Make IT migrated everything to the cloud in under 3 months with zero downtime. Exceptional work.",
    author: "Niamh Kelly",
    title: "Director of IT",
    company: "GreenGrid",
    initials: "NK",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const { quote, author, title, company, initials } = testimonials[current];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#0F172A] py-20 lg:py-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
          Testimonials
        </span>
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-extrabold text-white mb-12"
        >
          What our clients say
        </h2>

        {/* Carousel */}
        <div
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Testimonial ${current + 1} of ${total}`}
        >
          <figure className="relative">
            {/* Quote marks */}
            <span
              aria-hidden="true"
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl text-[#22D3EE]/20 font-serif leading-none select-none"
            >
              &ldquo;
            </span>

            <blockquote className="relative z-10 text-lg sm:text-xl lg:text-2xl text-white leading-relaxed font-light italic mb-10 pt-6">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <figcaption className="flex flex-col items-center gap-3">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full bg-[#22D3EE] flex items-center justify-center text-[#0F172A] font-bold text-lg"
                aria-hidden="true"
              >
                {initials}
              </div>
              <div>
                <cite className="not-italic font-semibold text-white block">
                  {author}
                </cite>
                <span className="text-sm text-slate-400">
                  {title}, {company}
                </span>
              </div>
            </figcaption>
          </figure>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 ${
                  i === current
                    ? "bg-[#22D3EE] w-6"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
