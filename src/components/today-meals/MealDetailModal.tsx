import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface MealDetailModalProps {
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
  } | null
  isOpen: boolean
  onClose: () => void
  mealTypeLabel: string
}

export function MealDetailModal({ meal, isOpen, onClose, mealTypeLabel }: MealDetailModalProps) {
  if (!meal) return null

  const nutritionData = [
    { label: "칼로리", value: meal.calories, unit: "kcal", color: "from-orange-400 to-orange-500" },
    { label: "단백질", value: meal.nutrition.protein, unit: "g", color: "from-red-400 to-red-500" },
    { label: "탄수화물", value: meal.nutrition.carbs, unit: "g", color: "from-yellow-400 to-yellow-500" },
    { label: "지방", value: meal.nutrition.fat, unit: "g", color: "from-green-400 to-green-500" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {mealTypeLabel}
            </Badge>
            <DialogTitle className="text-xl font-light text-slate-900 dark:text-slate-100">{meal.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* 음식 이미지 */}
          {meal.image && (
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="object-center" />
            </div>
          )}

          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">시간</h3>
              <p className="text-lg text-slate-900 dark:text-slate-100">{meal.time}</p>
            </div>

            {meal.location && (
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">장소</h3>
                <p className="text-lg text-slate-900 dark:text-slate-100">{meal.location}</p>
              </div>
            )}
          </div>

          {/* 영양 정보 */}
          <div>
            <h3 className="text-lg font-light text-slate-900 dark:text-slate-100 mb-6">영양 정보</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {nutritionData.map((item) => (
                <div key={item.label} className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                  >
                    <span className="text-white font-medium text-lg">{item.value}</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{item.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{item.unit}</div>
                </div>
              ))}
            </div>

            {meal.nutrition.fiber > 0 && (
              <div className="mt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{meal.nutrition.fiber}</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">식이섬유</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">g</div>
              </div>
            )}
          </div>

          {/* 코치 조언 */}
          {meal.coachAdvice && (
            <div className="p-6 bg-blue-50/50 dark:bg-blue-950/20 rounded-3xl">
              <h3 className="text-lg font-light text-slate-900 dark:text-slate-100 mb-3">💡 코치의 조언</h3>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed">{meal.coachAdvice}</p>
            </div>
          )}

          {/* 메모 */}
          {meal.memo && (
            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl">
              <h3 className="text-lg font-light text-slate-900 dark:text-slate-100 mb-3">📝 메모</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{meal.memo}</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={() => {
                console.log("수정하기:", meal.id)
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              수정하기
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-slate-200 dark:border-slate-700"
              onClick={() => {
                console.log("삭제하기:", meal.id)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
