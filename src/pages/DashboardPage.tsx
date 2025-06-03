import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { FoodCategoryBreakdown } from '@/components/dashboard/FoodCategoryBreakdown'
import { MacronutrientsChart } from '@/components/dashboard/MacronutrientsChart'
import { NutritionGoals } from '@/components/dashboard/NutritionGoals'
import { UserInfoCard } from '@/components/dashboard/UserInfoCard'
import { FadeIn } from '@/components/ui/pade-in'
import {
  FoodCategory,
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
      <FadeIn>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 헤더 */}
          <DashboardHeader />

          {/* 사용자 정보 */}
          <UserInfoCard/>

          {/* 메인 대시보드 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 왼쪽 컬럼 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 칼로리 요약과 매크로 영양소 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {/* 영양소 목표 현황 */}
              <NutritionGoals goals={nutritionGoals} />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
