import { Navigate, Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom'

import { AppShell } from '@/app/layouts/AppShell'
import { useAuthStore } from '@/features/auth/store/authStore'
import { APP_ROUTES } from '@/shared/constants/routes'

type RouteHandle = {
  title?: string
  subtitle?: string
}

export function ProtectedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const userEmail = useAuthStore((state) => state.userEmail)
  const clearSession = useAuthStore((state) => state.clearSession)

  const location = useLocation()
  const navigate = useNavigate()
  const matches = useMatches()

  if (!accessToken) {
    return <Navigate replace to={APP_ROUTES.login} state={{ from: location.pathname }} />
  }

  const currentHandle = matches
    .map((match) => match.handle as RouteHandle | undefined)
    .reverse()
    .find((handle) => handle?.title)

  const title = currentHandle?.title ?? 'Workspace'
  const subtitle = currentHandle?.subtitle

  function handleLogout() {
    clearSession()
    navigate(APP_ROUTES.login, { replace: true })
  }

  return (
    <AppShell title={title} subtitle={subtitle} userEmail={userEmail} onLogout={handleLogout}>
      <Outlet />
    </AppShell>
  )
}
