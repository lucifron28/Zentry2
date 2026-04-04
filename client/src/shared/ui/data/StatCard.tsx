type StatCardProps = {
  label: string
  value: string | number
  trend?: string
  trendUp?: boolean
  description?: string
}

export function StatCard({ label, value, trend, trendUp, description }: StatCardProps) {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body p-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-base-content/55">
          {label}
        </p>
        <p className="mt-2 text-3xl font-bold text-base-content">{value}</p>
        {trend ? (
          <p
            className={[
              'mt-1.5 text-xs font-medium',
              trendUp ? 'text-success' : 'text-error',
            ].join(' ')}
          >
            {trend}
          </p>
        ) : null}
        {description ? (
          <p className="mt-1 text-xs text-base-content/55">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
