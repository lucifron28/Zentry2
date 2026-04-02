import { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/features/auth/api/authApi'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'

export const CURRENT_USER_QUERY_KEY = ['auth', 'current-user'] as const

type UseCurrentUserOptions = {
  enabled?: boolean
  hydrateSession?: boolean
  clearOnUnauthorized?: boolean
}

function isUnauthorizedError(error: unknown) {
  return axios.isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)
}

export function useCurrentUser(options?: UseCurrentUserOptions) {
  const { isAuthenticated, setCurrentUser, clearSession } = useAuthSession()
  const shouldHydrate = options?.hydrateSession ?? true
  const shouldClearOnUnauthorized = options?.clearOnUnauthorized ?? true

  const query = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: getCurrentUser,
    enabled: options?.enabled ?? isAuthenticated,
    staleTime: 60_000,
    retry: false,
  })

  useEffect(() => {
    if (shouldHydrate && query.data) {
      setCurrentUser(query.data)
    }
  }, [query.data, setCurrentUser, shouldHydrate])

  useEffect(() => {
    if (shouldClearOnUnauthorized && query.error && isUnauthorizedError(query.error)) {
      clearSession()
    }
  }, [clearSession, query.error, shouldClearOnUnauthorized])

  return query
}
