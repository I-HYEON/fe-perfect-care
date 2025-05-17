import { Users, MessageSquare, Settings } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function TabBar() {
    const location = useLocation()

  // 현재 활성화된 탭 확인
  const isActive = (path: string) => {
    if (path === "/personas" && location.pathname === "/personas") return true
    if (path === "/chats" && location.pathname === "/chats") return true
    if (path === "/settings" && location.pathname === "/settings") return true
    return false
  }

  // 첫 번째 depth에서만 탭 바 표시
  // /chat/[id]와 같이 depth가 2 이상인 경로에서는 탭을 표시하지 않도록 함
  const shouldShowTabBar = ["/personas", "/chats", "/settings"].includes(location.pathname)

  if (!shouldShowTabBar) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 h-14 flex items-center justify-around z-10">
      <Link to="/personas" className="flex flex-col items-center justify-center w-full h-full">
        <div
          className={`flex flex-col items-center justify-center ${isActive("/personas") ? "text-orange-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <Users className="h-5 w-5 big:hidden" />
          <span className="text-xs mt-1 big:text-xl">케어메이트</span>
        </div>
      </Link>

      <Link to="/chats" className="flex flex-col items-center justify-center w-full h-full">
        <div
          className={`flex flex-col items-center justify-center ${isActive("/chats") ? "text-orange-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <MessageSquare className="h-5 w-5 big:hidden" />
          <span className="text-xs mt-1 big:text-xl">대화</span>
        </div>
      </Link>

      <Link to="/settings" className="flex flex-col items-center justify-center w-full h-full">
        <div
          className={`flex flex-col items-center justify-center ${isActive("/settings") ? "text-orange-500" : "text-gray-500 dark:text-gray-400"}`}
        >
          <Settings className="h-5 w-5 big:hidden" />
          <span className="text-xs mt-1 big:text-xl">설정</span>
        </div>
      </Link>
    </div>
  )
}
