import { PageHeader } from '@/shared/ui/data/PageHeader'
import { DashboardStatRow } from '@/features/dashboard/components/DashboardStatRow'
import { RecentActivityCard } from '@/features/dashboard/components/RecentActivityCard'
import { FocusTasksCard } from '@/features/dashboard/components/FocusTasksCard'
import { ActiveProjectsCard } from '@/features/dashboard/components/ActiveProjectsCard'
import { InsightCard } from '@/features/dashboard/components/InsightCard'

export function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Track summary metrics and current progress snapshots across projects and tasks."
      />

      {/* Stat summary row */}
      <DashboardStatRow />

      {/* Main content — 2-column on large screens */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Left column — wider */}
        <div className="space-y-5 lg:col-span-3">
          <RecentActivityCard />
          <ActiveProjectsCard />
        </div>

        {/* Right column — narrower */}
        <div className="space-y-5 lg:col-span-2">
          <FocusTasksCard />
          <InsightCard />
        </div>
      </div>
    </section>
  )
}
