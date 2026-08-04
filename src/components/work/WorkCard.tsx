import { ArrowUpRight } from "lucide-react";
import LiveAppPreview from "./LiveAppPreview";

export type WorkApp = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  embed: "live" | "screenshot";
  image: string;
  imageAlt: string;
  accentColor: string;
  tags: string[];
  metrics: { value: string; label: string }[];
};

type WorkCardProps = {
  app: WorkApp;
  visitCta: string;
  liveLabel: string;
  screenshotComingSoonLabel: string;
};

export default function WorkCard({
  app,
  visitCta,
  liveLabel,
  screenshotComingSoonLabel,
}: WorkCardProps) {
  const hostname = new URL(app.url).hostname.replace(/^www\./, "");

  return (
    <li>
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col h-full rounded-2xl bg-white border border-slate-200 hover:border-[#22D3EE]/60 hover:shadow-xl transition-all duration-200 overflow-hidden focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
        aria-label={`${app.name} - ${visitCta} (opens in new tab)`}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border-b border-slate-200">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="ml-2 truncate text-xs text-slate-400 font-mono">{hostname}</span>
        </div>

        {/* Preview */}
        <div className="relative w-full aspect-[16/10] bg-slate-100">
          <LiveAppPreview
            url={app.url}
            name={app.name}
            embed={app.embed}
            image={app.image}
            imageAlt={app.imageAlt}
            liveLabel={liveLabel}
            screenshotComingSoonLabel={screenshotComingSoonLabel}
          />
        </div>

        {/* Copy */}
        <div className="flex flex-col flex-1 p-6">
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: app.accentColor }}
          >
            {app.tagline}
          </p>
          <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">
            {app.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            {app.description}
          </p>

          {app.metrics.length > 0 && (
            <dl className="grid grid-cols-3 gap-3 mb-4">
              {app.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{`${m.value} ${m.label}`}</dt>
                  <dd aria-hidden="true" className="text-sm font-extrabold text-[#1E293B]">
                    {m.value}
                  </dd>
                  <dd aria-hidden="true" className="text-[11px] text-slate-500 leading-tight">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <ul
            className="flex flex-wrap gap-1.5 mb-5"
            role="list"
            aria-label={`Technology used to build ${app.name}`}
          >
            {app.tags.map((tag) => (
              <li
                key={tag}
                className="text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#0E7490] group-hover:text-[#22D3EE] transition-colors">
            {visitCta}
            <ArrowUpRight size={14} aria-hidden="true" />
          </div>
        </div>
      </a>
    </li>
  );
}
