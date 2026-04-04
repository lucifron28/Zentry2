import { SectionCard } from '@/shared/ui/data/SectionCard'
import { ActivityList } from '@/shared/ui/data/ActivityList'
import { RECENT_ACTIVITY } from '@/features/dashboard/data/dashboardMockData'

export function RecentActivityCard() {
  return (
    <SectionCard
      title="Recent Activity"
      subtitle="Latest updates across all projects"
    >
      <ActivityList items={RECENT_ACTIVITY} />
    </SectionCard>
  )
}
