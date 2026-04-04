import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProjectMember } from '@/features/projects/api/projectsApi'

type UseAddProjectMemberOptions = {
  onSuccess?: () => void
}

export function useAddProjectMember(
  projectId: string | number,
  options?: UseAddProjectMemberOptions,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string | number) => addProjectMember(projectId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      options?.onSuccess?.()
    },
  })
}
