import { CaloriesSummary } from '@/components/dashboard/CaloriesSummary'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { FoodCategoryBreakdown } from '@/components/dashboard/FoodCategoryBreakdown'
import { MacronutrientsChart } from '@/components/dashboard/MacronutrientsChart'
import { NutritionGoals } from '@/components/dashboard/NutritionGoals'
import { RecentMeals } from '@/components/dashboard/RecentMeals'
import {
  FoodCategory,
  CookingMethod,
  ProcessingLevel,
  ConfidenceLevel,
  type DetectedFood,
  type MacroNutrients
} from '@/types/nutrition/type'
import { Apple, Carrot, Fish, Milk, Wheat } from 'lucide-react'

// 샘플 데이터
const sampleMacronutrients: MacroNutrients = {
  carbohydrates: { min_value: 250, max_value: 280, unit: 'g' },
  protein: { min_value: 80, max_value: 95, unit: 'g' },
  fat: { min_value: 60, max_value: 70, unit: 'g' },
  fiber: { min_value: 25, max_value: 30, unit: 'g' }
}

const sampleFoods: DetectedFood[] = [
  {
    name_korean: '현미밥',
    name_english: 'Brown Rice',
    category: FoodCategory.GRAINS,
    subcategory: '통곡물',
    estimated_weight_min: 150,
    estimated_weight_max: 180,
    portion_description: '1공기',
    cooking_method: CookingMethod.STEAMED,
    processing_level: ProcessingLevel.FRESH,
    confidence: ConfidenceLevel.HIGH,
    ingredients: ['현미', '물'],
    allergens: []
  },
  {
    name_korean: '연어구이',
    name_english: 'Grilled Salmon',
    category: FoodCategory.PROTEIN_SEAFOOD,
    subcategory: '등푸른생선',
    estimated_weight_min: 120,
    estimated_weight_max: 150,
    portion_description: '1토막',
    cooking_method: CookingMethod.GRILLED,
    processing_level: ProcessingLevel.FRESH,
    confidence: ConfidenceLevel.HIGH,
    ingredients: ['연어', '소금', '후추'],
    allergens: ['생선']
  },
  {
    name_korean: '브로콜리',
    name_english: 'Broccoli',
    category: FoodCategory.VEGETABLES,
    subcategory: '십자화과',
    estimated_weight_min: 80,
    estimated_weight_max: 100,
    portion_description: '1컵',
    cooking_method: CookingMethod.STEAMED,
    processing_level: ProcessingLevel.FRESH,
    confidence: ConfidenceLevel.HIGH,
    ingredients: ['브로콜리'],
    allergens: []
  }
]

const categoryData = [
  {
    category: FoodCategory.GRAINS,
    name: '곡물류',
    count: 3,
    percentage: 25,
    icon: <Wheat className="h-4 w-4" />,
    color: 'bg-amber-500'
  },
  {
    category: FoodCategory.VEGETABLES,
    name: '채소류',
    count: 5,
    percentage: 35,
    icon: <Carrot className="h-4 w-4" />,
    color: 'bg-green-500'
  },
  {
    category: FoodCategory.PROTEIN_SEAFOOD,
    name: '해산물',
    count: 2,
    percentage: 20,
    icon: <Fish className="h-4 w-4" />,
    color: 'bg-blue-500'
  },
  {
    category: FoodCategory.FRUITS,
    name: '과일류',
    count: 2,
    percentage: 15,
    icon: <Apple className="h-4 w-4" />,
    color: 'bg-red-500'
  },
  {
    category: FoodCategory.DAIRY,
    name: '유제품',
    count: 1,
    percentage: 5,
    icon: <Milk className="h-4 w-4" />,
    color: 'bg-blue-300'
  }
]

const recentMeals = [
  {
    time: '07:30',
    mealType: '아침',
    foods: sampleFoods.slice(0, 2),
    totalCalories: 450
  },
  {
    time: '12:30',
    mealType: '점심',
    foods: sampleFoods,
    totalCalories: 680
  },
  {
    time: '18:00',
    mealType: '저녁',
    foods: sampleFoods.slice(1, 3),
    totalCalories: 520
  }
]

const nutritionGoals = [
  {
    name: '단백질',
    current: 85,
    target: 90,
    unit: 'g',
    status: 'good' as const,
    trend: 'up' as const
  },
  {
    name: '식이섬유',
    current: 18,
    target: 25,
    unit: 'g',
    status: 'warning' as const,
    trend: 'stable' as const
  },
  {
    name: '나트륨',
    current: 2800,
    target: 2300,
    unit: 'mg',
    status: 'danger' as const,
    trend: 'up' as const
  },
  {
    name: '비타민C',
    current: 75,
    target: 100,
    unit: 'mg',
    status: 'good' as const,
    trend: 'up' as const
  },
  {
    name: '칼슘',
    current: 650,
    target: 800,
    unit: 'mg',
    status: 'warning' as const,
    trend: 'down' as const
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더 */}
        <DashboardHeader />

        {/* 메인 대시보드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽 컬럼 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 칼로리 요약과 매크로 영양소 차트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CaloriesSummary consumed={1650} target={2000} remaining={350} />
              <MacronutrientsChart
                macronutrients={sampleMacronutrients}
                carbPercentage={45}
                proteinPercentage={25}
                fatPercentage={30}
              />
            </div>

            {/* 음식 카테고리 분석 */}
            <FoodCategoryBreakdown categoryData={categoryData} />
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-6">
            {/* 최근 식단 */}
            <RecentMeals meals={recentMeals} />

            {/* 영양소 목표 현황 */}
            <NutritionGoals goals={nutritionGoals} />
          </div>
        </div>
      </div>
    </div>
  )
}
