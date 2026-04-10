export type ProjectStatus = 'active' | 'on_hold' | 'completed' | 'overdue' | 'planning'
export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done' | 'blocked'
export type AnyStatus = ProjectStatus | TaskStatus

const STATUS_CLASSES: Record<AnyStatus, string> = {
  // Project Statuses
  active: 'badge-success',
  completed: 'badge-info',
  planning: 'badge-neutral',
  on_hold: 'badge-warning',
  overdue: 'badge-error',
  // Task Statuses
  todo: 'badge-neutral',
  in_progress: 'badge-primary',
  in_review: 'badge-secondary',
  done: 'badge-success',
  blocked: 'badge-error',
}

const STATUS_LABELS: Record<AnyStatus, string> = {
  // Project Statuses
  active: 'Active',
  completed: 'Completed',
  planning: 'Planning',
  on_hold: 'On Hold',
  overdue: 'Overdue',
  // Task Statuses
  todo: 'Todo',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
  blocked: 'Blocked',
}

type StatusBadgeProps = {
  status: AnyStatus
  size?: 'xs' | 'sm'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={['badge font-medium', STATUS_CLASSES[status] || 'badge-ghost', `badge-${size}`].join(' ')}
    >
      {STATUS_LABELS[status] || status}
    </span>
  )
}
