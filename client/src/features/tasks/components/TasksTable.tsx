import type { ApiTask } from '@/features/tasks/types/task'
import { StatusBadge } from '@/shared/ui/data/StatusBadge'
import { PriorityBadge } from '@/shared/ui/data/PriorityBadge'

type TasksTableProps = {
  tasks: ApiTask[]
  isLoading?: boolean
  onTaskClick?: (task: ApiTask) => void
}

function getInitials(name?: string) {
  if (!name) return '?'
  const parts = name.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export function TasksTable({ tasks, isLoading, onTaskClick }: TasksTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr className="bg-base-200/60 text-xs uppercase tracking-wide text-base-content/55">
              <th className="font-semibold px-4 py-3">Task</th>
              <th className="font-semibold px-4 py-3">Assignee</th>
              <th className="font-semibold px-4 py-3">Priority</th>
              <th className="font-semibold px-4 py-3">Status</th>
              <th className="font-semibold px-4 py-3 text-right">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-4 py-3"><div className="h-4 w-32 bg-base-300 rounded mb-1"></div></td>
                <td className="px-4 py-3"><div className="h-6 w-24 bg-base-200 rounded-full"></div></td>
                <td className="px-4 py-3"><div className="h-5 w-16 bg-base-200 rounded-full"></div></td>
                <td className="px-4 py-3"><div className="h-5 w-20 bg-base-200 rounded-full"></div></td>
                <td className="px-4 py-3 text-right"><div className="h-3 w-20 bg-base-200 rounded ml-auto"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 bg-base-100 py-12 text-center">
        <p className="text-sm font-medium text-base-content">No tasks currently assigned</p>
        <p className="mt-1 text-xs text-base-content/55">
          Tasks associated with this project will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-200">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr className="bg-base-200/60 text-xs uppercase tracking-wide text-base-content/55">
            <th className="font-semibold px-4 py-3">Task</th>
            <th className="font-semibold px-4 py-3">Assignee</th>
            <th className="font-semibold px-4 py-3">Priority</th>
            <th className="font-semibold px-4 py-3">Status</th>
            <th className="font-semibold px-4 py-3 text-right">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr 
              key={task.id} 
              className={`hover border-b border-base-200 last:border-0 ${onTaskClick ? 'cursor-pointer' : ''}`}
              onClick={() => onTaskClick?.(task)}
            >
              <td className="px-4 py-3">
                <div className="max-w-[280px]">
                  <p className="font-semibold text-base-content leading-snug truncate">
                    {task.title}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3">
                {task.assignee_details ? (
                  <div className="flex items-center gap-2.5">
                    <div className="avatar placeholder">
                      <div className="w-7 h-7 rounded-full bg-base-300 text-xs font-semibold text-base-content/80 flex items-center justify-center">
                        <span>{getInitials(task.assignee_details.display_name)}</span>
                      </div>
                    </div>
                    <span className="text-xs text-base-content/70 hidden xl:inline">
                      {task.assignee_details.display_name}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-base-content/50">Unassigned</span>
                )}
              </td>
              <td className="px-4 py-3">
                <PriorityBadge priority={task.priority} size="xs" />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={task.status as any} size="xs" />
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-xs text-base-content/55 tabular-nums whitespace-nowrap">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
