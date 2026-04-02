import { useAuthSession } from '@/features/auth/hooks/useAuthSession'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'

export function useAuthBootstrap() {
  const { accessToken, currentUser } = useAuthSession()

  const shouldHydrateUser = Boolean(accessToken) && !currentUser
  const currentUserQuery = useCurrentUser({
    enabled: shouldHydrateUser,
    hydrateSession: true,
    clearOnUnauthorized: true,
  })

  const isBootstrapping = shouldHydrateUser && (currentUserQuery.isPending || currentUserQuery.isFetching)

  return {
    shouldHydrateUser,
    isBootstrapping,
    hasBootstrapError: shouldHydrateUser && currentUserQuery.isError,
    bootstrapError: currentUserQuery.error,
  }
}
