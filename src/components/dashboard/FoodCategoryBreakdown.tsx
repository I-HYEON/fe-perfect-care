import type React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FoodCategory } from '@/types/nutrition/type'
import { Wheat, Carrot, Apple, Beef, Fish, Milk, Droplets, Cookie, Coffee } from 'lucide-react'

interface CategoryData {
  category: FoodCategory
  name: string
  count: number
  percentage: number
  icon: React.ReactNode
  color: string
}

interface FoodCategoryBreakdownProps {
  categoryData: CategoryData[]
}

const getCategoryIcon = (category: FoodCategory) => {
  const iconMap = {
    [FoodCategory.GRAINS]: <Wheat className="h-4 w-4" />,
    [FoodCategory.VEGETABLES]: <Carrot className="h-4 w-4" />,
    [FoodCategory.FRUITS]: <Apple className="h-4 w-4" />,
    [FoodCategory.PROTEIN_MEAT]: <Beef className="h-4 w-4" />,
    [FoodCategory.PROTEIN_SEAFOOD]: <Fish className="h-4 w-4" />,
    [FoodCategory.PROTEIN_PLANT]: <Wheat className="h-4 w-4" />,
    [FoodCategory.DAIRY]: <Milk className="h-4 w-4" />,
    [FoodCategory.FATS_OILS]: <Droplets className="h-4 w-4" />,
    [FoodCategory.BEVERAGES]: <Coffee className="h-4 w-4" />,
    [FoodCategory.SNACKS_SWEETS]: <Cookie className="h-4 w-4" />,
    [FoodCategory.CONDIMENTS]: <Droplets className="h-4 w-4" />,
    [FoodCategory.UNKNOWN]: <Wheat className="h-4 w-4" />
  }
  return iconMap[category] || <Wheat className="h-4 w-4" />
}

const getCategoryColor = (category: FoodCategory) => {
  const colorMap = {
    [FoodCategory.GRAINS]: 'bg-amber-500',
    [FoodCategory.VEGETABLES]: 'bg-green-500',
    [FoodCategory.FRUITS]: 'bg-red-500',
    [FoodCategory.PROTEIN_MEAT]: 'bg-red-600',
    [FoodCategory.PROTEIN_SEAFOOD]: 'bg-blue-500',
    [FoodCategory.PROTEIN_PLANT]: 'bg-green-600',
    [FoodCategory.DAIRY]: 'bg-blue-300',
    [FoodCategory.FATS_OILS]: 'bg-yellow-500',
    [FoodCategory.BEVERAGES]: 'bg-cyan-500',
    [FoodCategory.SNACKS_SWEETS]: 'bg-pink-500',
    [FoodCategory.CONDIMENTS]: 'bg-gray-500',
    [FoodCategory.UNKNOWN]: 'bg-gray-400'
  }
  return colorMap[category] || 'bg-gray-400'
}

export function FoodCategoryBreakdown({ categoryData }: FoodCategoryBreakdownProps) {
  return (
    <Card className="h-fit bg-white dark:bg-slate-800 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-left">음식 카테고리별 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${getCategoryColor(item.category)}`}>
                    <div className="text-white">{getCategoryIcon(item.category)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.count}개 항목
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>

        {/* 요약 정보 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">오늘의 식단 다양성</div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {categoryData.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">카테고리</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {categoryData.reduce((sum, item) => sum + item.count, 0)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">총 음식</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
