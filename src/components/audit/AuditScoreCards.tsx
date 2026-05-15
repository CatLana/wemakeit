import { BarChart2, Eye, Search, ShieldCheck } from "lucide-react";

export interface AuditScoreMetric {
  id: "performance" | "accessibility" | "seo" | "bestPractices";
  label: string;
  score: number;
}

function scoreColor(score: number): string {
  if (score >= 90) return "#22C55E";
  if (score >= 70) return "#22D3EE";
  if (score >= 50) return "#F59E0B";
  return "#EF4444";
}

function metricIcon(id: AuditScoreMetric["id"]) {
  switch (id) {
    case "performance":
      return BarChart2;
    case "accessibility":
      return Eye;
    case "seo":
      return Search;
    case "bestPractices":
      return ShieldCheck;
  }
}

export default function AuditScoreCards({
  metrics,
  note,
  ariaHidden = false,
}: {
  metrics: AuditScoreMetric[];
  note?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex w-full flex-col gap-4">
      {metrics.map((metric) => {
        const Icon = metricIcon(metric.id);
        const color = scoreColor(metric.score);

        return (
          <div
            key={metric.id}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
              <Icon size={18} style={{ color }} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1.5 text-xs font-semibold text-slate-300">{metric.label}</p>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${Math.max(0, Math.min(100, metric.score))}%`, backgroundColor: color }}
                />
              </div>
            </div>
            <span className="text-sm font-bold tabular-nums" style={{ color }}>
              {metric.score}
            </span>
          </div>
        );
      })}

      {note ? <p className="text-center text-xs text-slate-500">{note}</p> : null}
    </div>
  );
}
