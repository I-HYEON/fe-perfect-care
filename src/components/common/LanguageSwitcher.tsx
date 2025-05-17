import { useAppStore } from '@/stores/useAppStore'

export const LanguageSwitcher = () => {
  const language = useAppStore((state) => state.language)
  const setLanguage = useAppStore((state) => state.setLanguage)

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value as 'ko' | 'en')}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  )
}
