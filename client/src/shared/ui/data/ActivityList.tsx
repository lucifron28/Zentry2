export type ActivityItem = {
  id: string
  actor: string
  actorInitials: string
  action: string
  timestamp: string
}

type ActivityListProps = {
  items: ActivityItem[]
  emptyMessage?: string
}

export function ActivityList({
  items,
  emptyMessage = 'No recent activity.',
}: ActivityListProps) {
  if (items.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-base-content/55">{emptyMessage}</p>
    )
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <div className="avatar placeholder shrink-0">
            <div className="w-8 h-8 rounded-full bg-base-300 text-xs font-semibold text-base-content/80 flex items-center justify-center">
              <span>{item.actorInitials}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-base-content">
              <span className="font-medium">{item.actor}</span>{' '}
              <span className="text-base-content/70">{item.action}</span>
            </p>
            <p className="mt-0.5 text-xs text-base-content/50">{item.timestamp}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
