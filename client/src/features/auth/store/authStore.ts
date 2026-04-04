import { create } from 'zustand'
import type { AuthUser } from '@/shared/types/auth'

type SessionPayload = {
  accessToken: string
  currentUser: AuthUser
}

type AuthState = {
  accessToken: string | null
  currentUser: AuthUser | null
  setSession: (session: SessionPayload) => void
  setCurrentUser: (currentUser: AuthUser | null) => void
  setAccessToken: (accessToken: string | null) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  currentUser: null,
  setSession: ({ accessToken, currentUser }) =>
    set({
      accessToken,
      currentUser,
    }),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () => set({ accessToken: null, currentUser: null }),
}))

