import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

interface MealCardProps {
  meal: {
    id: string
    name: string
    image?: string
    time: string
    location?: string
    calories: number
    nutrition: {
      protein: number
      carbs: number
      fat: number
      fiber: number
    }
    coachAdvice?: string
    memo?: string
    type: string
  }
  onDetailClick: () => void
  mealTypeLabel: string
}

export function MealCard({ meal, onDetailClick, mealTypeLabel }: MealCardProps) {
  return (
    <Card
      className="group p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-none shadow-none hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 cursor-pointer"
      onClick={onDetailClick}
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-xs px-3 py-1"
            >
              {mealTypeLabel}
            </Badge>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-light">
              {meal.time}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-4">
          {/* 음식 이미지 */}
          {meal.image && (
            <div className="flex-shrink-0 my-auto">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
                  src={meal.image || '/placeholder.svg'}
                  alt={meal.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}

          {/* 식단 정보 */}
          <div className="flex-1 min-w-0 text-left">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{meal.name}</div>

            {meal.location && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-light">
                {meal.location}
              </div>
            )}

            {/* 영양 정보 */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {meal.calories}
                </span>
                <span className="text-slate-500 dark:text-slate-400">kcal</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>P {meal.nutrition.protein}g</span>
                <span>C {meal.nutrition.carbs}g</span>
                <span>F {meal.nutrition.fat}g</span>
              </div>
            </div>
          </div>
        </div>
        {/* 코치 조언 */}
        {meal.coachAdvice && (
          <div className="mt-3 text-left bg-blue-50/50 dark:bg-blue-950/20 rounded-xl">
            <div className="text-xs text-blue-700 dark:text-blue-300 line-clamdiv-2">
              💡 {meal.coachAdvice}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
