import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Share2 } from 'lucide-react'
import { NutritionChart } from '@/components/today-meals/NutritionChart'
import { MealCard } from '@/components/today-meals/MealCard'
import { DrinkCard } from '@/components/today-meals/DrinkCard'
import { MealDetailModal } from '@/components/today-meals/MealDetailModal'
import { FadeIn } from '@/components/ui/pade-in'
import { useNavigate } from 'react-router-dom'

// 샘플 데이터 타입 정의
interface Meal {
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
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

interface Drink {
  id: string
  name: string
  time: string
  calories: number
  type: 'coffee' | 'alcohol' | 'beverage'
  memo?: string
}

export default function TodayMealsPage() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const navigate = useNavigate()
  // 오늘 날짜 포맷팅
  const today = new Date()
  const todayString = today.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })

  // 샘플 식단 데이터
  const meals: Meal[] = [
    {
      id: '1',
      name: '아보카도 토스트와 스크램블 에그',
      image: '/placeholder.svg?height=200&width=300',
      time: '08:30',
      location: '집',
      calories: 420,
      nutrition: { protein: 18, carbs: 32, fat: 24, fiber: 8 },
      coachAdvice: '단백질과 건강한 지방이 균형있게 포함된 좋은 아침식사입니다!',
      memo: '맛있었음. 내일도 해먹어야지',
      type: 'breakfast'
    },
    {
      id: '2',
      name: '연어 샐러드 볼',
      image: '/placeholder.svg?height=200&width=300',
      time: '12:45',
      location: '회사 근처 샐러드 카페',
      calories: 380,
      nutrition: { protein: 28, carbs: 15, fat: 22, fiber: 6 },
      coachAdvice: '오메가-3가 풍부한 연어와 신선한 채소의 조합이 완벽합니다.',
      memo: '드레싱이 조금 짰음',
      type: 'lunch'
    },
    {
      id: '3',
      name: '닭가슴살 스테이크와 구운 야채',
      image: '/placeholder.svg?height=200&width=300',
      time: '19:20',
      calories: 450,
      nutrition: { protein: 35, carbs: 20, fat: 18, fiber: 7 },
      coachAdvice: '저녁에 적절한 단백질 섭취로 근육 회복에 도움이 됩니다.',
      memo: '야채가 너무 맛있었음',
      type: 'dinner'
    },
    {
      id: '4',
      name: '그릭 요거트와 베리',
      time: '15:30',
      calories: 150,
      nutrition: { protein: 12, carbs: 18, fat: 4, fiber: 3 },
      coachAdvice: '간식으로 단백질을 보충하는 좋은 선택입니다.',
      type: 'snack'
    }
  ]

  // 샘플 음료 데이터
  const drinks: Drink[] = [
    {
      id: '1',
      name: '아메리카노',
      time: '09:00',
      calories: 5,
      type: 'coffee'
    },
    {
      id: '2',
      name: '레드와인',
      time: '20:30',
      calories: 125,
      type: 'alcohol'
    }
  ]

  // 총 칼로리 계산
  const totalCalories =
    meals.reduce((sum, meal) => sum + meal.calories, 0) +
    drinks.reduce((sum, drink) => sum + drink.calories, 0)

  // 식사 타입별 한글 변환
  const getMealTypeLabel = (type: string) => {
    const labels = {
      breakfast: '아침',
      lunch: '점심',
      dinner: '저녁',
      snack: '간식'
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <FadeIn>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto py-2 px-4 max-w-6xl">
          {/* 헤더 */}
          <div className="flex items-center justify-between text-left mb-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className='flex items-end gap-1'>
                <div className="text-sm font-light text-slate-900 dark:text-slate-100">
                  오늘의 식단
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-light">{todayString}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 영양소 차트 */}
          <NutritionChart meals={meals} totalCalories={totalCalories} />

          <div className="grid lg:grid-cols-4 gap-8 mt-8">
            {/* 메인 식단 섹션 */}
            <div className="lg:col-span-3">
              <div className="flex text-xs font-light items-center gap-1 p-2">
                <div className="text-sm text-slate-900 dark:text-slate-100">
                  식사 기록
                </div>
                ({meals.length})
              </div>

              <div className="space-y-4">
                {meals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onDetailClick={() => setSelectedMeal(meal)}
                    mealTypeLabel={getMealTypeLabel(meal.type)}
                  />
                ))}
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 음료 섹션 */}
              <div>
                <div className="flex items-center justify-between p-2">
                  <div className="text-sm font-light text-slate-900 dark:text-slate-100">음료</div>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {drinks.length}개
                  </Badge>
                </div>
                <div className="space-y-3">
                  {drinks.map((drink) => (
                    <DrinkCard key={drink.id} drink={drink} />
                  ))}
                </div>
              </div>

              {/* 목표 달성률 */}
              <Card className="p-4 mb-8 text-left bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-none shadow-none">
                <div className="text-sm font-light text-slate-900 dark:text-slate-100">
                  오늘의 목표
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">칼로리</span>
                      <span className="text-sm font-medium">{totalCalories} / 2000</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">물 섭취</span>
                      <span className="text-sm font-medium">6 / 8 잔</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full w-3/4 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* 식단 상세 모달 */}
          <MealDetailModal
            meal={selectedMeal}
            isOpen={!!selectedMeal}
            onClose={() => setSelectedMeal(null)}
            mealTypeLabel={selectedMeal ? getMealTypeLabel(selectedMeal.type) : ''}
          />
        </div>
      </div>
    </FadeIn>
  )
}
