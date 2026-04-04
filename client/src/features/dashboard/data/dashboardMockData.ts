import type { ActivityItem } from '@/shared/ui/data/ActivityList'
import type { TaskPriority } from '@/shared/ui/data/PriorityBadge'
import type { ProjectStatus } from '@/shared/ui/data/StatusBadge'

export type DashboardStat = {
  label: string
  value: number
  trend?: string
  trendUp?: boolean
  description?: string
}

export type FocusTask = {
  id: string
  title: string
  priority: TaskPriority
  dueLabel: string
  done: boolean
}

export type ActiveProjectPreview = {
  id: string
  name: string
  category: string
  status: ProjectStatus
  progress: number
  dueDate: string
}

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    label: 'Total Projects',
    value: 42,
    trend: '+3 this month',
    trendUp: true,
  },
  {
    label: 'Active Tasks',
    value: 128,
    trend: '+12 since last week',
    trendUp: true,
  },
  {
    label: 'Pending Reviews',
    value: 14,
    trend: '−5 from last week',
    trendUp: true,
    description: 'Awaiting your action',
  },
  {
    label: 'Upcoming Deadlines',
    value: 3,
    trend: 'Next: in 2 days',
    trendUp: false,
    description: 'Within the next 7 days',
  },
]

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    actor: 'Sarah Chen',
    actorInitials: 'SC',
    action: 'Updated the Skyscraper Design System project assets',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    actor: 'System',
    actorInitials: 'SY',
    action: 'Successfully deployed v2.4.0-alpha to staging',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    actor: 'Marcus Wright',
    actorInitials: 'MW',
    action: 'Left a comment on Task #882: "Check the elevation plan"',
    timestamp: '3 hours ago',
  },
  {
    id: '4',
    actor: 'Elena Rodriguez',
    actorInitials: 'ER',
    action: 'Completed the architectural audit for Project Zen',
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    actor: 'Jordan Ridley',
    actorInitials: 'JR',
    action: 'Created milestone: Developer Portal Alpha Test',
    timestamp: 'Yesterday',
  },
]

export const FOCUS_TASKS: FocusTask[] = [
  {
    id: 't1',
    title: 'Review Structure Schematics',
    priority: 'high',
    dueLabel: 'Due today',
    done: false,
  },
  {
    id: 't2',
    title: 'Client Presentation Preparation',
    priority: 'medium',
    dueLabel: 'Due tomorrow',
    done: false,
  },
  {
    id: 't3',
    title: 'Internal Team Sync',
    priority: 'low',
    dueLabel: 'Completed 2h ago',
    done: true,
  },
]

export const ACTIVE_PROJECT_PREVIEWS: ActiveProjectPreview[] = [
  {
    id: 'p1',
    name: 'Horizon Terminal Phase II',
    category: 'Infrastructure',
    status: 'active',
    progress: 64,
    dueDate: 'Oct 24',
  },
  {
    id: 'p2',
    name: 'Starlight Server Integration',
    category: 'Cloud Solutions',
    status: 'active',
    progress: 38,
    dueDate: 'Nov 12',
  },
  {
    id: 'p3',
    name: 'Vortex Asset Audit',
    category: 'Compliance',
    status: 'on-hold',
    progress: 21,
    dueDate: 'Nov 30',
  },
]

export const DASHBOARD_INSIGHT = {
  headline: 'Horizon Terminal Phase II is ahead of schedule',
  body: 'At 64% completion, current velocity suggests a possible finish 12 days before the Oct 24 deadline. Keep the current sprint cadence to lock in that buffer.',
  healthScore: 87,
  healthLabel: 'Projects running 15% more efficiently than last quarter.',
}
