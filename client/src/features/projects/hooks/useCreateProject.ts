import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject } from '@/features/projects/api/projectsApi'
import type { ProjectCreateInput } from '@/features/projects/schemas/projectSchema'

type UseCreateProjectOptions = {
  onSuccess?: (projectName: string) => void
}

export function useCreateProject(options?: UseCreateProjectOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ProjectCreateInput) => {
      await createProject(payload)
      return payload.name.trim()
    },
    onSuccess: async (projectName) => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      options?.onSuccess?.(projectName)
    },
  })
}