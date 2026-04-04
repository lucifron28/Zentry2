import { StatCard } from '@/shared/ui/data/StatCard'
import { DASHBOARD_STATS } from '@/features/dashboard/data/dashboardMockData'

export function DashboardStatRow() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {DASHBOARD_STATS.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          trendUp={stat.trendUp}
          description={stat.description}
        />
      ))}
    </div>
  )
}
