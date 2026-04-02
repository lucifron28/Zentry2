import { useMutation } from '@tanstack/react-query'
import { login } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/features/auth/store/authStore'
import type { LoginInput } from '@/features/auth/schemas/loginSchema'

type UseLoginOptions = {
  onSuccess?: () => void
}

export function useLogin(options?: UseLoginOptions) {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (payload: LoginInput) => login(payload),
    onSuccess: (tokens, variables) => {
      setSession(tokens.access, variables.email)
      options?.onSuccess?.()
    },
  })
}
