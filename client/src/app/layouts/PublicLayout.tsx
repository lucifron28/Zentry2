import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { resolvePostLoginPath } from '@/features/auth/utils/redirect'
import { APP_ROUTES } from '@/shared/constants/routes'

export function PublicLayout() {
  const { isAuthenticated } = useAuthSession()
  const location = useLocation()

  if (isAuthenticated) {
    const redirectTo = resolvePostLoginPath(
      location.state as { from?: unknown } | null,
      APP_ROUTES.dashboard,
    )

    return <Navigate replace to={redirectTo} />
  }

  return (
    <div className="min-h-screen bg-base-200/50">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}
