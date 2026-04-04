import { SectionCard } from '@/shared/ui/data/SectionCard'
import { ActivityList } from '@/shared/ui/data/ActivityList'
import type { ActivityItem } from '@/shared/ui/data/ActivityList'

type ProjectActivityCardProps = {
  items: ActivityItem[]
}

export function ProjectActivityCard({ items }: ProjectActivityCardProps) {
  return (
    <SectionCard
      title="Recent Activity"
      subtitle="Latest actions on this project"
    >
      <ActivityList items={items} emptyMessage="No activity recorded yet." />
    </SectionCard>
  )
}
