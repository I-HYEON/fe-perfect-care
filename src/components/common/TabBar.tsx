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
    <div className="fixed bottom-0 left-0 right-0 z-10">
      {/* 탭바 배경 - 중간이 볼록한 모양 */}
      <div className="relative">
        <svg
          className="w-full h-20 fill-white dark:fill-gray-800 drop-shadow-lg"
          viewBox="0 0 375 80"
          preserveAspectRatio="none"
        >
          <path d="M0,20 L100,20 Q120,20 130,30 Q140,40 150,45 Q187.5,60 225,45 Q235,40 245,30 Q255,20 275,20 L375,20 L375,80 L0,80 Z" />
        </svg>

        {/* 탭바 컨텐츠 */}
        <div className="absolute inset-0 flex items-end justify-around pb-2">
          {/* 홈 탭 */}
          <Link
            to="/dashboard"
            className="flex flex-col items-center justify-center w-full h-14 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                isActive('/dashboard')
                  ? 'text-orange-500 scale-110'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Home className="h-6 w-6 transition-transform duration-300" />
            </div>
          </Link>

          {/* Today 탭 - 중간 원형 버튼 */}
          <Link to="/me" className="relative flex flex-col items-center justify-center w-full h-14">
            <div className="absolute -top-6 flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg ${
                  isActive('/me')
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white scale-105 shadow-orange-200 dark:shadow-orange-900'
                    : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600'
                }`}
              >
                <SoupIcon
                  className={`h-7 w-7 transition-all duration-300 ${isActive('/me') ? 'scale-110' : ''}`}
                />
              </div>
            </div>
          </Link>

          {/* 달력 탭 */}
          <Link
            to="/calendar"
            className="flex flex-col items-center justify-center w-full h-14 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                isActive('/calendar')
                  ? 'text-orange-500 scale-110'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Calendar className="h-6 w-6 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
