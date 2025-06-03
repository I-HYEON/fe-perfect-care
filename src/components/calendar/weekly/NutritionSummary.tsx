interface NutritionSummaryProps {
  nutrition: {
    calories: number
    carbs: number
    protein: number
    fat: number
  }
}

export function NutritionSummary({ nutrition }: NutritionSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Calories</span>
        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{nutrition.calories}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="text-purple-600 dark:text-purple-400 font-medium">{nutrition.carbs}g</div>
          <div className="text-muted-foreground">탄수화물</div>
        </div>
        <div className="text-center">
          <div className="text-purple-600 dark:text-purple-400 font-medium">{nutrition.protein}g</div>
          <div className="text-muted-foreground">단백질</div>
        </div>
        <div className="text-center">
          <div className="text-purple-600 dark:text-purple-400 font-medium">{nutrition.fat}g</div>
          <div className="text-muted-foreground">지방</div>
        </div>
      </div>
    </div>
  )
}
