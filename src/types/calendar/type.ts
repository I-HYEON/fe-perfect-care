import { Coffee, Utensils, Moon, Apple } from 'lucide-react'

export interface MealData {
  id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foods: string[]
  calories?: number
  notes?: string
  time?: string
}

export interface DietData {
  [key: string]: MealData[]
}

export interface Holiday {
  date: Date
  name: string
}

export const mealIcons = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Moon,
  snack: Apple
}

export const mealLabels = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '간식'
}

export const mealColors = {
  breakfast: 'text-orange-500 dark:text-orange-400',
  lunch: 'text-green-500 dark:text-green-400',
  dinner: 'text-blue-500 dark:text-blue-400',
  snack: 'text-purple-500 dark:text-purple-400'
}
