import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Flame, Target } from 'lucide-react'
import healthy from '@/assets/healthy.png'

interface CaloriesSummaryProps {
  consumed: number
  target: number
  remaining: number
}

export function CaloriesSummary({ consumed, target, remaining }: CaloriesSummaryProps) {
  const percentage = Math.min((consumed / target) * 100, 100)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          칼로리 현황
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 lg:space-y-6">
        {/* 상태 캐릭터 표시 */}
        <div className="w-32 h-32 rounded-lg overflow-hidden mx-auto">
          <img src={healthy} alt="상태 캐릭터" className="w-full h-full object-cover" />
        </div>
        {/* 메인 칼로리 표시 */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {consumed.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            / {target.toLocaleString()} kcal
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="space-y-2">
          <Progress value={percentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>{percentage.toFixed(1)}%</span>
            <span>{target.toLocaleString()}</span>
          </div>
        </div>

        {/* 남은 칼로리 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              남은 칼로리
            </span>
          </div>
          <span
            className={`text-sm font-bold ${
              remaining > 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {remaining > 0 ? '+' : ''}
            {remaining.toLocaleString()} kcal
          </span>
        </div>

        {/* 상태 메시지 */}
        <div className="text-center">
          {percentage < 80 && (
            <p className="text-sm text-blue-600 dark:text-blue-400">
              목표까지 {(target - consumed).toLocaleString()}kcal 남았습니다
            </p>
          )}
          {percentage >= 80 && percentage < 100 && (
            <p className="text-sm text-green-600 dark:text-green-400">목표에 거의 도달했습니다!</p>
          )}
          {percentage >= 100 && (
            <p className="text-sm text-orange-600 dark:text-orange-400">목표를 달성했습니다!</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
