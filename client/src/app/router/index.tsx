import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ModuleScaffoldPage } from '@/app/pages/ModuleScaffoldPage'
import { ProtectedLayout } from '@/app/layouts/ProtectedLayout'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { useAuthStore } from '@/features/auth/store/authStore'
import { APP_ROUTES } from '@/shared/constants/routes'

function RootRedirect() {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (accessToken) {
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
        element: (
          <ModuleScaffoldPage
            title="Dashboard"
            description="Track summary metrics and current progress snapshots for projects and tasks."
          />
        ),
        handle: {
          title: 'Dashboard',
          subtitle: 'Overview of active work and updates.',
        },
      },
      {
        path: APP_ROUTES.projects,
        element: (
          <ModuleScaffoldPage
            title="Projects"
            description="Organize project records, milestones, and assigned team members in one place."
          />
        ),
        handle: {
          title: 'Projects',
          subtitle: 'Project planning and management workspace.',
        },
      },
      {
        path: APP_ROUTES.tasks,
        element: (
          <ModuleScaffoldPage
            title="Tasks"
            description="Manage task lifecycle details such as assignment, status, and delivery deadlines."
          />
        ),
        handle: {
          title: 'Tasks',
          subtitle: 'Task planning and status control.',
        },
      },
      {
        path: APP_ROUTES.comments,
        element: (
          <ModuleScaffoldPage
            title="Comments"
            description="Centralize collaboration threads and discussions linked to work items."
          />
        ),
        handle: {
          title: 'Comments',
          subtitle: 'Discussion records for team collaboration.',
        },
      },
      {
        path: APP_ROUTES.attachments,
        element: (
          <ModuleScaffoldPage
            title="Attachments"
            description="Maintain file evidence and references associated with projects and tasks."
          />
        ),
        handle: {
          title: 'Attachments',
          subtitle: 'Document and file management section.',
        },
      },
      {
        path: APP_ROUTES.notifications,
        element: (
          <ModuleScaffoldPage
            title="Notifications"
            description="Review system alerts and actionable updates relevant to your workflow."
          />
        ),
        handle: {
          title: 'Notifications',
          subtitle: 'User alerts and system updates.',
        },
      },
      {
        path: APP_ROUTES.activityLogs,
        element: (
          <ModuleScaffoldPage
            title="Activity Logs"
            description="Track notable system actions for accountability and later documentation evidence."
          />
        ),
        handle: {
          title: 'Activity Logs',
          subtitle: 'Traceable records of user and system actions.',
        },
      },
      {
        path: APP_ROUTES.userManagement,
        element: (
          <ModuleScaffoldPage
            title="User Management"
            description="Manage user accounts and role assignments through a consistent administration surface."
          />
        ),
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
