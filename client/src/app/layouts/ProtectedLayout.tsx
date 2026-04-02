import { Navigate, Outlet, useLocation, useMatches } from 'react-router-dom'

import { AppShell } from '@/app/layouts/AppShell'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { buildIntendedPath } from '@/features/auth/utils/redirect'
import { APP_ROUTES } from '@/shared/constants/routes'

type RouteHandle = {
  title?: string
  subtitle?: string
}

export function ProtectedLayout() {
  const { isAuthenticated, userEmail } = useAuthSession()
  const logout = useLogout()

  const location = useLocation()
  const matches = useMatches()

  if (!isAuthenticated) {
    const intendedPath = buildIntendedPath(location.pathname, location.search, location.hash)
    return <Navigate replace to={APP_ROUTES.login} state={{ from: intendedPath }} />
  }

  const currentHandle = matches
    .map((match) => match.handle as RouteHandle | undefined)
    .reverse()
    .find((handle) => handle?.title)

  const title = currentHandle?.title ?? 'Workspace'
  const subtitle = currentHandle?.subtitle

  return (
    <AppShell title={title} subtitle={subtitle} userEmail={userEmail} onLogout={logout}>
      <Outlet />
    </AppShell>
  )
}
