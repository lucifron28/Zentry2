import { SectionCard } from '@/shared/ui/data/SectionCard'
import { PriorityBadge } from '@/shared/ui/data/PriorityBadge'
import { useFocusTasks } from '@/features/dashboard/hooks/useFocusTasks'

export function FocusTasksCard() {
  const { data: focusTasks = [], isLoading, isError, refetch } = useFocusTasks()

  return (
    <SectionCard
      title="Focus Tasks"
      subtitle="Priority items requiring your attention today"
    >
      {isLoading ? (
        <ul className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-xl border border-base-200 px-4 py-3 animate-pulse"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-4 w-4 shrink-0 rounded border-2 border-base-300 bg-base-100" />
                <div className="h-4 w-40 rounded bg-base-300" />
              </div>
              <div className="ml-3 flex shrink-0 items-center gap-2">
                <div className="h-5 w-12 rounded-full bg-base-300" />
                <div className="hidden h-3 w-20 rounded bg-base-200 sm:block" />
              </div>
            </li>
          ))}
        </ul>
      ) : isError ? (
        <div className="rounded-xl border border-error/30 bg-base-100 p-5 text-center">
          <p className="text-sm font-medium text-base-content">Unable to load focus tasks.</p>
          <p className="mt-1 text-xs text-base-content/60">
            Please try again to refresh your assigned work.
          </p>
          <button className="btn btn-error btn-outline mt-4 btn-xs" onClick={() => void refetch()}>
            Retry
          </button>
        </div>
      ) : focusTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-base-300 bg-base-100 px-4 py-8 text-center">
          <p className="text-sm font-medium text-base-content">No focus tasks right now.</p>
          <p className="mt-1 text-xs text-base-content/60">
            In-progress tasks assigned to you will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {focusTasks.map((task) => (
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
                    'h-4 w-4 shrink-0 rounded border-2',
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
              <div className="flex shrink-0 items-center gap-2 ml-3">
                <PriorityBadge priority={task.priority} size="xs" />
                <span className="hidden text-xs text-base-content/50 sm:inline">
                  {task.dueLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}
