import { SectionCard } from '@/shared/ui/data/SectionCard'
import { PriorityBadge } from '@/shared/ui/data/PriorityBadge'
import { FOCUS_TASKS } from '@/features/dashboard/data/dashboardMockData'

export function FocusTasksCard() {
  return (
    <SectionCard
      title="Focus Tasks"
      subtitle="Priority items requiring your attention today"
    >
      <ul className="space-y-3">
        {FOCUS_TASKS.map((task) => (
          <li
            key={task.id}
            className={[
              'flex items-center justify-between rounded-xl border border-base-200 px-4 py-3 transition-colors',
              task.done
                ? 'bg-base-200/40 opacity-60'
                : 'bg-base-100 hover:bg-base-200/50',
            ].join(' ')}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={[
                  'h-4 w-4 flex-shrink-0 rounded border-2',
                  task.done
                    ? 'border-success bg-success/20'
                    : 'border-base-300 bg-base-100',
                ].join(' ')}
                aria-hidden="true"
              />
              <span
                className={[
                  'truncate text-sm font-medium',
                  task.done
                    ? 'line-through text-base-content/50'
                    : 'text-base-content',
                ].join(' ')}
              >
                {task.title}
              </span>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2 ml-3">
              <PriorityBadge priority={task.priority} size="xs" />
              <span className="hidden text-xs text-base-content/50 sm:inline">
                {task.dueLabel}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
