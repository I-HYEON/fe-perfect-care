export interface MessageType {
  id: string
  content?: string
  senderId: number
  receiverId: number
  timestamp: Date
  isRead: boolean
  attachments?: string[]
  foodAnalysis?: FoodAnalysis
}

export interface ChatPersona {
  id: number
  name: string
  avatar?: string
  color: string
}

export interface FoodAnalysis {
  foodName: string
  calories: number
  image?: string
  macronutrients: {
    carbs: number
    protein: number
    fat: number
  }
  ingredients: string[]
  comment: string
}
