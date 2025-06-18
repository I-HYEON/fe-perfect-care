import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Flame, Zap, Beef, Wheat } from 'lucide-react'

interface NutritionSummaryProps {
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

export function NutritionSummary({ meals, totalCalories }: NutritionSummaryProps) {
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

  // 목표 영양소 (예시)
  const targets = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 67,
    fiber: 25
  }

  // 퍼센트 계산
  const getPercentage = (current: number, target: number) => Math.min((current / target) * 100, 100)

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          오늘의 영양소 요약
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 칼로리 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">칼로리</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{totalCalories} kcal</span>
                <span className="text-muted-foreground">{targets.calories} kcal</span>
              </div>
              <Progress value={getPercentage(totalCalories, targets.calories)} className="h-2" />
            </div>
          </div>

          {/* 단백질 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Beef className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">단백질</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{totalNutrition.protein}g</span>
                <span className="text-muted-foreground">{targets.protein}g</span>
              </div>
              <Progress
                value={getPercentage(totalNutrition.protein, targets.protein)}
                className="h-2"
              />
            </div>
          </div>

          {/* 탄수화물 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wheat className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">탄수화물</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{totalNutrition.carbs}g</span>
                <span className="text-muted-foreground">{targets.carbs}g</span>
              </div>
              <Progress
                value={getPercentage(totalNutrition.carbs, targets.carbs)}
                className="h-2"
              />
            </div>
          </div>

          {/* 지방 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="text-sm font-medium">지방</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{totalNutrition.fat}g</span>
                <span className="text-muted-foreground">{targets.fat}g</span>
              </div>
              <Progress value={getPercentage(totalNutrition.fat, targets.fat)} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
