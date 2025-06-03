export interface MealData {
  id: string
  date: string
  meals: {
    breakfast?: string // 이미지 URL
    lunch?: string
    dinner?: string
    snack?: string
  }
  nutrition: {
    calories: number
    carbs: number // 탄수화물 (g)
    protein: number // 단백질 (g)
    fat: number // 지방 (g)
  }
  medication: {
    taken: boolean
    total: number
    completed: number
  }
}

export interface WeekData {
  weekNumber: number
  year: number
  month: number
  startDate: string
  endDate: string
  data: MealData[]
}