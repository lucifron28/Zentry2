import { useQuery } from '@tanstack/react-query'
import { listProjects } from '@/features/projects/api/projectsApi'

type UseProjectsParams = {
  status?: string
  priority?: string
  search?: string
  ordering?: string
  limit?: number
  page?: number
}

export function useProjects(params?: UseProjectsParams) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: async () => listProjects(params),
  })
}
