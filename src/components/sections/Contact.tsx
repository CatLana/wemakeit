"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

function Field({
  id,
  label,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#1E293B]"
      >
        {label}
        {required && (
          <span className="text-rose-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-rose-500 font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    // TODO: replace with Resend / API endpoint
    console.log("Form submitted:", data);
    await new Promise((r) => setTimeout(r, 800));
    reset();
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — copy + contact details */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Get in Touch
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6"
            >
              Let&apos;s Talk
            </h2>
            <p className="text-slate-500 leading-relaxed mb-10 text-lg">
              Whether you have a project in mind or just want to explore what&apos;s
              possible — we&apos;d love to hear from you. First consultation is always free.
            </p>

            <address className="not-italic space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Office</p>
                  <p className="text-sm text-slate-500">
                    1 Grand Canal Square, Dublin 2,<br />D02 P820, Ireland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <Mail size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Email</p>
                  <a
                    href="mailto:hello@wemakeit.ie"
                    className="text-sm text-[#22D3EE] hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    hello@wemakeit.ie
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <Phone size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Phone</p>
                  <a
                    href="tel:+35312345678"
                    className="text-sm text-[#22D3EE] hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    +353 1 234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <Linkedin size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">LinkedIn</p>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#22D3EE] hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    linkedin.com/company/wemakeit
                  </a>
                </div>
              </div>
            </address>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
            {isSubmitSuccessful ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center h-full text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-[#22D3EE]/15 flex items-center justify-center mb-5">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                  Message sent!
                </h3>
                <p className="text-slate-500 text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Contact form"
                className="flex flex-col gap-5"
              >
                <p className="text-xs text-slate-400">
                  Fields marked <span aria-hidden="true" className="text-rose-500">*</span>
                  <span className="sr-only">with an asterisk</span> are required.
                </p>

                <Field id="name" label="Full name" error={errors.name?.message} required>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Murphy"
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-200"}`}
                    {...register("name")}
                  />
                </Field>

                <Field id="email" label="Work email" error={errors.email?.message} required>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.ie"
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
                    {...register("email")}
                  />
                </Field>

                <Field id="company" label="Company (optional)" error={errors.company?.message}>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Ltd."
                    aria-describedby={errors.company ? "company-error" : undefined}
                    className={`${inputBase} ${errors.company ? "border-rose-400" : "border-slate-200"}`}
                    {...register("company")}
                  />
                </Field>

                <Field id="message" label="How can we help?" error={errors.message?.message} required>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                    className={`${inputBase} resize-y min-h-[120px] ${errors.message ? "border-rose-400" : "border-slate-200"}`}
                    {...register("message")}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="mt-1 inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
