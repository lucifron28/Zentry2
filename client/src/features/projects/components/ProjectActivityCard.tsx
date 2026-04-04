import { SectionCard } from '@/shared/ui/data/SectionCard'
import { ActivityList } from '@/shared/ui/data/ActivityList'
import type { ActivityItem } from '@/shared/ui/data/ActivityList'

type ProjectActivityCardProps = {
  items: ActivityItem[]
  subtitle?: string
  emptyMessage?: string
}

export function ProjectActivityCard({
  items,
  subtitle = 'Latest actions on this project',
  emptyMessage = 'No activity recorded yet.',
}: ProjectActivityCardProps) {
  return (
    <SectionCard
      title="Recent Activity"
      subtitle={subtitle}
    >
      <ActivityList items={items} emptyMessage={emptyMessage} />
    </SectionCard>
  )
}
