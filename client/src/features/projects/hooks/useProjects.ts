import { useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api/client/httpClient'
import { PROJECTS_ENDPOINTS } from '@/services/api/endpoints/projectsEndpoints'
import type { Project } from '../types/project'

type UseProjectsParams = {
  status?: string
  priority?: string
  search?: string
  ordering?: string
  limit?: number
  page?: number
}

// Support paginated API response
type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export function useProjects(params?: UseProjectsParams) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: async () => {
      const { data } = await httpClient.get<PaginatedResponse<Project>>(PROJECTS_ENDPOINTS.list, {
        params,
      })
      // If we pass a limit, client-side slice just as fallback, but DRF pagination ideally handles page sizes
      if (params?.limit && data.results.length > params.limit) {
        return { ...data, results: data.results.slice(0, params.limit) }
      }
      return data
    },
  })
}
