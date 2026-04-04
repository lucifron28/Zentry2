import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '@/features/tasks/api/tasksApi'
import type { TaskInput } from '@/features/tasks/schemas/taskSchema'

type UpdateTaskPayload = {
  id: string | number
  data: TaskInput
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateTaskPayload) => updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-focus-tasks'] })
      
      if (updatedTask.project) {
        queryClient.invalidateQueries({ queryKey: ['project', String(updatedTask.project)] })
      }
    },
  })
}
