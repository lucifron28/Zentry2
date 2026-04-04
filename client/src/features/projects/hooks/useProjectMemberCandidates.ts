import { useQuery } from '@tanstack/react-query'
import { listActiveUsers } from '@/features/projects/api/projectsApi'

export function useProjectMemberCandidates(enabled: boolean) {
  return useQuery({
    queryKey: ['users', 'project-member-candidates'],
    queryFn: async () => {
      const data = await listActiveUsers({ page_size: 100 })
      return data.results
    },
    enabled,
    staleTime: 60_000,
  })
}
