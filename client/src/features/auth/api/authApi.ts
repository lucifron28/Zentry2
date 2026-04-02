import { AUTH_ENDPOINTS } from '@/services/api/endpoints/authEndpoints'
import { httpClient } from '@/services/api/client/httpClient'
import type { AuthTokens } from '@/shared/types/auth'
import type { LoginInput } from '@/features/auth/schemas/loginSchema'

export async function login(payload: LoginInput): Promise<AuthTokens> {
  const response = await httpClient.post<AuthTokens>(AUTH_ENDPOINTS.login, payload)
  return response.data
}
