import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { APP_ROUTES } from '@/shared/constants/routes'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-base-content/70">Feature scaffold is ready for implementation.</p>
    </main>
  )
}

const router = createBrowserRouter([
  {
    path: APP_ROUTES.root,
    element: <Navigate replace to={APP_ROUTES.login} />,
  },
  {
    path: APP_ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: APP_ROUTES.dashboard,
    element: <PlaceholderPage title="Dashboard" />,
  },
  {
    path: APP_ROUTES.projects,
    element: <PlaceholderPage title="Projects" />,
  },
  {
    path: APP_ROUTES.tasks,
    element: <PlaceholderPage title="Tasks" />,
  },
  {
    path: APP_ROUTES.comments,
    element: <PlaceholderPage title="Comments" />,
  },
  {
    path: APP_ROUTES.attachments,
    element: <PlaceholderPage title="Attachments" />,
  },
  {
    path: APP_ROUTES.notifications,
    element: <PlaceholderPage title="Notifications" />,
  },
  {
    path: APP_ROUTES.activityLogs,
    element: <PlaceholderPage title="Activity Logs" />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
