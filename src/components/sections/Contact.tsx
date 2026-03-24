"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Linkedin, Tag } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.enum(
    ["web-app", "mobile-app", "website", "e-commerce", "redesign", "other"],
    { message: "Please select a project type" }
  ),
  description: z
    .string()
    .min(10, "Please describe your project in at least 10 characters"),
  budget: z.enum(
    ["under-5k", "5k-15k", "15k-30k", "30k-50k", "over-50k", "not-sure"],
    { message: "Please select a budget range" }
  ),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "flexible"], {
    message: "Please select a timeline",
  }),
  hasDesign: z.enum(["yes", "partial", "no"], {
    message: "Please select an option",
  }),
  competitorQuote: z.string().optional(),
  heardAbout: z.string().optional(),
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
      <label htmlFor={id} className="text-sm font-medium text-[#1E293B]">
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

const selectBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE] appearance-none";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    // TODO: replace with Resend / API endpoint
    console.log("Quote request submitted:", data);
    await new Promise((r) => setTimeout(r, 800));
    reset();
  }

  return (
    <section
      id="quote"
      aria-labelledby="contact-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — copy + contact details */}
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Get a Quote
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6"
            >
              Tell Us Your Idea
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6 text-lg">
              Fill in the form and describe your idea in your own words. There
              are no wrong answers. We will get back to you quickly to arrange
              a free chat and help you figure out the best path forward.
            </p>

            {/* Early bird highlight */}
            <div className="rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 p-5 mb-8">
              <p className="text-sm font-semibold text-[#0F172A] mb-1 flex items-center gap-1.5">
                <Tag size={14} aria-hidden="true" className="text-[#22D3EE]" />
                Early Bird Offer
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are taking on our first clients and offering generous
                discounts. This will not last long.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Already have a quote from another company?{" "}
                <strong className="text-[#0F172A]">Send it to us and we will beat it.</strong>
              </p>
            </div>

            <address className="not-italic space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <MapPin
                    size={18}
                    className="text-[#22D3EE]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Office</p>
                  <p className="text-sm text-slate-500">
                    32 Millbourne Drive,
                    <br />
                    Ashbourne, Co. Meath, Ireland
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
                    href="mailto:info@wemakeit.ie"
                    className="text-sm text-[#22D3EE] hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    info@wemakeit.ie
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <Linkedin
                    size={18}
                    className="text-[#22D3EE]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">
                    LinkedIn
                  </p>
                  <a
                    href="https://linkedin.com/company/wemakeit"
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

          {/* Right — quote form */}
          <div className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
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
                  Quote request sent!
                </h3>
                <p className="text-slate-500 text-sm">
                  Thanks for reaching out. We&apos;ll review your request and
                  get back to you quickly with a quote.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Quote request form"
                className="flex flex-col gap-5"
              >
                <p className="text-xs text-slate-400">
                  Fields marked{" "}
                  <span aria-hidden="true" className="text-rose-500">
                    *
                  </span>
                  <span className="sr-only">with an asterisk</span> are
                  required.
                </p>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    id="name"
                    label="Full name"
                    error={errors.name?.message}
                    required
                  >
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

                  <Field
                    id="email"
                    label="Email address"
                    error={errors.email?.message}
                    required
                  >
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.ie"
                      aria-required="true"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
                      {...register("email")}
                    />
                  </Field>

                  <Field
                    id="company"
                    label="Company (optional)"
                    error={errors.company?.message}
                  >
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Ltd."
                      className={`${inputBase} border-slate-200`}
                      {...register("company")}
                    />
                  </Field>

                  <Field
                    id="phone"
                    label="Phone (optional)"
                    error={errors.phone?.message}
                  >
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+353 ..."
                      className={`${inputBase} border-slate-200`}
                      {...register("phone")}
                    />
                  </Field>
                </div>

                {/* Project type */}
                <Field
                  id="projectType"
                  label="What type of project do you need?"
                  error={errors.projectType?.message}
                  required
                >
                  <select
                    id="projectType"
                    aria-required="true"
                    aria-describedby={
                      errors.projectType ? "projectType-error" : undefined
                    }
                    aria-invalid={!!errors.projectType}
                    className={`${selectBase} ${errors.projectType ? "border-rose-400" : "border-slate-200"}`}
                    defaultValue=""
                    {...register("projectType")}
                  >
                    <option value="" disabled>
                      Select a type…
                    </option>
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="website">Website / Landing Page</option>
                    <option value="e-commerce">E-Commerce Store</option>
                    <option value="redesign">Redesign / Rebuild</option>
                    <option value="other">Other</option>
                  </select>
                </Field>

                {/* Project description */}
                <Field
                  id="description"
                  label="Describe your project idea"
                  error={errors.description?.message}
                  required
                >
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Tell us what you want to build, who it is for, and what problem it solves…"
                    aria-required="true"
                    aria-describedby={
                      errors.description ? "description-error" : undefined
                    }
                    aria-invalid={!!errors.description}
                    className={`${inputBase} resize-y min-h-[100px] ${errors.description ? "border-rose-400" : "border-slate-200"}`}
                    {...register("description")}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Budget */}
                  <Field
                    id="budget"
                    label="Estimated budget"
                    error={errors.budget?.message}
                    required
                  >
                    <select
                      id="budget"
                      aria-required="true"
                      aria-describedby={
                        errors.budget ? "budget-error" : undefined
                      }
                      aria-invalid={!!errors.budget}
                      className={`${selectBase} ${errors.budget ? "border-rose-400" : "border-slate-200"}`}
                      defaultValue=""
                      {...register("budget")}
                    >
                      <option value="" disabled>
                        Select a range…
                      </option>
                      <option value="under-5k">Under €5,000</option>
                      <option value="5k-15k">€5,000 – €15,000</option>
                      <option value="15k-30k">€15,000 – €30,000</option>
                      <option value="30k-50k">€30,000 – €50,000</option>
                      <option value="over-50k">Over €50,000</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </Field>

                  {/* Timeline */}
                  <Field
                    id="timeline"
                    label="Desired timeline"
                    error={errors.timeline?.message}
                    required
                  >
                    <select
                      id="timeline"
                      aria-required="true"
                      aria-describedby={
                        errors.timeline ? "timeline-error" : undefined
                      }
                      aria-invalid={!!errors.timeline}
                      className={`${selectBase} ${errors.timeline ? "border-rose-400" : "border-slate-200"}`}
                      defaultValue=""
                      {...register("timeline")}
                    >
                      <option value="" disabled>
                        Select a timeline…
                      </option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-3-months">1 – 3 months</option>
                      <option value="3-6-months">3 – 6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </Field>
                </div>

                {/* Do you have a design? */}
                <Field
                  id="hasDesign"
                  label="Do you have existing designs or mockups?"
                  error={errors.hasDesign?.message}
                  required
                >
                  <select
                    id="hasDesign"
                    aria-required="true"
                    aria-describedby={
                      errors.hasDesign ? "hasDesign-error" : undefined
                    }
                    aria-invalid={!!errors.hasDesign}
                    className={`${selectBase} ${errors.hasDesign ? "border-rose-400" : "border-slate-200"}`}
                    defaultValue=""
                    {...register("hasDesign")}
                  >
                    <option value="" disabled>
                      Select an option…
                    </option>
                    <option value="yes">Yes, I have designs ready</option>
                    <option value="partial">
                      Partial: I have some ideas or wireframes
                    </option>
                    <option value="no">No, starting from scratch</option>
                  </select>
                </Field>

                {/* Competitor quote */}
                <Field
                  id="competitorQuote"
                  label="Have a quote from another company? (optional)"
                  error={errors.competitorQuote?.message}
                >
                  <input
                    id="competitorQuote"
                    type="text"
                    placeholder="e.g. €12,000 from XYZ Agency. We will beat it!"
                    className={`${inputBase} border-slate-200`}
                    {...register("competitorQuote")}
                  />
                </Field>

                {/* How did you hear about us */}
                <Field
                  id="heardAbout"
                  label="How did you hear about us? (optional)"
                  error={errors.heardAbout?.message}
                >
                  <input
                    id="heardAbout"
                    type="text"
                    placeholder="Google, LinkedIn, a friend…"
                    className={`${inputBase} border-slate-200`}
                    {...register("heardAbout")}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="mt-1 inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
                >
                  {isSubmitting ? "Sending…" : "Send my quote request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
