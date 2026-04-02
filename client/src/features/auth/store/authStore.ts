import { create } from 'zustand'
import type { AuthUser } from '@/shared/types/auth'

type SessionPayload = {
  accessToken: string
  currentUser: AuthUser
  refreshToken?: string
}

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  currentUser: AuthUser | null
  setSession: (session: SessionPayload) => void
  setCurrentUser: (currentUser: AuthUser | null) => void
  setAccessToken: (accessToken: string | null) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  currentUser: null,
  setSession: ({ accessToken, currentUser, refreshToken }) =>
    set({
      accessToken,
      refreshToken: refreshToken ?? null,
      currentUser,
    }),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () => set({ accessToken: null, refreshToken: null, currentUser: null }),
}))
