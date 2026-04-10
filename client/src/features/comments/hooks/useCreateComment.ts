import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '@/features/comments/api/commentsApi'

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { task: string | number; body: string }) => createComment(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.task] })
    },
  })
}
