import { Home, Calendar, SoupIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function TabBar() {
  const location = useLocation()

  // 현재 활성화된 탭 확인
  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true
    if (path === '/me' && location.pathname === '/me') return true
    if (path === '/calendar' && location.pathname === '/calendar') return true
    return false
  }

  // 특정 url에서만 탭 바 표시
  const shouldShowTabBar = ['/dashboard', '/me', '/calendar'].includes(location.pathname)

  if (!shouldShowTabBar) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 h-14 flex items-center justify-around z-10">
      <Link to="/dashboard" className="flex flex-col items-center justify-center w-full h-full">
        <div
          className={`flex flex-col items-center justify-center ${isActive('/dashboard') ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Home className="h-5 w-5 big:hidden" />
          <span className="text-xs mt-1 big:text-xl">홈</span>
        </div>
      </Link>

      <Link to="/me" className="flex flex-col items-center justify-center w-full h-full">
        <div
          className={`flex flex-col items-center justify-center ${isActive('/me') ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <SoupIcon className="h-5 w-5 big:hidden" />
          <span className="text-xs mt-1 big:text-xl">Today</span>
        </div>
      </Link>

      <Link to="/calendar" className="flex flex-col items-center justify-center w-full h-full">
        <div
          className={`flex flex-col items-center justify-center ${isActive('/settings') ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Calendar className="h-5 w-5 big:hidden" />
          <span className="text-xs mt-1 big:text-xl">달력</span>
        </div>
      </Link>
    </div>
  )
}
