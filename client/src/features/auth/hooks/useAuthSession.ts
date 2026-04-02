import { useAuthStore } from '@/features/auth/store/authStore'

export function useAuthSession() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const userEmail = useAuthStore((state) => state.userEmail)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  return {
    accessToken,
    userEmail,
    isAuthenticated: Boolean(accessToken),
    setSession,
    clearSession,
  }
}
