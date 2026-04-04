import { DASHBOARD_INSIGHT } from '@/features/dashboard/data/dashboardMockData'

export function InsightCard() {
  return (
    <div className="card bg-base-200/60 border border-base-300">
      <div className="card-body p-5 space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-base-content/55 mb-1.5">
            Architectural Insight
          </p>
          <p className="text-sm font-semibold text-base-content leading-snug">
            {DASHBOARD_INSIGHT.headline}
          </p>
          <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
            {DASHBOARD_INSIGHT.body}
          </p>
        </div>

        <div className="divider my-0 border-base-300" />

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-base-content/55">
              Health Score
            </p>
            <span className="text-lg font-bold text-success tabular-nums">
              {DASHBOARD_INSIGHT.healthScore}
            </span>
          </div>
          <progress
            className="progress progress-success w-full progress-sm"
            value={DASHBOARD_INSIGHT.healthScore}
            max={100}
          />
          <p className="mt-2 text-xs text-base-content/55 leading-relaxed">
            {DASHBOARD_INSIGHT.healthLabel}
          </p>
        </div>
      </div>
    </div>
  )
}
