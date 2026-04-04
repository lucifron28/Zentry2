import { httpClient } from '@/services/api/client/httpClient'
import { TASKS_ENDPOINTS } from '@/services/api/endpoints/tasksEndpoints'
import type { ApiTask } from '@/features/tasks/types/task'
import type { TaskInput } from '@/features/tasks/schemas/taskSchema'
import type { PaginatedResponse } from '@/features/projects/api/projectsApi'

type UseTasksParams = {
  project?: string | number
  assignee?: string | number
  status?: string
  priority?: string
  search?: string
  ordering?: string
  page?: number
}

export async function listTasks(params?: UseTasksParams): Promise<PaginatedResponse<ApiTask>> {
  const { data } = await httpClient.get<PaginatedResponse<ApiTask>>(TASKS_ENDPOINTS.list, {
    params,
  })
  return data
}

export async function getTaskById(id: string | number): Promise<ApiTask> {
  const { data } = await httpClient.get<ApiTask>(TASKS_ENDPOINTS.detail(id))
  return data
}

export async function createTask(payload: TaskInput): Promise<ApiTask> {
  const { data } = await httpClient.post<ApiTask>(TASKS_ENDPOINTS.list, {
    title: payload.title.trim(),
    description: payload.description?.trim() || '',
    status: payload.status,
    priority: payload.priority,
    project: payload.project,
    assignee: payload.assignee,
    due_date: payload.due_date || null,
  })
  return data
}

export async function updateTask(id: string | number, payload: TaskInput): Promise<ApiTask> {
  const { data } = await httpClient.patch<ApiTask>(TASKS_ENDPOINTS.detail(id), {
    title: payload.title.trim(),
    description: payload.description?.trim() || '',
    status: payload.status,
    priority: payload.priority,
    project: payload.project,
    assignee: payload.assignee,
    due_date: payload.due_date || null,
  })
  return data
}
