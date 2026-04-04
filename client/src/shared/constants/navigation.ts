import { APP_ROUTES } from '@/shared/constants/routes'

export type AppNavItem = {
  label: string
  to: string
  subtitle: string
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    label: 'Dashboard',
    to: APP_ROUTES.dashboard,
    subtitle: 'Overview of current work and updates.',
  },
  {
    label: 'Projects',
    to: APP_ROUTES.projects,
    subtitle: 'Project records and planning spaces.',
  },
  {
    label: 'Tasks',
    to: APP_ROUTES.tasks,
    subtitle: 'Task tracking and status progression.',
  },
  {
    label: 'Comments',
    to: APP_ROUTES.comments,
    subtitle: 'Discussion history and collaboration notes.',
  },
  {
    label: 'Attachments',
    to: APP_ROUTES.attachments,
    subtitle: 'Managed project and task files.',
  },
  {
    label: 'Activity Logs',
    to: APP_ROUTES.activityLogs,
    subtitle: 'Traceable system and user actions.',
  },
  {
    label: 'User Management',
    to: APP_ROUTES.userManagement,
    subtitle: 'User accounts and role administration.',
  },
]
