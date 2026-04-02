import { useAuthStore } from '@/features/auth/store/authStore'

export function useAuthSession() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const currentUser = useAuthStore((state) => state.currentUser)
  const setSession = useAuthStore((state) => state.setSession)
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const clearSession = useAuthStore((state) => state.clearSession)

  const userDisplayName = currentUser?.display_name || currentUser?.email || null

  return {
    accessToken,
    refreshToken,
    currentUser,
    userDisplayName,
    isAuthenticated: Boolean(accessToken),
    setSession,
    setCurrentUser,
    setAccessToken,
    clearSession,
  }
}
