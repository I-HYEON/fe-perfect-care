import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface NutritionChartProps {
  meals: Array<{
    calories: number
    nutrition: {
      protein: number
      carbs: number
      fat: number
      fiber: number
    }
  }>
  totalCalories: number
}

export function NutritionChart({ meals, totalCalories }: NutritionChartProps) {
  // 총 영양소 계산
  const totalNutrition = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.nutrition.protein,
      carbs: acc.carbs + meal.nutrition.carbs,
      fat: acc.fat + meal.nutrition.fat,
      fiber: acc.fiber + meal.nutrition.fiber
    }),
    { protein: 0, carbs: 0, fat: 0, fiber: 0 }
  )

  // 목표 영양소
  const targets = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 67,
    fiber: 25
  }

  // 차트 데이터
  const chartData = [
    {
      label: '칼로리',
      current: totalCalories,
      target: targets.calories,
      unit: 'kcal',
      color: 'from-orange-400 to-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    },
    {
      label: '단백질',
      current: totalNutrition.protein,
      target: targets.protein,
      unit: 'g',
      color: 'from-red-400 to-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20'
    },
    {
      label: '탄수화물',
      current: totalNutrition.carbs,
      target: targets.carbs,
      unit: 'g',
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20'
    },
    {
      label: '지방',
      current: totalNutrition.fat,
      target: targets.fat,
      unit: 'g',
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    }
  ]

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="text-sm text-left text-slate-900 dark:text-slate-100">영양소</div>
      </CardHeader>
      <CardContent className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-8">
          {chartData.map((item) => {
            const percentage = Math.min((item.current / item.target) * 100, 100)
            const height = Math.max(percentage, 5) // 최소 높이 보장

            return (
              <div key={item.label} className="flex flex-col items-center">
                {/* 차트 바 */}
                <div className="relative w-14 h-32 mb-2">
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg ${item.bgColor} opacity-30`}
                    style={{ height: '100%' }}
                  />
                  <div
                    className={`absolute bottom-0 w-full bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-700 ease-out`}
                    style={{ height: `${height}%` }}
                  />
                  {/* 목표선 */}
                  <div className="absolute top-0 w-full h-0.5 bg-slate-300 dark:bg-slate-600 rounded" />
                </div>

                {/* 수치 */}
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.current}
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                      {item.unit}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {item.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
