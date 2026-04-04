import { httpClient } from '@/services/api/client/httpClient'
import { PROJECTS_ENDPOINTS } from '@/services/api/endpoints/projectsEndpoints'
import type { Project } from '@/features/projects/types/project'
import type { ProjectCreateInput } from '@/features/projects/schemas/projectSchema'

type UseProjectsParams = {
  status?: string
  priority?: string
  search?: string
  ordering?: string
  limit?: number
  page?: number
}

export type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function listProjects(params?: UseProjectsParams): Promise<PaginatedResponse<Project>> {
  const { data } = await httpClient.get<PaginatedResponse<Project>>(PROJECTS_ENDPOINTS.list, {
    params,
  })

  if (params?.limit && data.results.length > params.limit) {
    return { ...data, results: data.results.slice(0, params.limit) }
  }

  return data
}

export async function getProjectById(id: string | number): Promise<Project> {
  const { data } = await httpClient.get<Project>(PROJECTS_ENDPOINTS.detail(id))
  return data
}

export async function createProject(payload: ProjectCreateInput): Promise<void> {
  await httpClient.post(PROJECTS_ENDPOINTS.list, {
    name: payload.name.trim(),
    description: payload.description.trim(),
    status: payload.status,
    priority: payload.priority,
    category: payload.category.trim(),
    due_date: payload.due_date || null,
  })
}