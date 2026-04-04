type InsightPanelProps = {
  headline: string
  body: string
  healthScore: number
  healthLabel: string
}

export function InsightPanel({
  headline,
  body,
  healthScore,
  healthLabel,
}: InsightPanelProps) {
  return (
    <div className="space-y-4">
      <div className="card bg-base-200/60 border border-base-300">
        <div className="card-body p-5 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-base-content/55">
            Architectural Insight
          </p>
          <p className="text-sm font-semibold text-base-content leading-snug">
            {headline}
          </p>
          <p className="text-sm text-base-content/65 leading-relaxed">{body}</p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="card-body p-5 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-base-content/55">
            Health Score
          </p>
          <div className="flex items-center justify-between">
            <progress
              className="progress progress-success flex-1 progress-sm"
              value={healthScore}
              max={100}
            />
            <span className="ml-3 text-lg font-bold text-success tabular-nums">
              {healthScore}
            </span>
          </div>
          <p className="text-xs text-base-content/55 leading-relaxed">{healthLabel}</p>
        </div>
      </div>
    </div>
  )
}
