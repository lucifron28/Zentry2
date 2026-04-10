export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  low: 'badge-ghost',
  medium: 'badge-warning',
  high: 'badge-error',
  critical: 'badge-error border-2 border-error shimmer',
}

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

type PriorityBadgeProps = {
  priority: TaskPriority
  size?: 'xs' | 'sm'
}

export function PriorityBadge({ priority, size = 'sm' }: PriorityBadgeProps) {
  return (
    <span
      className={['badge font-medium', PRIORITY_CLASSES[priority] || 'badge-ghost', `badge-${size}`].join(' ')}
    >
      {PRIORITY_LABELS[priority] || priority}
    </span>
  )
}
