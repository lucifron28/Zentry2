import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/features/auth/api/authApi'
import { useAuthSession } from '@/features/auth/hooks/useAuthSession'

export const CURRENT_USER_QUERY_KEY = ['auth', 'current-user'] as const

export function useCurrentUser() {
  const { isAuthenticated, setCurrentUser } = useAuthSession()

  const query = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 60_000,
  })

  useEffect(() => {
    if (query.data) {
      setCurrentUser(query.data)
    }
  }, [query.data, setCurrentUser])

  return query
}
