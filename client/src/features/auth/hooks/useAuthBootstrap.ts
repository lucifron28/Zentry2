import { useEffect, useState } from 'react'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { refreshAccessToken } from '@/features/auth/api/authApi'

export function useAuthBootstrap() {
  const { accessToken, setAccessToken, clearSession } = useAuthSession()
  const [isRefreshing, setIsRefreshing] = useState(!accessToken)
  
  // 1. Try to silently refresh token on app startup if none exists in memory
  useEffect(() => {
    let mounted = true
    const attemptSilentRefresh = async () => {
      if (accessToken) {
        setIsRefreshing(false)
        return
      }

      try {
        const response = await refreshAccessToken()
        // Successfully retrieved a new access token via HttpOnly cookie
        if (mounted) {
          setAccessToken(response.access)
        }
      } catch {
        // Failed to refresh (no cookie, expired, etc). Clear any partial state.
        if (mounted) {
          clearSession()
        }
      } finally {
        if (mounted) {
          setIsRefreshing(false)
        }
      }
    }

    attemptSilentRefresh()

    return () => {
      mounted = false
    }
  }, [accessToken, setAccessToken, clearSession])

  // 2. Hydrate user only after we have an access token (either from start or after refresh)
  const shouldHydrateUser = Boolean(accessToken)
  const currentUserQuery = useCurrentUser({
    enabled: shouldHydrateUser && !isRefreshing,
    hydrateSession: true,
    clearOnUnauthorized: true,
  })

  // 3. We are bootstrapping if we're silently refreshing or if we're fetching the user profile
  const isBootstrapping = isRefreshing || (shouldHydrateUser && (currentUserQuery.isPending || currentUserQuery.isFetching))

  return {
    shouldHydrateUser,
    isBootstrapping,
    hasBootstrapError: shouldHydrateUser && currentUserQuery.isError,
    bootstrapError: currentUserQuery.error,
  }
}

