export type TaskPriority = 'high' | 'medium' | 'low'

const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  high: 'badge-error',
  medium: 'badge-warning',
  low: 'badge-ghost',
}

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

type PriorityBadgeProps = {
  priority: TaskPriority
  size?: 'xs' | 'sm'
}

export function PriorityBadge({ priority, size = 'sm' }: PriorityBadgeProps) {
  return (
    <span
      className={['badge font-medium', PRIORITY_CLASSES[priority], `badge-${size}`].join(' ')}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
