import { MealData, WeekData } from "@/components/calendar/weekly/type"
import foodImage from '@/assets/pasta.jpg'

export const generateWeekData = (weekNumber: number, startDate: string): WeekData => {
  const start = new Date(startDate)
  const data: MealData[] = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    const mealCount = Math.floor(Math.random() * 4) + 1 // 1-4개 식사
    const meals: any = {}

    if (mealCount >= 1) meals.breakfast = foodImage
    if (mealCount >= 2) meals.lunch = foodImage
    if (mealCount >= 3) meals.dinner = foodImage
    if (mealCount >= 4) meals.snack = foodImage

    data.push({
      id: `${weekNumber}-${i + 1}`,
      date: currentDate.toISOString().split("T")[0],
      meals,
      nutrition: {
        calories: Math.floor(Math.random() * 500) + 1500,
        carbs: Math.floor(Math.random() * 50) + 150,
        protein: Math.floor(Math.random() * 40) + 90,
        fat: Math.floor(Math.random() * 30) + 50,
      },
      medication: {
        taken: Math.random() > 0.2,
        total: 3,
        completed: Math.floor(Math.random() * 3) + 1,
      },
    })
  }

  const endDate = new Date(start)
  endDate.setDate(start.getDate() + 6)

  return {
    weekNumber,
    year: start.getFullYear(),
    month: start.getMonth() + 1,
    startDate: start.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    data,
  }
}