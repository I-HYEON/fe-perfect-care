import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Moon,
  Bell,
  Volume2,
  Lock,
  HelpCircle,
  Info,
  LogOut,
  Scaling,
  User2,
  ChartBarBig,
  ArrowLeft,
  ArrowRight,
  Home
} from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { useNavigate } from 'react-router-dom'
import { logoutApi } from '@/api/auth/auth'
import { toast } from 'sonner'
import { FadeIn } from '@/components/ui/pade-in'

export default function SettingsPage() {
  const theme = useAppStore((state) => state.theme)
  const fontSize = useAppStore((state) => state.fontSize)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const toggleFontSize = useAppStore((state) => state.toggleFontSize)
  const [notifications, setNotifications] = useState(true)
  const [sounds, setSounds] = useState(false)
  const navigate = useNavigate()

  const isDark = theme === 'dark'
  const isBig = fontSize === 'large'

  useEffect(() => {
    console.log('큰글씨 모드 적용 확인', fontSize)
  }, [fontSize])

  const handleHome = () => {
    navigate('/dashboard')
  }

  const handleLogout = async () => {
    try {
      await logoutApi()
      toast.success('로그아웃되었습니다')
    } catch (error) {
      // 에러가 있어도 클라이언트 측 로그아웃은 완료됨
      toast.info('로그아웃되었습니다')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-14">
      <FadeIn>
        <div className="mx-auto max-w-md px-4">
          {/* 헤더 */}
          <div className="mb-6 flex justify-between">
            <div className="cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white big:text-2xl">설정</div>
            <div className="invisible">
              <ArrowRight />
            </div>
          </div>

          {/* 설정 섹션 */}
          <div className="space-y-6">
            {/* 내 설정 */}
            <div className="space-y-3">
              <h2 className="text-sm text-left text-gray-900 dark:text-white big:text-lg">
                내 정보
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/me')}
                  className="w-full justify-start p-4 h-auto big:text-lg"
                >
                  <User2 className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>내 프로필</span>
                </Button>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="w-full justify-start p-4 h-auto big:text-lg"
                >
                  <ChartBarBig className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>대시보드</span>
                </Button>
              </div>
            </div>

            {/* 화면 설정 */}
            <div className="space-y-3">
              <h2 className="text-sm text-left text-gray-900 dark:text-white big:text-lg">화면</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Label htmlFor="dark-mode" className="text-sm big:text-lg">
                      다크 모드
                    </Label>
                  </div>
                  <Switch id="dark-mode" checked={isDark} onCheckedChange={toggleTheme} />
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs">
                    <Scaling className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Label htmlFor="big-font-mode" className="text-sm big:text-lg">
                      큰글씨 모드
                    </Label>
                  </div>
                  <Switch id="big-font-mode" checked={isBig} onCheckedChange={toggleFontSize} />
                </div>
              </div>
            </div>

            {/* 알림 설정 */}
            <div className="space-y-3">
              <h2 className="text-sm text-left text-gray-900 dark:text-white big:text-lg">알림</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Label htmlFor="notifications" className="text-sm big:text-lg">
                      알림 받기
                    </Label>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Label htmlFor="sounds" className="text-sm big:text-lg">
                      소리
                    </Label>
                  </div>
                  <Switch id="sounds" disabled checked={sounds} onCheckedChange={setSounds} />
                </div>
              </div>
            </div>

            {/* 기타 메뉴 */}
            <div className="space-y-3">
              <h2 className="text-sm text-left text-gray-900 dark:text-white big:text-lg">기타</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <Button variant="ghost" className="w-full justify-start p-4 h-auto big:text-lg">
                  <Lock className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>개인정보 보호</span>
                </Button>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                <Button variant="ghost" className="w-full justify-start p-4 h-auto big:text-lg">
                  <HelpCircle className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>도움말</span>
                </Button>

                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                <Button variant="ghost" className="w-full justify-start p-4 h-auto big:text-lg">
                  <Info className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>앱 정보</span>
                </Button>
              </div>
            </div>

            {/* 로그아웃 버튼 */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-500 dark:text-slate-200 dark:hover:text-slate-950 dark:hover:bg-slate-400 big:text-lg"
            >
              <LogOut className="h-5 w-5 mr-2" />
              로그아웃
            </Button>

            {/* 홈으로 가기 버튼 */}
            <Button variant="outline" onClick={handleHome} className="w-full big:text-lg">
              <Home className="h-5 w-5 mr-2" />
              돌아가기
            </Button>
          </div>
        </div>
      </FadeIn>
    </main>
  )
}
