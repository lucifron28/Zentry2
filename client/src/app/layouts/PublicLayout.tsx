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
    <div className="min-h-screen bg-base-200/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8 relative z-0">
        <Outlet />
      </div>
    </div>
  )
}
