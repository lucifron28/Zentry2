import { useQuery } from '@tanstack/react-query'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import type { PaginatedResponse } from '@/features/projects/api/projectsApi'
import { httpClient } from '@/services/api/client/httpClient'
import { TASKS_ENDPOINTS } from '@/services/api/endpoints/tasksEndpoints'
import type { TaskPriority } from '@/shared/ui/data/PriorityBadge'

type ApiTaskPriority = 'low' | 'medium' | 'high' | 'critical'

type ApiTask = {
  id: string | number
  title: string
  status: string
  priority: ApiTaskPriority
  due_date: string | null
}

export type FocusTaskItem = {
  id: string
  title: string
  priority: TaskPriority
  dueLabel: string
  done: boolean
}

function toTaskPriority(priority: ApiTaskPriority): TaskPriority {
  if (priority === 'critical') {
    return 'high'
  }

  return priority
}

function toDueLabel(dueDate: string | null): string {
  if (!dueDate) {
    return 'No due date'
  }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const due = new Date(`${dueDate}T00:00:00`)

  if (Number.isNaN(due.getTime())) {
    return 'Due date unavailable'
  }

  const dayDifference = Math.floor((due.getTime() - today.getTime()) / 86_400_000)

  if (dayDifference < 0) {
    return 'Overdue'
  }

  if (dayDifference === 0) {
    return 'Due today'
  }

  if (dayDifference === 1) {
    return 'Due tomorrow'
  }

  return `Due ${due.toLocaleDateString()}`
}

export function useFocusTasks() {
  const { currentUser } = useAuthSession()

  return useQuery({
    queryKey: ['dashboard-focus-tasks', currentUser?.id],
    enabled: Boolean(currentUser?.id),
    queryFn: async () => {
      const { data } = await httpClient.get<PaginatedResponse<ApiTask>>(
        TASKS_ENDPOINTS.list,
        {
          params: {
            assignee: currentUser?.id,
            status: 'in_progress',
            ordering: 'due_date',
            page_size: 5,
          },
        },
      )

      return data.results.map((task) => ({
        id: String(task.id),
        title: task.title,
        priority: toTaskPriority(task.priority),
        dueLabel: toDueLabel(task.due_date),
        done: task.status === 'done',
      }))
    },
  })
}