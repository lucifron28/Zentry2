import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedLayout } from '@/app/layouts/ProtectedLayout'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { ProjectsPage } from '@/features/projects/pages/ProjectsPage'
import { ProjectDetailPage } from '@/features/projects/pages/ProjectDetailPage'
import { TasksPage } from '@/features/tasks/pages/TasksPage'
import { CommentsPage } from '@/features/comments/pages/CommentsPage'
import { AttachmentsPage } from '@/features/attachments/pages/AttachmentsPage'
import { ActivityLogsPage } from '@/features/activity/pages/ActivityLogsPage'
import { UserManagementPage } from '@/features/users/pages/UserManagementPage'
import { NotificationsPage } from '@/features/notifications/pages/NotificationsPage'
import { APP_ROUTES } from '@/shared/constants/routes'

function RootRedirect() {
  const { isAuthenticated } = useAuthSession()

  if (isAuthenticated) {
    return <Navigate replace to={APP_ROUTES.dashboard} />
  }

  return <Navigate replace to={APP_ROUTES.login} />
}

const router = createBrowserRouter([
  {
    path: APP_ROUTES.root,
    element: <RootRedirect />,
  },
  {
    path: APP_ROUTES.login,
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: APP_ROUTES.dashboard,
        element: <DashboardPage />,
        handle: {
          title: 'Dashboard',
          subtitle: 'Overview of active work and updates.',
        },
      },
      {
        path: APP_ROUTES.projects,
        element: <ProjectsPage />,
        handle: {
          title: 'Projects',
          subtitle: 'Project planning and management workspace.',
        },
      },
      {
        path: `${APP_ROUTES.projects}/:id`,
        element: <ProjectDetailPage />,
        handle: {
          title: 'Project Details',
          subtitle: 'Milestones, team, and activity for this project.',
        },
      },
      {
        path: APP_ROUTES.tasks,
        element: <TasksPage />,
        handle: {
          title: 'Tasks',
          subtitle: 'Task planning and status control.',
        },
      },
      {
        path: APP_ROUTES.comments,
        element: <CommentsPage />,
        handle: {
          title: 'Comments',
          subtitle: 'Discussion records for team collaboration.',
        },
      },
      {
        path: APP_ROUTES.attachments,
        element: <AttachmentsPage />,
        handle: {
          title: 'Attachments',
          subtitle: 'Document and file management section.',
        },
      },
      {
        path: APP_ROUTES.notifications,
        element: <NotificationsPage />,
        handle: {
          title: 'Notifications',
          subtitle: 'User alerts and system updates.',
        },
      },
      {
        path: APP_ROUTES.activityLogs,
        element: <ActivityLogsPage />,
        handle: {
          title: 'Activity Logs',
          subtitle: 'Traceable records of user and system actions.',
        },
      },
      {
        path: APP_ROUTES.userManagement,
        element: <UserManagementPage />,
        handle: {
          title: 'User Management',
          subtitle: 'User account and role administration.',
        },
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
