import type { ApiUser } from '@/features/projects/types/project'

export type ApiComment = {
  id: string | number
  task: string | number
  author: string | number
  author_details?: ApiUser
  body: string
  created_at: string
  updated_at: string
}
