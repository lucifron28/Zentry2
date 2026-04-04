import { StatCard } from '@/shared/ui/data/StatCard'
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardStats'

export function DashboardStatRow() {
  const { data, isLoading, isError } = useDashboardStats()

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
    {
      label: 'Total Projects',
      value: isError ? '-' : (data?.total_projects ?? 0),
      description: 'Projects where you are a member',
    },
    {
      label: 'Active Tasks',
      value: isError ? '-' : (data?.active_tasks ?? 0),
      description: 'Tasks currently in progress',
    },
    {
      label: 'Pending Reviews',
      value: isError ? '-' : (data?.pending_reviews ?? 0),
      description: 'Tasks waiting for review',
    },
    {
      label: 'Tasks With Due Dates',
      value: isError ? '-' : (data?.upcoming_deadlines_count ?? 0),
      description: 'Tasks that currently have a due date',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  )
}

