import { httpClient } from '@/services/api/client/httpClient'
import { PROJECTS_ENDPOINTS } from '@/services/api/endpoints/projectsEndpoints'
import { USERS_ENDPOINTS } from '@/services/api/endpoints/usersEndpoints'
import type { Project } from '@/features/projects/types/project'
import type { ProjectCreateInput } from '@/features/projects/schemas/projectSchema'
import type { ApiUser } from '@/features/projects/types/project'

type UseProjectsParams = {
  status?: string
  priority?: string
  search?: string
  ordering?: string
  limit?: number
  page?: number
}

type ListUsersParams = {
  page_size?: number
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

export async function addProjectMember(
  projectId: string | number,
  userId: string | number,
): Promise<Project> {
  const { data } = await httpClient.post<Project>(PROJECTS_ENDPOINTS.members(projectId), {
    user_id: userId,
  })
  return data
}

export async function removeProjectMember(
  projectId: string | number,
  userId: string | number,
): Promise<Project> {
  const { data } = await httpClient.delete<Project>(PROJECTS_ENDPOINTS.members(projectId), {
    data: {
      user_id: userId,
    },
  })
  return data
}

export async function listActiveUsers(
  params?: ListUsersParams,
): Promise<PaginatedResponse<ApiUser>> {
  const { data } = await httpClient.get<PaginatedResponse<ApiUser>>(USERS_ENDPOINTS.list, {
    params,
  })
  return data
}
