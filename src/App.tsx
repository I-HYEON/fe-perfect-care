// import reactLogo from './assets/react.svg'
// import appLogo from '/favicon.svg'
import { BrowserRouter } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { Toaster } from './components/ui/sonner'
import AppRouter from './components/common/AppRouter.tsx'
import { useAppStore } from './stores/useAppStore.ts'
import { useEffect } from 'react'

function App() {
  const theme = useAppStore((state) => state.theme)
  const fontSize = useAppStore((state) => state.fontSize)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    if (fontSize === 'large') {
      root.classList.add('big-text')
    } else {
      root.classList.remove('big-text')
    }
  }, [theme, fontSize])

  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster />
      <PWABadge />
    </BrowserRouter>
  )
}

export default App
