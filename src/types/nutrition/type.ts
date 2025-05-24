// 영양 관련 타입 정의

export enum FoodCategory {
  GRAINS = "grains",
  VEGETABLES = "vegetables",
  FRUITS = "fruits",
  PROTEIN_MEAT = "protein_meat",
  PROTEIN_SEAFOOD = "protein_seafood",
  PROTEIN_PLANT = "protein_plant",
  DAIRY = "dairy",
  FATS_OILS = "fats_oils",
  BEVERAGES = "beverages",
  SNACKS_SWEETS = "snacks_sweets",
  CONDIMENTS = "condiments",
  UNKNOWN = "unknown",
}

export enum CookingMethod {
  RAW = "raw",
  BOILED = "boiled",
  GRILLED = "grilled",
  FRIED = "fried",
  STEAMED = "steamed",
  BAKED = "baked",
}

export enum ProcessingLevel {
  FRESH = "fresh",
  PROCESSED = "processed",
  HIGHLY_PROCESSED = "highly_processed",
}

export enum ConfidenceLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface NutritionRange {
  min_value: number
  max_value: number
  unit: string
}

export interface MacroNutrients {
  carbohydrates: NutritionRange
  protein: NutritionRange
  fat: NutritionRange
  fiber?: NutritionRange
  sugar?: NutritionRange
}

export interface MicroNutrients {
  sodium?: NutritionRange
  potassium?: NutritionRange
  calcium?: NutritionRange
  iron?: NutritionRange
  vitamin_c?: NutritionRange
  vitamin_a?: NutritionRange
}

export interface NutritionalAnalysis {
  total_calories: NutritionRange
  macronutrients: MacroNutrients
  micronutrients?: MicroNutrients
  carb_percentage?: number
  protein_percentage?: number
  fat_percentage?: number
}

export interface DetectedFood {
  name_korean: string
  name_english: string
  category: FoodCategory
  subcategory?: string
  estimated_weight_min?: number
  estimated_weight_max?: number
  portion_description: string
  cooking_method: CookingMethod
  processing_level: ProcessingLevel
  confidence: ConfidenceLevel
  ingredients?: string[]
  allergens?: string[]
  nutritional_analysis?: NutritionalAnalysis
}
