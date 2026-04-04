import type { ApiUser, Project } from '@/features/projects/types/project'
import type { TaskPriority } from '@/shared/ui/data/PriorityBadge'

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done' | 'blocked'

export type ApiTask = {
  id: string | number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  project: string | number | null
  project_details?: Project
  assignee: string | number | null
  assignee_details?: ApiUser
  due_date: string | null
  created_at: string
  updated_at: string
}
