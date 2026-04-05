import { useState } from 'react'
import { PageHeader } from '@/shared/ui/data/PageHeader'
import { DashboardStatRow } from '@/features/dashboard/components/DashboardStatRow'
import { RecentActivityCard } from '@/features/dashboard/components/RecentActivityCard'
import { FocusTasksCard } from '@/features/dashboard/components/FocusTasksCard'
import { ActiveProjectsCard } from '@/features/dashboard/components/ActiveProjectsCard'
import { InsightCard } from '@/features/dashboard/components/InsightCard'
import { CreateProjectModal } from '@/features/projects/components/CreateProjectModal'

export function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <section className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Track summary metrics and current progress snapshots across projects and tasks."
        action={
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsCreateModalOpen(true)}
            aria-label="Create new project"
          >
            + New Project
          </button>
        }
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

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={() => {
          // Typically we would trigger a refresh or show a notification
          // but for now, just closing is enough as per current flow
        }}
      />
    </section>
  )
}
