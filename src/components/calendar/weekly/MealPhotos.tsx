import foodImage from '@/assets/burger.jpeg'

interface MealPhotosProps {
  meals: {
    breakfast?: string
    lunch?: string
    dinner?: string
    snack?: string
  }
}

export function MealPhotos({ meals }: MealPhotosProps) {
  const mealEntries = Object.entries(meals).filter(([_, url]) => url)

  if (mealEntries.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 bg-muted/50 rounded-lg">
        <span className="text-xs text-muted-foreground">No meals</span>
      </div>
    )
  }

  const [mainMeal, ...otherMeals] = mealEntries

  return (
    <div className="relative w-16 h-16 mx-auto">
      {/* Background stacked photos */}
      {otherMeals.length > 0 && (
        <>
          {otherMeals.length >= 2 && (
            <div className="absolute top-1 left-1 w-14 h-14 rounded-lg border-2 border-background bg-muted/30 transform rotate-6" />
          )}
          {otherMeals.length >= 1 && (
            <div className="absolute top-0.5 left-0.5 w-14 h-14 rounded-lg border-2 border-background bg-muted/50 transform rotate-3" />
          )}
        </>
      )}

      {/* Main photo */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-background shadow-sm">
        <img src={mainMeal[1] || foodImage} alt={`${mainMeal[0]} meal`} className="object-cover" />
      </div>

      {/* Count indicator */}
      {otherMeals.length > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
          {mealEntries.length}
        </div>
      )}
    </div>
  )
}
