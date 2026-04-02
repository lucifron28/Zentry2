import { create } from 'zustand'

type AuthState = {
  accessToken: string | null
  userEmail: string | null
  setSession: (accessToken: string, userEmail: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userEmail: null,
  setSession: (accessToken, userEmail) => set({ accessToken, userEmail }),
  clearSession: () => set({ accessToken: null, userEmail: null }),
}))
