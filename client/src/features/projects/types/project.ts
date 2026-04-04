import type { ProjectStatus } from '@/shared/ui/data/StatusBadge'
import type { TaskPriority } from '@/shared/ui/data/PriorityBadge'
import type { Member } from '@/shared/ui/data/AvatarGroup'

export type Project = {
  id: string
  name: string
  category: string
  description: string
  status: ProjectStatus
  priority: TaskPriority
  progress: number
  dueDate: string
  owner: Member
  members: Member[]
  tasksTotal: number
  tasksCompleted: number
}
