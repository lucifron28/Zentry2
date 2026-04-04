import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/features/tasks/api/tasksApi'
import type { TaskInput } from '@/features/tasks/schemas/taskSchema'

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TaskInput) => createTask(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-focus-tasks'] })
      if (variables.project) {
        queryClient.invalidateQueries({ queryKey: ['project', String(variables.project)] })
      }
    },
  })
}
