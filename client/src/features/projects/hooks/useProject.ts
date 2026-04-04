import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api/client/httpClient'
import { PROJECTS_ENDPOINTS } from '@/services/api/endpoints/projectsEndpoints'
import type { Project } from '../types/project'

export function useProject(id: string | number) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data } = await httpClient.get<Project>(PROJECTS_ENDPOINTS.detail(id))
      return data
    },
    enabled: !!id,
  })
}
