import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment } from '@/features/comments/api/commentsApi'

export function useDeleteComment(taskId?: string | number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: string | number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] })
    },
  })
}
