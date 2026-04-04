import type { ProjectStatus } from '@/shared/ui/data/StatusBadge'
import type { TaskPriority } from '@/shared/ui/data/PriorityBadge'

export type ApiUser = {
  id: number | string
  email: string
  first_name: string
  last_name: string
  display_name: string
  role: string
  is_active: boolean
}

export type Project = {
  id: string | number
  name: string
  category: string
  description: string
  status: ProjectStatus
  priority: TaskPriority
  progress: number
  due_date: string | null
  owner: ApiUser | null
  members: ApiUser[]
  task_count: number
  created_at: string
  updated_at: string
}
