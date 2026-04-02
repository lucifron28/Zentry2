import type { PropsWithChildren } from 'react'
import { useAuthBootstrap } from '@/features/auth/hooks/useAuthBootstrap'
import { LoadingState } from '@/shared/ui/states/LoadingState'

export function AuthBootstrapGate({ children }: PropsWithChildren) {
  const { shouldHydrateUser, isBootstrapping } = useAuthBootstrap()

  if (shouldHydrateUser && isBootstrapping) {
    return (
      <div className="min-h-screen bg-base-200/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <LoadingState
            title="Restoring session"
            description="Please wait while Zentry confirms your current user identity."
          />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
