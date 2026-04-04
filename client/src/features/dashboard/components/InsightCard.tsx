export function InsightCard() {
  return (
    <div className="card bg-base-200/60 border border-base-300">
      <div className="card-body p-5 space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-base-content/55 mb-1.5">
            Architectural Insight
          </p>
          <p className="text-sm font-semibold text-base-content leading-snug">
            Insight metrics are still being integrated
          </p>
          <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
            This panel is intentionally limited until evidence-based analytics are available from backend support.
          </p>
        </div>

        <div className="divider my-0 border-base-300" />

        <div className="rounded-xl border border-dashed border-base-300 bg-base-100 px-4 py-5 text-center">
          <p className="text-sm font-medium text-base-content">No computed health score yet.</p>
          <p className="mt-1 text-xs text-base-content/60">
            Trend analysis and predictive insights are intentionally out of scope for this pass.
          </p>
        </div>
      </div>
    </div>
  )
}
