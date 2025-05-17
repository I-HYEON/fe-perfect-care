import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'
type Language = 'ko' | 'en'
type FontSize = 'normal' | 'large'

interface AppState {
  theme: Theme
  language: Language
  fontSize: FontSize
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  toggleFontSize: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'ko',
      fontSize: 'normal',
      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setLanguage: (lang) => set({ language: lang }),
      toggleFontSize: () =>
        set({ fontSize: get().fontSize === 'normal' ? 'large' : 'normal' }),
    }),
    {
      name: 'app-settings', // localStorage key
    }
  )
)
