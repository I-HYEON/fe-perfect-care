import { MealPhotos } from "./MealPhotos"
import { MedicationStatus } from "./MedicationStatus"
import { NutritionSummary } from "./NutritionSummary"
import { MealData } from "./type"

interface WeeklyDayCardProps {
  data: MealData
  isToday?: boolean
}

export function WeeklyDayCard({ data, isToday }: WeeklyDayCardProps) {
  const date = new Date(data.date)
  const dayName = date.toLocaleDateString("ko-KR", { weekday: "short" })
  const dayNumber = date.getDate()

  return (
    <>
      {/* Desktop/Tablet Card */}
      <div
        className={`
        hidden lg:block
        bg-card border rounded-lg p-3 space-y-3 transition-all hover:shadow-md
        ${isToday ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""}
      `}
      >
        {/* Date Header */}
        <div className="text-center">
          <div
            className={`text-xs font-medium ${
              isToday ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
            }`}
          >
            {dayName}
          </div>
          <div className={`text-lg font-bold ${isToday ? "text-purple-600 dark:text-purple-400" : "text-foreground"}`}>
            {dayNumber}
          </div>
        </div>

        {/* Meal Photos */}
        <MealPhotos meals={data.meals} />

        {/* Nutrition Summary */}
        <NutritionSummary nutrition={data.nutrition} />

        {/* Medication Status */}
        <MedicationStatus medication={data.medication} />
      </div>

      {/* Mobile Card */}
      <div
        className={`
        block lg:hidden
        bg-zinc-50 dark:bg-zinc-900 rounded-xs p-3 transition-all hover:shadow-md
        min-h-24
        ${isToday ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""}
      `}
      >
        <div className="flex items-center gap-3 min-h-full">
          {/* Date */}
          <div className="flex-shrink-0 text-center w-12">
            <div
              className={`text-xs font-medium ${
                isToday ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
              }`}
            >
              {dayName}
            </div>
            <div
              className={`text-lg font-bold ${isToday ? "text-purple-600 dark:text-purple-400" : "text-foreground"}`}
            >
              {dayNumber}
            </div>
          </div>

          {/* Meal Photo */}
          <div className="flex-shrink-0">
            <div className="w-22 h-12">
              <MealPhotos meals={data.meals} />
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">칼로리</span>
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{data.nutrition.calories}</span>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="text-purple-600 dark:text-purple-400">탄 {data.nutrition.carbs}g</span>
              <span className="text-purple-600 dark:text-purple-400">단 {data.nutrition.protein}g</span>
              <span className="text-purple-600 dark:text-purple-400">지 {data.nutrition.fat}g</span>
            </div>
          </div>

          {/* Medication Status */}
          <div className="flex-shrink-0 w-16">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">복약</div>
              <div className="text-xs font-medium">
                {data.medication.completed}/{data.medication.total}
              </div>
              <div className="w-full bg-muted rounded-full h-1 mt-1">
                <div
                  className={`h-1 rounded-full transition-all ${
                    data.medication.completed === data.medication.total
                      ? "bg-green-500"
                      : data.medication.completed > 1
                        ? "bg-orange-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${(data.medication.completed / data.medication.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
