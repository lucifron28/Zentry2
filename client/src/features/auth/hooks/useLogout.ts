import { useNavigate } from 'react-router-dom'

import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { APP_ROUTES } from '@/shared/constants/routes'

export function useLogout() {
  const navigate = useNavigate()
  const { clearSession } = useAuthSession()

  return () => {
    clearSession()
    navigate(APP_ROUTES.login, { replace: true })
  }
}
