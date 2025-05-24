import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type DetectedFood, FoodCategory } from "@/types/nutrition/type"
import { Clock, Utensils } from "lucide-react"

interface MealEntry {
  time: string
  mealType: string
  foods: DetectedFood[]
  totalCalories: number
}

interface RecentMealsProps {
  meals: MealEntry[]
}

const getCategoryBadgeColor = (category: FoodCategory) => {
  const colorMap = {
    [FoodCategory.GRAINS]: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    [FoodCategory.VEGETABLES]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    [FoodCategory.FRUITS]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    [FoodCategory.PROTEIN_MEAT]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    [FoodCategory.PROTEIN_SEAFOOD]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    [FoodCategory.PROTEIN_PLANT]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    [FoodCategory.DAIRY]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    [FoodCategory.FATS_OILS]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    [FoodCategory.BEVERAGES]: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    [FoodCategory.SNACKS_SWEETS]: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    [FoodCategory.CONDIMENTS]: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    [FoodCategory.UNKNOWN]: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  }
  return colorMap[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
}

export function RecentMeals({ meals }: RecentMealsProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Utensils className="h-5 w-5" />
          최근 식단
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-left">
          {meals.map((meal, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              {/* 식사 헤더 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{meal.mealType}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {meal.totalCalories}kcal
                </Badge>
              </div>

              {/* 음식 목록 */}
              <div className="space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{food.name_korean}</span>
                        <Badge variant="secondary" className={`text-xs ${getCategoryBadgeColor(food.category)}`}>
                          {food.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {food.portion_description}
                        {food.estimated_weight_min && food.estimated_weight_max && (
                          <span className="ml-2">
                            ({food.estimated_weight_min}-{food.estimated_weight_max}g)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 조리 방법 및 가공 정도 */}
              <div className="flex gap-2 mt-3">
                {meal.foods.slice(0, 3).map((food, foodIndex) => (
                  <div key={foodIndex} className="flex gap-1">
                    <Badge variant="outline" className="text-xs">
                      {food.cooking_method}
                    </Badge>
                  </div>
                ))}
                {meal.foods.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{meal.foods.length - 3}개 더
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
