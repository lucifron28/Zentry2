import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/features/projects/api/projectsApi'

export function useProject(id: string | number) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => getProjectById(id),
    enabled: !!id,
  })
}
