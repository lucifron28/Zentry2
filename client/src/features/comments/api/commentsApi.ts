import { httpClient } from '@/services/api/client/httpClient'
import { COMMENTS_ENDPOINTS } from '@/services/api/endpoints/commentsEndpoints'
import type { ApiComment } from '@/features/comments/types/comment'
import type { PaginatedResponse } from '@/features/projects/api/projectsApi'

type ListCommentsParams = {
  task?: string | number
  ordering?: string
  page?: number
}

export async function listComments(params?: ListCommentsParams): Promise<PaginatedResponse<ApiComment>> {
  const { data } = await httpClient.get<PaginatedResponse<ApiComment>>(COMMENTS_ENDPOINTS.list, {
    params,
  })
  return data
}

export async function createComment(payload: { task: string | number; body: string }): Promise<ApiComment> {
  const { data } = await httpClient.post<ApiComment>(COMMENTS_ENDPOINTS.list, {
    task: payload.task,
    body: payload.body.trim(),
  })
  return data
}

export async function deleteComment(id: string | number): Promise<void> {
  await httpClient.delete(COMMENTS_ENDPOINTS.detail(id))
}
