export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'overdue' | 'planning'

const STATUS_CLASSES: Record<ProjectStatus, string> = {
  active: 'badge-success',
  completed: 'badge-info',
  planning: 'badge-neutral',
  'on-hold': 'badge-warning',
  overdue: 'badge-error',
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  planning: 'Planning',
  'on-hold': 'On Hold',
  overdue: 'Overdue',
}

type StatusBadgeProps = {
  status: ProjectStatus
  size?: 'xs' | 'sm'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  return (
    <span className={['badge font-medium', STATUS_CLASSES[status], `badge-${size}`].join(' ')}>
      {STATUS_LABELS[status]}
    </span>
  )
}
