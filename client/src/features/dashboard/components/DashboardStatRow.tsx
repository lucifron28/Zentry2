import { StatCard } from '@/shared/ui/data/StatCard'
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardStats'

export function DashboardStatRow() {
  const { data, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card bg-base-100 border border-base-200">
            <div className="card-body p-4 sm:p-5 gap-1 animate-pulse">
              <div className="h-4 w-20 bg-base-300 rounded mb-2"></div>
              <div className="h-8 w-16 bg-base-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const stats = [
    { label: 'Active Projects', value: data?.total_projects ?? 0, trend: '+2', trendUp: true, description: 'vs last month' },
    { label: 'Pending Tasks', value: data?.active_tasks ?? 0, trend: '-18%', trendUp: true, description: 'completion rate up' },
    { label: 'In Review', value: data?.pending_reviews ?? 0, trend: '4', trendUp: false, description: 'requires action' },
    { label: 'Upcoming Deadlines', value: data?.upcoming_deadlines_count ?? 0, trend: '0', trendUp: true, description: 'this week' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {stats.map((stat) => (
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

