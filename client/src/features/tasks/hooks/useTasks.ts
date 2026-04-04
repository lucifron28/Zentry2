import { useQuery } from '@tanstack/react-query'
import { listTasks } from '@/features/tasks/api/tasksApi'

type UseTasksParams = {
  project?: string | number
  assignee?: string | number
  status?: string
  priority?: string
  search?: string
  ordering?: string
  page?: number
}

export function useTasks(params?: UseTasksParams) {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: async () => listTasks(params),
  })
}
