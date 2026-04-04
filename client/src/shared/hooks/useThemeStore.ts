import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppTheme =
  | 'light'
  | 'dark'
  | 'cupcake'
  | 'synthwave'
  | 'dracula'
  | 'night'
  | 'caramellatte'
  | 'nord'

export const THEME_OPTIONS: { value: AppTheme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'cupcake', label: 'Cupcake' },
  { value: 'synthwave', label: 'Synthwave' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'night', label: 'Night' },
  { value: 'caramellatte', label: 'Caramel Latte' },
  { value: 'nord', label: 'Nord' },
]

type ThemeState = {
  theme: AppTheme
  setTheme: (theme: AppTheme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme)
        set({ theme })
      },
    }),
    {
      name: 'zentry-theme',
      onRehydrateStorage: () => (state) => {
        // Apply saved theme to DOM on page load
        if (state?.theme) {
          document.documentElement.setAttribute('data-theme', state.theme)
        }
      },
    },
  ),
)
