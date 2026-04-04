import { AUTH_ENDPOINTS } from '@/services/api/endpoints/authEndpoints'
import { httpClient } from '@/services/api/client/httpClient'
import type { LoginInput } from '@/features/auth/schemas/loginSchema'
import type { AuthLoginResponse, AuthRefreshResponse, AuthUser } from '@/shared/types/auth'

export async function login(payload: LoginInput): Promise<AuthLoginResponse> {
  const response = await httpClient.post<AuthLoginResponse>(AUTH_ENDPOINTS.login, payload)
  return response.data
}

export async function refreshAccessToken(): Promise<AuthRefreshResponse> {
  const response = await httpClient.post<AuthRefreshResponse>(AUTH_ENDPOINTS.refresh)
  return response.data
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await httpClient.get<AuthUser>(AUTH_ENDPOINTS.me)
  return response.data
}

export async function logout(): Promise<void> {
  await httpClient.post(AUTH_ENDPOINTS.logout)
}

