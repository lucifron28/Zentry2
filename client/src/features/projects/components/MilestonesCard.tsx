import { SectionCard } from '@/shared/ui/data/SectionCard'

export type Milestone = {
  id: string
  title: string
  dueLabel: string
  assignee: string
  overdue?: boolean
}

type MilestonesCardProps = {
  milestones: Milestone[]
}

export function MilestonesCard({ milestones }: MilestonesCardProps) {
  if (milestones.length === 0) {
    return (
      <SectionCard title="Active Milestones" subtitle="Tracked checkpoints for this project">
        <p className="py-4 text-center text-sm text-base-content/55">
          No milestones defined yet.
        </p>
      </SectionCard>
    )
  }

  return (
    <SectionCard
      title="Active Milestones"
      subtitle={`${milestones.length} checkpoint${milestones.length !== 1 ? 's' : ''} tracked`}
    >
      <ul className="space-y-3">
        {milestones.map((milestone) => (
          <li
            key={milestone.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-base-200 bg-base-100 px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-base-content leading-snug truncate">
                {milestone.title}
              </p>
              <p
                className={[
                  'mt-0.5 text-xs',
                  milestone.overdue ? 'text-error font-medium' : 'text-base-content/50',
                ].join(' ')}
              >
                {milestone.dueLabel}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-xs text-base-content/50 leading-snug">{milestone.assignee}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
