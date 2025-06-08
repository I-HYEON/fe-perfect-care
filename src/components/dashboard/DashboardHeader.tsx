import { AlignJustify } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function DashboardHeader() {
  const navigate = useNavigate()

  const handleSettingsButtonClick = () => {
    navigate('/settings')
  }

  return (
    <div className="py-2 px-4">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="text-xl sm:text-lg font-bold text-gray-900 dark:text-white">
            Dashboard
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            나의 식습관을 한눈에 알아보세요
          </p>
        </div>
        <div className="cursor-pointer" onClick={handleSettingsButtonClick}>
          <AlignJustify className="h-6 w-6" />
        </div>
      </div>

      {/* 빠른 통계 카드들 */}
      {/* <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 h-fit">
          <CardContent className="p-4 mx-auto">
            <div className="flex items-center gap-3">
              <div className="hidden md:block p-2 bg-blue-500 rounded-lg">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs lg:text-sm text-blue-600 dark:text-blue-400">달성률</div>
                <div className="text-xs lg:text-xl font-bold text-blue-700 dark:text-blue-300">78%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 h-fit">
          <CardContent className="p-4 mx-auto">
            <div className="flex items-center gap-3">
              <div className="hidden md:block p-2 bg-green-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-green-600 dark:text-green-400">주간 평균</p>
                <p className="text-xs lg:text-xl font-bold text-green-700 dark:text-green-300">1,850kcal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 h-fit">
          <CardContent className="p-4 mx-auto">
            <div className="flex items-center gap-3">
              <div className="hidden md:block p-2 bg-purple-500 rounded-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-purple-600 dark:text-purple-400">연속 기록</p>
                <p className="text-xs lg:text-xl font-bold text-purple-700 dark:text-purple-300">12일</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
