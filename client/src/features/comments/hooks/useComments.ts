import { useQuery } from '@tanstack/react-query'
import { listComments } from '@/features/comments/api/commentsApi'

export function useComments(taskId?: string | number) {
  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: async () => listComments({ task: taskId }),
    enabled: !!taskId,
  })
}
