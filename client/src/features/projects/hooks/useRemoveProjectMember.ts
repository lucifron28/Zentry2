import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeProjectMember } from '@/features/projects/api/projectsApi'

type UseRemoveProjectMemberOptions = {
  onSuccess?: () => void
}

export function useRemoveProjectMember(
  projectId: string | number,
  options?: UseRemoveProjectMemberOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string | number) => removeProjectMember(projectId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      options?.onSuccess?.()
    },
  })
}
