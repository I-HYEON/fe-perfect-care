import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Flame } from 'lucide-react'

export function CalorieCard() {
  const consumed = 1240
  const target = 1800
  const percentage = (consumed / target) * 100

  return (
    <Card className="border-none shadow-none bg-white dark:bg-slate-800 overflow-hidden">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          오늘의 칼로리
        </h3>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold">{consumed}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">섭취 칼로리</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-medium text-slate-500">{target}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">목표 칼로리</div>
          </div>
        </div>

        <div className="space-y-2 relative">
          <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>0</span>
            <span>{target}kcal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
