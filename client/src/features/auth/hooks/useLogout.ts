import { useNavigate } from 'react-router-dom'

import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { logout } from '@/features/auth/api/authApi'
import { APP_ROUTES } from '@/shared/constants/routes'

export function useLogout() {
  const navigate = useNavigate()
  const { clearSession } = useAuthSession()

  return async () => {
    try {
      await logout()
    } catch {
      // Ignored: clear session locally anyway
    } finally {
      clearSession()
      navigate(APP_ROUTES.login, { replace: true })
    }
  }
}
